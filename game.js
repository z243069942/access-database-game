// 游戏核心逻辑

// 游戏状态
const state = {
  currentChapter: 0,
  currentLevel: null,
  questions: [],
  currentQIndex: 0,
  score: 0,
  correct: 0,
  timer: null,
  timeLeft: 30,
  answered: false,
  progress: JSON.parse(localStorage.getItem('accessGameProgress') || '{}'),
  totalScore: parseInt(localStorage.getItem('accessGameScore') || '0')
};

function saveProgress() {
  localStorage.setItem('accessGameProgress', JSON.stringify(state.progress));
  localStorage.setItem('accessGameScore', state.totalScore.toString());
}

function getStars(correctCount, total) {
  const rate = correctCount / total;
  if (rate >= 0.9) return 3;
  if (rate >= 0.7) return 2;
  if (rate >= 0.5) return 1;
  return 0;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  const target = document.getElementById(id);
  if (target) {
    target.style.display = 'flex';
    target.classList.add('active');
  }
  if (id === 'home-screen') updateHomeStats();
  if (id === 'knowledge-screen') initKnowledge();
}

function updateHomeStats() {
  let total = 0, completed = 0, stars = 0;
  Object.values(state.progress).forEach(v => {
    completed++;
    stars += v.stars || 0;
    total += v.score || 0;
  });
  document.getElementById('total-score').textContent = state.totalScore;
  document.getElementById('total-completed').textContent = completed;
  document.getElementById('total-stars').textContent = stars;
}

// 渲染章节卡片
function renderChapters() {
  const grid = document.getElementById('chapters-grid');
  grid.innerHTML = '';
  CHAPTERS.forEach((ch, i) => {
    const card = document.createElement('div');
    card.className = 'chapter-card';
    const chProgress = ch.levels.filter(l => state.progress[l.id]).length;
    const isCompleted = chProgress === ch.levels.length;
    if (isCompleted) card.classList.add('completed');

    const stars = ch.levels.reduce((sum, l) => sum + (state.progress[l.id]?.stars || 0), 0);
    const maxStars = ch.levels.length * 3;

    card.innerHTML = `
      <div class="chapter-icon">${ch.icon}</div>
      <div class="chapter-name">${ch.name}</div>
      <div class="chapter-desc">${ch.desc}</div>
      <div class="chapter-stars">${renderStarStr(stars, maxStars)} ${chProgress}/${ch.levels.length}关</div>
    `;
    card.onclick = () => { showScreen('level-screen'); showChapterLevels(i); };
    grid.appendChild(card);
  });
}

function renderStarStr(got, max) {
  let s = '';
  for (let i = 0; i < Math.min(max, 5); i++) s += got > i ? '★' : '☆';
  return s;
}

function showChapterLevels(chapterIdx) {
  state.currentChapter = chapterIdx;
  const ch = CHAPTERS[chapterIdx];
  document.getElementById('chapter-title').textContent = `${ch.icon} ${ch.name}`;
  document.getElementById('chapter-subtitle').textContent = ch.desc;

  const list = document.getElementById('levels-list');
  list.innerHTML = '';

  ch.levels.forEach((lv, i) => {
    const prog = state.progress[lv.id];
    const isCompleted = !!prog;
    const stars = prog?.stars || 0;

    const item = document.createElement('div');
    item.className = 'level-item' + (isCompleted ? ' completed' : '');

    item.innerHTML = `
      <div class="level-num ${isCompleted ? 'completed-num' : ''}">${isCompleted ? '✓' : (i + 1)}</div>
      <div class="level-info">
        <h4>${lv.name}</h4>
        <p>${lv.desc} · ${lv.qs}题</p>
      </div>
      <div class="level-stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
    `;
    item.onclick = () => startLevel(lv.id);
    list.appendChild(item);
  });
}

function startLevel(levelId) {
  state.currentLevel = levelId;
  const qBank = QUESTION_BANK[levelId];
  if (!qBank || qBank.length === 0) {
    alert('该关卡题目暂未加载');
    return;
  }

  // 随机打乱题目
  state.questions = [...qBank].sort(() => Math.random() - 0.5);
  state.currentQIndex = 0;
  state.score = 0;
  state.correct = 0;

  showScreen('game-screen');
  showQuestion();
}

