// 游戏核心逻辑

// 游戏配置
const GAME_CONFIG = {
  timePerQuestion: 60,   // 每题时间(秒)
  scorePerCorrect: 100,   // 答对基础分
  scoreBonus: 50           // 时间奖励最高分
};

// 游戏状态
const state = {
  currentChapter: 0,
  currentLevel: null,
  questions: [],
  currentQIndex: 0,
  score: 0,
  correct: 0,
  timer: null,
  timeLeft: 60,
  answered: false,
  userSortAnswer: [], // SQL排序题的用户答案
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
  const typeMap = { single: '单选题', judge: '判断题', fill: '填空题', multi: '多选题', sort: 'SQL代码排序' };
  badge.textContent = typeMap[q.type] || '单选题';
  badge.className = 'q-type-badge';
  if (q.type === 'judge') badge.classList.add('judge');
  if (q.type === 'fill') badge.classList.add('fill');
  if (q.type === 'multi') badge.classList.add('multi');
  if (q.type === 'sort') badge.classList.add('sort');

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
  } else if (q.type === 'sort') {
    // SQL代码排序题型
    state.userSortAnswer = []; // 重置用户答案
    
    // 创建排序题界面
    const sortArea = document.createElement('div');
    sortArea.className = 'sort-container';
    
    // 说明文字
    const instruction = document.createElement('div');
    instruction.className = 'sort-instruction';
    instruction.textContent = '👇 点击下方代码片段，按正确顺序添加到下方答案区：';
    sortArea.appendChild(instruction);
    
    // 待选区（可点击的代码片段）
    const fragmentArea = document.createElement('div');
    fragmentArea.className = 'sort-fragments';
    fragmentArea.id = 'sort-fragments';
    q.fragments.forEach((frag, i) => {
      const btn = document.createElement('button');
      btn.className = 'sort-frag-btn';
      btn.textContent = `${i + 1}. ${frag}`;
      btn.dataset.index = i;
      btn.onclick = () => selectSortFragment(i, btn, q);
      fragmentArea.appendChild(btn);
    });
    sortArea.appendChild(fragmentArea);
    
    // 答案区（显示用户已选择的顺序）
    const answerArea = document.createElement('div');
    answerArea.className = 'sort-answer-area';
    answerArea.id = 'sort-answer-area';
    answerArea.innerHTML = '<div class="sort-answer-placeholder">答案区（点击上方片段按正确顺序添加）</div>';
    sortArea.appendChild(answerArea);
    
    // 按钮区
    const btnArea = document.createElement('div');
    btnArea.className = 'sort-btn-area';
    
    const resetBtn = document.createElement('button');
    resetBtn.className = 'confirm-btn';
    resetBtn.textContent = '重置排序';
    resetBtn.onclick = () => window.resetSortAnswer();
    resetBtn.style.marginRight = '10px';
    btnArea.appendChild(resetBtn);

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'confirm-btn';
    confirmBtn.textContent = '确认答案';
    confirmBtn.onclick = () => window.submitSortAnswer();
    btnArea.appendChild(confirmBtn);
    
    sortArea.appendChild(btnArea);
    container.appendChild(sortArea);
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

  const isLast = state.currentQIndex + 1 >= state.questions.length;
  fb.innerHTML = `
    <div class="feedback-box ${isCorrect ? 'correct-fb' : 'wrong-fb'}">
      ${isCorrect ? '✓ 回答正确！' : `✗ 答错了。正确答案：<strong>${answerText}</strong>`}
      ${q.explanation ? `<br><br>解析：${q.explanation}` : ''}
      ${(!isCorrect && q.type === 'fill' && userAns) ? `<br>你的答案：${userAns}` : ''}
    </div>
  `;

  // 创建下一题按钮并用 addEventListener 绑定
  const nextBtn = document.createElement('button');
  nextBtn.className = 'next-btn';
  nextBtn.textContent = isLast ? '查看成绩 →' : '下一题 →';
  nextBtn.addEventListener('click', nextQuestion);
  fb.appendChild(nextBtn);
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

        const isLast = state.currentQIndex + 1 >= state.questions.length;
        fb.innerHTML = `
          <div class="feedback-box wrong-fb">
            ⏰ 超时！正确答案：<strong>${answerText}</strong>
            ${q.explanation ? `<br><br>解析：${q.explanation}` : ''}
          </div>
        `;

        // 创建下一题按钮并用 addEventListener 绑定
        const nextBtn = document.createElement('button');
        nextBtn.className = 'next-btn';
        nextBtn.textContent = isLast ? '查看成绩 →' : '下一题 →';
        nextBtn.addEventListener('click', nextQuestion);
        fb.appendChild(nextBtn);
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

// ===== SQL代码排序题型函数 =====
function selectSortFragment(idx, btn, q) {
  if (state.answered) return;
  if (state.userSortAnswer.includes(idx)) return; // 已选过
  
  // 添加到用户答案
  state.userSortAnswer.push(idx);
  
  // 按钮变灰（已选）
  btn.disabled = true;
  btn.classList.add('used');
  
  // 更新答案区显示
  updateSortAnswerArea();
}

function updateSortAnswerArea() {
  const q = state.questions[state.currentQIndex];
  const answerArea = document.getElementById('sort-answer-area');
  if (!answerArea) return;

  if (state.userSortAnswer.length === 0) {
    answerArea.innerHTML = '<div class="sort-answer-placeholder">答案区（点击上方片段按正确顺序添加）</div>';
    return;
  }

  let html = '<div class="sort-answer-list">';
  state.userSortAnswer.forEach((fragIdx, order) => {
    const frag = q.fragments[fragIdx];
    html += `<div class="sort-answer-item" data-order="${order}" data-frag-idx="${fragIdx}">
      <span class="sort-order">${order + 1}</span>
      <span class="sort-frag-text">${frag}</span>
      <span class="sort-remove">✕</span>
    </div>`;
  });
  html += '</div>';
  answerArea.innerHTML = html;

  // 用闭包绑定点击事件
  answerArea.querySelectorAll('.sort-answer-item').forEach(item => {
    item.addEventListener('click', () => {
      const order = parseInt(item.dataset.order);
      const fragIdx = parseInt(item.dataset.fragIdx);
      removeSortFragment(order, fragIdx);
    });
  });
}

function removeSortFragment(order, fragIdx) {
  if (state.answered) return;

  // 从用户答案中移除
  state.userSortAnswer.splice(order, 1);

  // 恢复按钮
  const fragmentBtns = document.querySelectorAll('.sort-frag-btn');
  fragmentBtns.forEach(btn => {
    if (parseInt(btn.dataset.index) === fragIdx) {
      btn.disabled = false;
      btn.classList.remove('used');
    }
  });

  // 更新答案区
  updateSortAnswerArea();
}

function resetSortAnswer(q) {
  if (state.answered) return;
  
  state.userSortAnswer = [];
  
  // 恢复所有按钮
  const fragmentBtns = document.querySelectorAll('.sort-frag-btn');
  fragmentBtns.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('used');
  });
  
  // 清空答案区
  updateSortAnswerArea();
}