function showQuestion() {
  const q = state.questions[state.currentQIndex];
  if (!q) { endLevel(); return; }

  state.answered = false;
  const total = state.questions.length;
  const idx = state.currentQIndex;

  // 进度
  const pct = (idx / total) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent = `第 ${idx + 1} / ${total} 题`;
  document.getElementById('game-score-val').textContent = state.score;

  // 题型标记
  const badge = document.getElementById('q-type-badge');
  const typeMap = { single: '单选题', judge: '判断题', fill: '填空题', multi: '多选题' };
  badge.textContent = typeMap[q.type] || '单选题';
  badge.className = 'q-type-badge';
  if (q.type === 'judge') badge.classList.add('judge');
  if (q.type === 'fill') badge.classList.add('fill');
  if (q.type === 'multi') badge.classList.add('multi');

  // 题目文字
  document.getElementById('q-text').textContent = q.text;

  // 代码块
  const codeBlock = document.getElementById('q-code-block');
  if (q.code) {
    codeBlock.textContent = q.code;
    codeBlock.classList.remove('hidden');
  } else {
    codeBlock.classList.add('hidden');
  }

  // 选项区
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  document.getElementById('feedback-container').innerHTML = '';

  if (q.type === 'single' || q.type === 'multi') {
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
      btn.onclick = () => selectOption(i, btn, q);
      container.appendChild(btn);
    });
  } else if (q.type === 'judge') {
    ['正确 (√)', '错误 (×)'].forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.onclick = () => {
        const userAns = i === 0;
        selectJudge(userAns, btn, q);
      };
      container.appendChild(btn);
    });
  } else if (q.type === 'fill') {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'fill-input';
    input.placeholder = '请输入答案...';
    input.id = 'fill-input';
    container.appendChild(input);

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'confirm-btn';
    confirmBtn.textContent = '确认答案';
    confirmBtn.onclick = () => submitFill(input, q);
    container.appendChild(confirmBtn);

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitFill(input, q);
    });

    setTimeout(() => input.focus(), 100);
  }

  // 重置计时器
  resetTimer();
}

function selectOption(idx, btn, q) {
  if (state.answered) return;
  state.answered = true;
  clearInterval(state.timer);

  const isCorrect = idx === q.answer;
  const allBtns = btn.parentElement.querySelectorAll('.option-btn');

  allBtns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.answer) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  handleResult(isCorrect, q);
}