function submitSortAnswer(q) {
  if (state.answered) return;
  if (state.userSortAnswer.length !== q.fragments.length) {
    alert('请先将所有代码片段按正确顺序排列！');
    return;
  }
  
  state.answered = true;
  clearInterval(state.timer);
  
  // 检查答案
  const isCorrect = JSON.stringify(state.userSortAnswer) === JSON.stringify(q.answer);
  
  // 禁用所有按钮
  document.querySelectorAll('.sort-frag-btn').forEach(btn => btn.disabled = true);
  document.querySelectorAll('.sort-answer-item').forEach(item => {
    item.onclick = null;
    item.style.cursor = 'default';
  });
  
  if (isCorrect) {
    state.correct++;
    state.score += GAME_CONFIG.scorePerCorrect + Math.floor((state.timeLeft / GAME_CONFIG.timePerQuestion) * GAME_CONFIG.scoreBonus);
  }
  
  document.getElementById('game-score-val').textContent = state.score;
  
  // 显示反馈
  const fb = document.getElementById('feedback-container');
  const correctOrder = q.answer.map(i => `${i + 1}. ${q.fragments[i]}`).join('<br>');

  const isLast = state.currentQIndex + 1 >= state.questions.length;
  fb.innerHTML = `
    <div class="feedback-box ${isCorrect ? 'correct-fb' : 'wrong-fb'}">
      ${isCorrect ? '✓ 排列正确！' : '✗ 排列错误。'}
      <br><br>正确顺序：<br>${correctOrder}
      ${q.explanation ? `<br><br>解析：${q.explanation}` : ''}
    </div>
  `;

  // 创建下一题按钮并用 addEventListener 绑定
  const nextBtn = document.createElement('button');
  nextBtn.className = 'next-btn';
  nextBtn.textContent = isLast ? '查看成绩 →' : '下一题 →';
  nextBtn.addEventListener('click', nextQuestion);
  fb.appendChild(nextBtn);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  renderChapters();
  updateHomeStats();
  showScreen('home-screen');
});

// 将关键函数暴露到全局，供HTML内联事件和动态创建的元素使用
window.nextQuestion = nextQuestion;
window.retryLevel = retryLevel;
window.startLevel = startLevel;
window.showChapterLevels = showChapterLevels;
window.showScreen = showScreen;
window.submitSortAnswer = function() {
  const q = state.questions[state.currentQIndex];
  submitSortAnswer(q);
};
window.resetSortAnswer = function() {
  const q = state.questions[state.currentQIndex];
  resetSortAnswer(q);
};