function selectJudge(userAns, btn, q) {
  if (state.answered) return;
  state.answered = true;
  clearInterval(state.timer);

  const isCorrect = userAns === q.answer;
  const allBtns = btn.parentElement.querySelectorAll('.option-btn');
  allBtns.forEach((b, i) => {
    b.disabled = true;
    if (i === 0 && q.answer === true) b.classList.add('correct');
    if (i === 1 && q.answer === false) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  handleResult(isCorrect, q);
}

function submitFill(input, q) {
  if (state.answered) return;
  state.answered = true;
  clearInterval(state.timer);

  const userAns = input.value.trim();
  const correctAns = Array.isArray(q.answer) ? q.answer : [q.answer];
  const isCorrect = correctAns.some(a =>
    userAns.toLowerCase().replace(/\s/g, '') === a.toString().toLowerCase().replace(/\s/g, '')
  );

  input.disabled = true;
  if (isCorrect) {
    input.classList.add('correct-fill');
  } else {
    input.classList.add('wrong-fill');
  }

  handleResult(isCorrect, q, userAns);
}

function handleResult(isCorrect, q, userAns) {
  const bonus = Math.floor((state.timeLeft / GAME_CONFIG.timePerQuestion) * GAME_CONFIG.scoreBonus);
  if (isCorrect) {
    state.correct++;
    state.score += GAME_CONFIG.scorePerCorrect + bonus;
  }

  document.getElementById('game-score-val').textContent = state.score;

  const fb = document.getElementById('feedback-container');
  const answerText = q.type === 'judge'
    ? (q.answer ? '正确 (√)' : '错误 (×)')
    : (q.type === 'fill' ? q.answer : `${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}`);

  fb.innerHTML = `
    <div class="feedback-box ${isCorrect ? 'correct-fb' : 'wrong-fb'}">
      ${isCorrect ? '✓ 回答正确！' : `✗ 答错了。正确答案：<strong>${answerText}</strong>`}
      ${q.explanation ? `<br><br>解析：${q.explanation}` : ''}
      ${(!isCorrect && q.type === 'fill' && userAns) ? `<br>你的答案：${userAns}` : ''}
    </div>
    <button class="next-btn" onclick="nextQuestion()">
      ${state.currentQIndex + 1 < state.questions.length ? '下一题 →' : '查看成绩 →'}
    </button>
  `;
}

function nextQuestion() {
  state.currentQIndex++;
  if (state.currentQIndex >= state.questions.length) {
    endLevel();
  } else {
    showQuestion();
  }
}

function resetTimer() {
  clearInterval(state.timer);
  state.timeLeft = GAME_CONFIG.timePerQuestion;
  const timerNum = document.getElementById('timer-num');
  const timerBox = document.getElementById('timer-box');
  timerNum.textContent = state.timeLeft;
  timerBox.classList.remove('urgent');

  state.timer = setInterval(() => {
    state.timeLeft--;
    timerNum.textContent = state.timeLeft;
    if (state.timeLeft <= 10) timerBox.classList.add('urgent');
    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      if (!state.answered) {
        state.answered = true;
        const q = state.questions[state.currentQIndex];
        // 超时自动显示答案
        const container = document.getElementById('options-container');
        container.querySelectorAll('.option-btn').forEach((b, i) => {
          b.disabled = true;
          if (q.type !== 'judge' && i === q.answer) b.classList.add('correct');
          if (q.type === 'judge') {
            if (i === 0 && q.answer === true) b.classList.add('correct');
            if (i === 1 && q.answer === false) b.classList.add('correct');
          }
        });
        const fb = document.getElementById('feedback-container');
        const answerText = q.type === 'judge'
          ? (q.answer ? '正确 (√)' : '错误 (×)')
          : (q.type === 'fill' ? q.answer : `${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}`);
        fb.innerHTML = `
          <div class="feedback-box wrong-fb">
            ⏰ 超时！正确答案：<strong>${answerText}</strong>
            ${q.explanation ? `<br><br>解析：${q.explanation}` : ''}
          </div>
          <button class="next-btn" onclick="nextQuestion()">
            ${state.currentQIndex + 1 < state.questions.length ? '下一题 →' : '查看成绩 →'}
          </button>
        `;
      }
    }
  }, 1000);
}

function endLevel() {
  clearInterval(state.timer);
  const total = state.questions.length;
  const stars = getStars(state.correct, total);
  const acc = Math.round((state.correct / total) * 100);

  // 保存进度
  const prev = state.progress[state.currentLevel];
  if (!prev || stars > prev.stars) {
    state.progress[state.currentLevel] = { stars, score: state.score, correct: state.correct };
  }
  state.totalScore += state.score;
  saveProgress();

  // 结算界面
  const icons = ['😢', '🌟', '🎯', '🏆'];
  const titles = ['继续努力', '不错哦！', '很棒！', '太棒了！'];
  const msgs = [
    '继续复习，你一定可以的！考试前多练几遍关键知识点。',
    '基础掌握不错！重点复习错题部分，争取更高分。',
    '掌握得很好！再接再厉，冲击满分！',
    '完美通关！知识点掌握扎实，2027对口招生加油！'
  ];

  document.getElementById('result-icon').textContent = icons[stars];
  document.getElementById('result-title').textContent = titles[stars];
  document.getElementById('result-sub').textContent = `${state.currentLevel ? getLevelName(state.currentLevel) : '本关卡'} 通关！`;
  document.getElementById('result-stars').textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
  document.getElementById('rs-correct').textContent = `${state.correct}/${total}`;
  document.getElementById('rs-score').textContent = state.score;
  document.getElementById('rs-acc').textContent = acc + '%';
  document.getElementById('result-msg').textContent = msgs[stars];

  showScreen('result-screen');
}

function getLevelName(levelId) {
  for (const ch of CHAPTERS) {
    for (const lv of ch.levels) {
      if (lv.id === levelId) return lv.name;
    }
  }
  return '关卡';
}

function retryLevel() {
  if (state.currentLevel) startLevel(state.currentLevel);
}

function confirmExit() {
  if (confirm('确定要退出当前关卡吗？本局答题进度将不会保存。')) {
    clearInterval(state.timer);
    showScreen('level-screen');
    showChapterLevels(state.currentChapter);
  }
}

// 知识速览
function initKnowledge() {
  const tabsEl = document.getElementById('kn-tabs');
  const contentsEl = document.getElementById('kn-contents');
  tabsEl.innerHTML = '';
  contentsEl.innerHTML = '';

  KNOWLEDGE_DATA.forEach((kn, i) => {
    const tab = document.createElement('div');
    tab.className = 'kn-tab' + (i === 0 ? ' active' : '');
    tab.textContent = kn.name;
    tab.onclick = () => switchKnTab(kn.id);
    tabsEl.appendChild(tab);

    const content = document.createElement('div');
    content.id = `kn-${kn.id}`;
    content.className = 'kn-content' + (i === 0 ? ' active' : '');
    content.innerHTML = renderKnSections(kn.sections);
    contentsEl.appendChild(content);
  });
}

function switchKnTab(id) {
  document.querySelectorAll('.kn-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.kn-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.kn-tab').forEach(t => {
    if (t.textContent === KNOWLEDGE_DATA.find(k => k.id === id)?.name) t.classList.add('active');
  });
  const el = document.getElementById(`kn-${id}`);
  if (el) el.classList.add('active');
}

function renderKnSections(sections) {
  return sections.map(sec => {
    let body = '';
    if (sec.type === 'list') {
      body = `<ul class="kn-list">${sec.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    } else if (sec.type === 'table') {
      const thead = `<tr>${sec.headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
      const tbody = sec.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
      body = `<div style="overflow-x:auto"><table class="kn-table"><thead>${thead}</thead><tbody>${tbody}</tbody></table></div>`;
    }
    return `<div class="kn-section"><h4>${sec.title}</h4>${body}</div>`;
  }).join('');
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  renderChapters();
  updateHomeStats();
  showScreen('home-screen');
});
