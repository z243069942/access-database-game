// Access数据库题库 - 河南对口招生备考专用（升级版）
// 章节：0=数据库基础, 1=表操作, 2=查询设计, 3=SQL语言, 4=窗体设计, 5=报表与其他
// 新增题型：type:"sort" SQL代码排序

const CHAPTERS = [
  {
    id:0, name:"数据库基础", icon:"🗄️",
    desc:"基本概念·数据模型·关系理论",
    color:"#e94560",
    levels:[
      {id:"0-0",name:"数据库基本概念",desc:"数据库、DBMS、数据模型",qs:18},
      {id:"0-1",name:"关系数据库理论",desc:"关系模型、键、完整性约束",qs:18},
      {id:"0-2",name:"Access界面认识",desc:"Access对象、启动操作",qs:15}
    ]
  },
  {
    id:1, name:"表的操作", icon:"📋",
    desc:"创建表·字段设置·数据类型",
    color:"#0f6e56",
    levels:[
      {id:"1-0",name:"字段数据类型",desc:"各种数据类型及使用场景",qs:18},
      {id:"1-1",name:"主键与索引",desc:"主键设置、索引类型、关系",qs:18},
      {id:"1-2",name:"表的关系与约束",desc:"一对一、一对多、参照完整性",qs:15}
    ]
  },
  {
    id:2, name:"查询设计", icon:"🔍",
    desc:"选择查询·操作查询·条件表达式",
    color:"#185fa5",
    levels:[
      {id:"2-0",name:"选择查询基础",desc:"查询类型、条件设置、字段",qs:18},
      {id:"2-1",name:"查询条件表达式",desc:"运算符、通配符、函数",qs:18},
      {id:"2-2",name:"操作查询与统计",desc:"追加、更新、删除、汇总",qs:18}
    ]
  },
  {
    id:3, name:"SQL语言", icon:"💻",
    desc:"SELECT·INSERT·UPDATE·DELETE·代码排序",
    color:"#854f0b",
    levels:[
      {id:"3-0",name:"SELECT查询基础",desc:"SELECT语法、WHERE条件、排序",qs:18},
      {id:"3-1",name:"聚合函数与分组",desc:"COUNT、SUM、GROUP BY、HAVING",qs:18},
      {id:"3-2",name:"数据操作与代码排序",desc:"INSERT、UPDATE、DELETE、SQL代码排序",qs:20}
    ]
  },
  {
    id:4, name:"窗体设计", icon:"🖼️",
    desc:"控件·属性·窗体类型",
    color:"#533ab7",
    levels:[
      {id:"4-0",name:"窗体基础",desc:"窗体类型、结构、创建方式",qs:18},
      {id:"4-1",name:"常用控件",desc:"文本框、组合框、命令按钮等",qs:18}
    ]
  },
  {
    id:5, name:"报表与宏", icon:"📊",
    desc:"报表设计·宏操作·数据导出",
    color:"#993556",
    levels:[
      {id:"5-0",name:"报表设计",desc:"报表类型、分组统计、打印",qs:18},
      {id:"5-1",name:"宏与综合应用",desc:"宏的定义、常用操作",qs:15}
    ]
  }
];

// 完整题库
const QUESTION_BANK = {
  "0-0": [
    {type:"single",text:"在数据库管理系统（DBMS）中，数据库（DB）、数据库管理系统（DBMS）、数据库系统（DBS）三者之间的关系是：",options:["DB包含DBMS和DBS","DBS包含DB和DBMS","DBMS包含DB和DBS","三者是并列关系"],answer:1,explanation:"数据库系统（DBS）是最大的概念，它包含数据库（DB）、数据库管理系统（DBMS）以及相关的硬件、软件和人员。"},
    {type:"single",text:"Access数据库属于哪种数据库类型？",options:["层次型数据库","网状型数据库","关系型数据库","面向对象数据库"],answer:2,explanation:"Access是微软公司开发的关系型数据库管理系统，数据以二维表格形式存储。"},
    {type:"single",text:"在关系模型中，一个关系对应的是：",options:["一个字段","一条记录","一张二维表","一个数据库文件"],answer:2,explanation:"在关系数据库中，'关系'就是一张二维表，每行是一条记录（元组），每列是一个属性（字段）。"},
    {type:"single",text:"下列关于数据库特点的说法，不正确的是：",options:["数据可以共享","数据独立性高","数据冗余度高","减少数据不一致性"],answer:2,explanation:"数据库的特点之一是减少数据冗余，而不是数据冗余度高。数据冗余高是文件系统管理数据的缺点。"},
    {type:"single",text:"数据的最小存储单位是：",options:["记录","字段","表","数据库"],answer:1,explanation:"字段（Field）是数据库中数据存储的最小单位，表示实体的一个属性。"},
    {type:"judge",text:"Access 2010是一个独立运行的数据库管理系统，不属于Office套件。",answer:false,explanation:"Access是Microsoft Office套件的组成部分之一，与Word、Excel等共同构成Office办公软件包。"},
    {type:"judge",text:"数据库中的数据是有结构的，而不是杂乱无序的数据集合。",answer:true,explanation:"数据库中的数据按照一定的数据模型进行组织，具有结构化特点，便于管理和检索。"},
    {type:"single",text:"在关系数据库中，用来表示实体间关系的是：",options:["字段","记录","表","关系图"],answer:2,explanation:"在关系数据库中，实体间的关系通过表（关系）来表示，两个表之间通过公共字段建立联系。"},
    {type:"fill",text:"数据库管理系统的英文缩写是_______。",answer:"DBMS",explanation:"DBMS是Database Management System的缩写，是管理数据库的软件系统。"},
    {type:"single",text:"Access数据库文件的扩展名是：",options:[".mdb 或 .accdb",".xls",".doc",".dat"],answer:0,explanation:"Access 2003及之前版本使用.mdb，Access 2007及以后版本默认使用.accdb格式。"},
    {type:"single",text:"数据库系统的核心组成部分是：",options:["数据库（DB）","数据库管理系统（DBMS）","数据库管理员（DBA）","应用程序"],answer:1,explanation:"DBMS是数据库系统的核心，所有对数据库的操作都通过DBMS完成。"},
    {type:"fill",text:"数据库中，二维表的行称为_______，列称为字段。",answer:"记录",explanation:"在关系数据库中，二维表的行（横向）称为记录（Record）或元组，列（纵向）称为字段（Field）或属性。"},
    {type:"single",text:"下列属于数据库系统特点的是：",options:["数据冗余度高","数据共享性差","数据独立性高","数据无法长期保存"],answer:2,explanation:"数据库系统的特点：数据共享性高、冗余度低、独立性高、统一管理、安全性好。"},
    {type:"judge",text:"关系数据库中的'关系'指的是实体与实体之间的联系。",answer:false,explanation:"关系数据库中的'关系'指的是二维表（Table），而不是实体之间的联系。实体间联系通过外键实现。"},
    {type:"single",text:"在数据库的三级模式结构中，用户看到的数据库是：",options:["内模式","概念模式","外模式（子模式）","存储模式"],answer:2,explanation:"外模式（子模式/用户模式）是用户看到的数据视图；概念模式是整体逻辑结构；内模式是物理存储结构。"},
    {type:"fill",text:"数据库系统的英文缩写是_______。",answer:"DBS",explanation:"DBS是Database System的缩写，包括数据库、DBMS、应用程序和数据库管理员等组成部分。"},
    {type:"single",text:"下列数据模型中，用树形结构表示实体间联系的是：",options:["关系模型","层次模型","网状模型","面向对象模型"],answer:1,explanation:"层次模型用树形结构表示实体间的一对多联系；网状模型允许多对多；关系模型用二维表。"},
    {type:"single",text:"Access 2010使用的数据库文件格式默认是：",options:[".mdb",".accdb",".adp",".mde"],answer:1,explanation:"Access 2007及以后版本（包括2010）默认使用.accdb格式，支持更多新特性。"}
  ],
  "0-1": [
    {type:"single",text:"在关系数据库中，能唯一标识一条记录的字段或字段组合称为：",options:["外键","候选键","主键","超键"],answer:2,explanation:"主键（Primary Key）是用来唯一标识表中每一条记录的字段或字段组合，不允许重复和为空。"},
    {type:"single",text:"关系的完整性约束包括：",options:["实体完整性、域完整性、参照完整性","实体完整性、参照完整性、用户自定义完整性","实体完整性、关系完整性、参照完整性","域完整性、关系完整性、用户定义完整性"],answer:1,explanation:"关系完整性包括三类：实体完整性（主键不空）、参照完整性（外键约束）、用户自定义完整性（业务规则）。"},
    {type:"single",text:"在关系模型中，实体完整性要求：",options:["外键值不能为空","主键值不能重复或为空","所有字段都不能为空","属性值必须在规定范围内"],answer:1,explanation:"实体完整性规定主键的值不能为NULL，也不能重复，以保证每条记录的唯一性。"},
    {type:"judge",text:"在关系数据库中，外键可以是另一个表的主键，也可以是本表的主键。",answer:true,explanation:"外键引用的是另一个表（或本表）的主键，用于建立表间的关联关系，实现参照完整性。"},
    {type:"single",text:"下列说法正确的是：",options:["一个表只能有一个候选键","一个表可以有多个主键","候选键的值可以重复","一个表可以有多个候选键但只能指定一个作为主键"],answer:3,explanation:"一个表可能有多个候选键（都能唯一标识记录），但只能指定其中一个作为主键。"},
    {type:"fill",text:"在关系数据库中，引用其他表主键的字段称为_______。",answer:"外键",explanation:"外键（Foreign Key）是一个表中引用另一个表主键的字段，用于建立两个表之间的关系。"},
    {type:"single",text:"关系模型中，一张表的行数称为：",options:["关系的度","关系的基数","关系的域","关系的属性"],answer:1,explanation:"关系的基数（Cardinality）指表中的行数（记录数），而关系的度（Degree）指表中的列数（字段数）。"},
    {type:"judge",text:"关系数据库中，参照完整性要求外键的值必须是另一个表主键中已存在的值或为空值NULL。",answer:true,explanation:"参照完整性约束：外键的值要么等于被引用表中某个主键值，要么为NULL（如果允许的话）。"},
    {type:"single",text:"在E-R图中，矩形框表示：",options:["属性","联系","实体","关键字"],answer:2,explanation:"在E-R图（实体-联系图）中，矩形框表示实体，椭圆表示属性，菱形表示联系。"},
    {type:"single",text:"下列关于关系数据库规范化的说法，正确的是：",options:["规范化程度越高越好","第三范式必须满足第二范式","满足第二范式的一定满足第三范式","规范化会增加数据冗余"],answer:1,explanation:"范式有层次关系：1NF→2NF→3NF，高范式包含低范式的要求，即满足3NF必先满足2NF。"},
    {type:"single",text:"第一范式（1NF）要求：",options:["每个字段都是不可再分的基本数据项","有主键即可","消除传递依赖","消除部分依赖"],answer:0,explanation:"1NF要求字段的原子性，即每个字段都不可再分。如'地址'字段不能包含'省'和'市'两个信息。"},
    {type:"fill",text:"在关系数据库中，能唯一标识记录但不一定被选为主键的候选键称为_______。",answer:"候选键",explanation:"候选键（Candidate Key）是能满足唯一性和最小性的字段或字段组合，主键是从候选键中选出的一个。"},
    {type:"single",text:"第二范式（2NF）是在第一范式的基础上消除了：",options:["非主属性对主键的传递依赖","非主属性对主键的部分依赖","多值依赖","所有依赖关系"],answer:1,explanation:"2NF要求消除非主属性对主键的部分函数依赖，即所有非主键字段都完全依赖于整个主键。"},
    {type:"judge",text:"第三范式（3NF）是在第二范式的基础上消除了非主属性对主键的传递依赖。",answer:true,explanation:"3NF=2NF+消除传递依赖。如：学号→院系→院长，院长传递依赖于学号，不符合3NF。"},
    {type:"single",text:"在关系数据库中，超键（Super Key）是指：",options:["能唯一标识记录的最小字段组合","能唯一标识记录的字段组合（可能包含多余字段）","主键的别名","外键的集合"],answer:1,explanation:"超键是能唯一标识记录的字段集合，可能包含多余字段；候选键是不含多余字段的超键（最小超键）。"},
    {type:"fill",text:"E-R图中，用_______形框表示实体与实体之间的联系。",answer:"菱形",explanation:"E-R图中：矩形=实体，椭圆=属性，菱形=联系（Relationship）。"},
    {type:"single",text:"下列关系中，一个学生可以选择多门课程，一门课程可以被多个学生选择，这是：",options:["一对一关系","一对多关系","多对多关系","以上都不是"],answer:2,explanation:"多对多（M:N）关系需要借助中间表（连接表）来实现，中间表包含两个实体的外键。"},
    {type:"single",text:"在Access中，若要使某字段的值自动递增且唯一，最佳的数据类型是：",options:["数字型","文本型","自动编号型","日期/时间型"],answer:2,explanation:"自动编号（AutoNumber）类型会在新增记录时自动生成唯一的递增数字，是主键的常用选择。"}
  ],
  "0-2": [
    {type:"single",text:"Access数据库中包含的七种对象不包括：",options:["表","查询","窗体","程序"],answer:3,explanation:"Access的七大对象是：表、查询、窗体、报表、宏、模块、页（数据访问页），没有'程序'对象。"},
    {type:"single",text:"在Access中，存储数据的基本对象是：",options:["窗体","查询","表","报表"],answer:2,explanation:"表是Access中存储数据的基本对象，其他对象（查询、窗体、报表等）都是基于表的数据进行操作。"},
    {type:"judge",text:"在Access中，打开数据库后可以直接看到数据库中所有对象。",answer:true,explanation:"在Access的导航窗格中，可以查看并访问数据库中的所有对象（表、查询、窗体、报表等）。"},
    {type:"single",text:"Access数据库文件在2007版本后默认使用的扩展名为：",options:[".mdb",".accdb",".xls",".db"],answer:1,explanation:"Access 2007及以后版本（2010、2013、2016等）默认使用.accdb格式，旧版本使用.mdb格式。"},
    {type:"fill",text:"Access中，用于与用户交互、输入和显示数据的对象称为_______。",answer:"窗体",explanation:"窗体（Form）是Access中用于用户交互的对象，提供友好的数据输入和显示界面。"},
    {type:"single",text:"在Access中，可以对数据库中的数据进行打印输出的对象是：",options:["表","查询","窗体","报表"],answer:3,explanation:"报表（Report）是Access中专门用于数据格式化和打印输出的对象，可以按指定格式打印数据。"},
    {type:"single",text:"Access中的宏对象主要用于：",options:["存储数据","查询数据","自动化操作","显示数据"],answer:2,explanation:"宏是一组自动化操作命令的集合，用于自动执行重复性任务，提高工作效率。"},
    {type:"judge",text:"在Access中，模块是使用VBA（Visual Basic for Applications）语言编写的程序代码。",answer:true,explanation:"模块是Access中使用VBA语言编写的代码集合，可以实现比宏更复杂的自动化功能。"},
    {type:"single",text:"在Access中，用于批量处理数据、生成动态报表的对象是：",options:["表","查询","窗体","宏"],answer:1,explanation:"查询（Query）用于从表中检索和处理数据，可以进行筛选、排序、计算等操作，是报表的数据来源。"},
    {type:"fill",text:"Access数据库的默认排序方式是按_______顺序排列记录。",answer:"主键",explanation:"如果表设置了主键，Access默认按主键值的顺序排列记录；如果没有主键，则按输入顺序排列。"},
    {type:"single",text:"在Access中，'数据表视图'主要用于：",options:["设计表结构","浏览和编辑表中的数据","创建查询","设计窗体"],answer:1,explanation:"数据表视图以表格形式显示表中的数据，可以直接浏览、添加、修改和删除记录。"},
    {type:"single",text:"Access中，'设计视图'的主要用途是：",options:["输入数据","修改表结构、查询条件等","打印数据","运行宏"],answer:1,explanation:"设计视图用于创建和修改对象的结构，如表的设计视图用于设置字段名、数据类型、属性等。"},
    {type:"judge",text:"在Access 2010中，一个数据库文件可以包含多个表。",answer:true,explanation:"一个Access数据库文件（.accdb）可以包含多个表，以及查询、窗体、报表等其他对象。"},
    {type:"fill",text:"在Access中，用于根据已有表或查询创建新表的查询类型是_______查询。",answer:"生成表",explanation:"生成表查询（Make Table Query）将查询结果保存为一个新的表，适用于数据备份或创建子集。"},
    {type:"single",text:"Access中，'压缩和修复数据库'功能的主要作用是：",options:["备份数据库","减小数据库文件大小、修复错误","加密数据库","共享数据库"],answer:1,explanation:"压缩和修复可以回收删除记录后的存储空间，减小文件大小，并修复一些数据库错误。"}
  ],
// 表操作 - 字段数据类型（1-0）
  "1-0": [
    {type:"single",text:"在Access中，用于存储整数的数据类型是：",options:["文本型","数字型","是/否型","日期/时间型"],answer:1,explanation:"数字型（Number）用于存储数值数据，包括整数和小数，适合进行数学计算。"},
    {type:"single",text:"Access中，'是/否'数据类型占用的存储空间为：",options:["1字节","2字节","1位","4字节"],answer:2,explanation:"是/否型（Boolean）只存储两个值（True/False），只需1位（bit）存储空间，非常节省。"},
    {type:"single",text:"在Access中，存储图片、声音等多媒体数据应使用：",options:["文本","备注","OLE对象","超链接"],answer:2,explanation:"OLE对象数据类型用于存储图片、声音、视频等多媒体数据，或其他应用程序创建的对象。"},
    {type:"single",text:"Access文本型字段默认最多可以存储多少个字符？",options:["50个","100个","255个","1024个"],answer:2,explanation:"Access中文本型（Text）字段最多可存储255个字符，默认大小通常设为50。超过255字符需用备注型。"},
    {type:"judge",text:"在Access中，货币型数据类型的精度是4位小数。",answer:true,explanation:"货币型（Currency）精度为小数点后4位，用于金融计算，能避免舍入误差。"},
    {type:"single",text:"下列哪种数据类型适合存储学生的学号（如：20230101）？",options:["数字型","文本型","自动编号","日期/时间型"],answer:1,explanation:"学号虽然看起来是数字，但不需要进行数学运算，且可能有前导零，应使用文本型存储。"},
    {type:"single",text:"Access中'自动编号'数据类型的特点是：",options:["用户手动输入，自动格式化","每次新增记录时自动递增","存储日期时间","存储是或否"],answer:1,explanation:"自动编号（AutoNumber）每次新增记录时自动生成一个唯一的递增数字，常用作主键。"},
    {type:"fill",text:"在Access中，用于存储超过255个字符的长文本数据，应使用_______数据类型。",answer:"备注",explanation:"备注型（Memo）可以存储最多约65536个字符的长文本，适合存储描述性的长段文字。"},
    {type:"single",text:"在Access中，'超链接'数据类型主要用于存储：",options:["数字链接","网址或文件路径","图片文件","声音文件"],answer:1,explanation:"超链接型用于存储网址（URL）或文件路径，点击时可以打开相应的网页或文件。"},
    {type:"judge",text:"在Access中，对于参与数学计算的字段，应选择文本型数据类型。",answer:false,explanation:"需要参与数学计算的字段应选择数字型或货币型，文本型不能直接进行数学计算。"},
    {type:"single",text:"Access中，'日期/时间'数据类型占用的存储空间是：",options:["4字节","8字节","16字节","不固定"],answer:1,explanation:"日期/时间型（Date/Time）固定占用8字节存储空间，可以存储从100年到9999年的日期时间。"},
    {type:"fill",text:"在Access中，用于生成全局唯一标识符（GUID）的数据类型是_______。",answer:"自动编号",explanation:"自动编号类型可以设置为'同步复制ID'格式，生成全局唯一的GUID值。"},
    {type:"single",text:"在Access中，'查阅向导'数据类型实际上是什么类型的特殊形式？",options:["文本型","数字型","可以从其他表或值列表中查找数据","日期型"],answer:2,explanation:"查阅向导不是独立的数据类型，它创建一个从其他表或值列表中查找并显示数据的字段，底层通常是数字或文本型。"},
    {type:"single",text:"下列哪项不是Access的常用数据类型？",options:["文本型","数字型","数组型","是/否型"],answer:2,explanation:"Access常用数据类型包括：文本、备注、数字、日期/时间、货币、自动编号、是/否、OLE对象、超链接、查阅向导。没有'数组型'。"},
    {type:"judge",text:"Access中，文本型字段可以转换为数字型字段，且原有数据会自动转换。",answer:false,explanation:"修改字段数据类型时，如果原有数据与新类型不兼容，数据可能会丢失或转换失败，需要谨慎操作。"},
    {type:"fill",text:"在Access中，用于存储金额数据且要求高精度计算的数据类型是_______。",answer:"货币",explanation:"货币型（Currency）专门用于存储金额，精度为小数点后4位，避免浮点数舍入误差。"},
    {type:"single",text:"Access的'备注'数据类型与'文本'数据类型的主要区别是：",options:["备注型可以索引，文本型不能","文本型最多255字符，备注型最多约64K字符","备注型可以排序，文本型不能","两者没有区别"],answer:1,explanation:"文本型最多255个字符；备注型（Long Text）最多约65536个字符（Access 2013后），适合长文本。"},
    {type:"single",text:"在Access表设计视图中，'字段大小'属性用于设置：",options:["字段的名称长度","数字型或文本型字段的存储大小","字段的显示宽度","字段的排序方式"],answer:1,explanation:"'字段大小'属性用于设置文本型（最多255）或数字型（字节/整数/长整数等）的存储大小。"}
  ],
// 主键与索引（1-1）
  "1-1": [
    {type:"single",text:"在Access中，设置主键的目的是：",options:["提高查询速度","唯一标识每条记录","限制字段的数据类型","设置字段默认值"],answer:1,explanation:"主键的主要作用是唯一标识表中的每一条记录，保证记录的唯一性，同时Access会自动为主键创建索引。"},
    {type:"single",text:"Access中，主键字段的值：",options:["可以为空","可以重复","不能为空也不能重复","可以重复但不能为空"],answer:2,explanation:"主键要求：值不能为NULL（空），也不能重复，每条记录的主键值必须是唯一的。"},
    {type:"judge",text:"一个Access表可以设置多个字段共同构成主键（复合主键）。",answer:true,explanation:"当单个字段不能唯一标识记录时，可以选择多个字段共同组成复合主键（联合主键）。"},
    {type:"single",text:"在Access中，建立索引的主要目的是：",options:["减少数据冗余","加快数据查询速度","保证数据完整性","减少存储空间"],answer:1,explanation:"索引通过额外的数据结构加速数据检索，就像书的目录一样，能大幅提高查询速度。"},
    {type:"single",text:"在Access表设计视图中，设置'索引'属性为'有（有重复）'表示：",options:["创建唯一索引","创建允许重复值的普通索引","不创建索引","创建主键索引"],answer:1,explanation:"'有（有重复）'表示创建普通索引，索引字段的值允许重复；'有（无重复）'表示创建唯一索引。"},
    {type:"fill",text:"在Access中，将两个表通过相关字段联系起来的操作称为建立表间_______。",answer:"关系",explanation:"通过建立表间关系（Relationship），可以将不同表中的相关数据联系起来，实现多表查询。"},
    {type:"single",text:"在Access中，设置参照完整性后，以下操作会被阻止的是：",options:["在主表中修改非主键字段","在从表中添加在主表中不存在的外键值","在主表中添加新记录","在从表中修改非外键字段"],answer:1,explanation:"启用参照完整性后，不能在从表中输入主表中不存在的外键值，保证数据一致性。"},
    {type:"single",text:"在Access关系中，'一对多'关系表示：",options:["两个表互相引用对方","主表的一条记录对应从表的多条记录","两个表的记录数相同","从表的一条记录对应主表的多条记录"],answer:1,explanation:"一对多（1:N）是最常见的关系类型：主表中一条记录可以对应从表中多条相关记录。"},
    {type:"judge",text:"在Access中，建立关系时，主表的关联字段必须是主键或有唯一索引。",answer:true,explanation:"要建立关系，主表（一方）的关联字段必须是主键或设置了唯一索引，从表（多方）的字段是外键。"},
    {type:"single",text:"Access中，'级联更新相关字段'的含义是：",options:["更新从表记录时主表自动更新","更新主表主键时从表外键值自动更新","删除记录时自动更新","添加记录时自动检查"],answer:1,explanation:"'级联更新'：修改主表主键值时，所有从表中对应的外键值自动同步更新，保持数据一致性。"},
    {type:"single",text:"在Access中，以下哪种索引类型不允许字段值重复？",options:["普通索引（有重复）","唯一索引（无重复）","主键索引","以上都是"],answer:1,explanation:"唯一索引（无重复）要求索引字段的值不能重复；普通索引允许重复值；主键索引自动是唯一索引。"},
    {type:"fill",text:"在Access中，由多个字段共同组成的主键称为_______主键。",answer:"复合",explanation:"复合主键（Composite Primary Key）由多个字段组合而成，当单个字段无法唯一标识记录时使用。"},
    {type:"single",text:"Access中，关于主键的说法正确的是：",options:["每个表必须有主键","主键只能是单个字段","主键的值可以由用户手动输入","自动编号字段是主键的理想选择"],answer:3,explanation:"自动编号字段自动生成唯一值，适合作为主键；并不是每个表都必须有主键，但建议设置。"},
    {type:"judge",text:"在Access中，删除主键后会同时删除基于该主键的所有关系。",answer:true,explanation:"删除主键（或更改主键字段）会断开基于该主键的所有关系，操作前系统会提示确认。"},
    {type:"single",text:"在Access中，'输入掩码'属性主要用于：",options:["限制字段值范围","引导和规范数据输入格式","设置字段显示格式","定义字段默认值"],answer:1,explanation:"输入掩码（Input Mask）定义数据输入格式，如电话号码(999)000-0000，确保数据格式统一。"},
    {type:"fill",text:"Access中，同时按_______键可以在设计视图和数据表视图之间快速切换。",answer:"F6",explanation:"在Access表设计中，按F6键可以在设计视图和数据表视图之间切换（不同版本可能略有不同，也可通过视图菜单切换）。"},
    {type:"single",text:"在Access中，若要禁止在某个字段中输入重复值，应设置：",options:["必填字段=是","索引=有（无重复）","默认值","输入掩码"],answer:1,explanation:"设置索引为'有（无重复）'会创建唯一索引，禁止字段值重复，类似于主键但不限定只能有一个。"},
    {type:"single",text:"Access中，关于'有效性规则'的说法正确的是：",options:["有效性规则用于设置字段默认值","有效性规则用于限制字段可接受的值","有效性规则会自动修复错误数据","有效性规则只能在VBA中设置"],answer:1,explanation:"有效性规则（Validation Rule）设置字段值必须满足的条件，如'>0 And <100'，输入不满足条件时会提示错误。"}
  ],
// 表的关系与约束（1-2）
  "1-2": [
    {type:"single",text:"在Access中，两个表之间建立关系后，在'关系'窗口中关系线上显示的'1'和'∞'符号分别表示：",options:["主键和外键","'一'方和'多'方","唯一索引和普通索引","主表和从表"],answer:1,explanation:"关系线上的'1'表示关系的'一'方（主表），'∞'表示关系的'多'方（从表），共同说明是一对多关系。"},
    {type:"judge",text:"在Access中，设置'级联删除相关记录'后，删除主表中的记录时，从表中对应记录也会自动删除。",answer:true,explanation:"'级联删除'：删除主表记录时，从表中所有与之关联的记录会自动被同步删除。"},
    {type:"single",text:"下列关于Access表属性的说法正确的是：",options:["'必填字段'设为'是'表示该字段可以为空","'输入掩码'用于格式化数据输入","'有效性规则'用于设置字段默认值","'默认值'不允许用户修改"],answer:1,explanation:"输入掩码（Input Mask）定义数据输入格式，如电话号码格式(999)000-0000，引导用户规范输入。"},
    {type:"fill",text:"在Access字段属性中，'有效性规则'用于设置字段值必须满足的_______条件。",answer:"验证",explanation:"有效性规则（Validation Rule）是对字段值的约束条件，只有满足条件的值才能被保存。"},
    {type:"single",text:"在Access表设计中，设置某字段的'默认值'属性的作用是：",options:["限制字段的输入范围","新增记录时自动填入该值","该字段不允许修改","设置字段格式"],answer:1,explanation:"默认值（Default Value）：新建记录时，如果用户没有输入该字段的值，系统自动填入预设的默认值。"},
    {type:"single",text:"Access中，字段的'标题'属性用于：",options:["存储数据的实际内容","在界面上显示替代字段名的友好名称","设置字段的数据类型","定义字段的大小"],answer:1,explanation:"标题（Caption）属性设置字段在窗体、报表或数据表视图中显示的标签文字，不影响字段名本身。"},
    {type:"judge",text:"Access中，一个字段只能在一个索引中使用。",answer:false,explanation:"一个字段可以参与多个索引，同时一个复合索引也可以包含多个字段。"},
    {type:"single",text:"在Access中，'参照完整性'约束的是：",options:["主键字段的唯一性","字段值的有效范围","外键与主键之间的一致性","记录的完整性"],answer:2,explanation:"参照完整性约束外键与被引用表主键之间的关系，确保从表中的外键值在主表主键中存在。"},
    {type:"single",text:"在Access关系中，若要实现'多对多'关系，需要：",options:["直接在两个表间建立关系","创建第三个中间表（连接表）","使用查阅向导","无法实现"],answer:1,explanation:"多对多关系需要通过创建中间表（连接表）来实现，中间表包含两个实体的外键，形成两个一对多关系。"},
    {type:"fill",text:"在Access中，'有效性文本'属性用于设置当输入数据违反_______时显示的提示信息。",answer:"有效性规则",explanation:"有效性文本（Validation Text）是当输入值不满足有效性规则时，弹出的错误提示信息。"},
    {type:"single",text:"Access中，关于'必填字段'属性的说法正确的是：",options:["必填字段=是，表示字段值可以为NULL","必填字段=否，表示字段必须有值","必填字段=是，表示字段不允许为NULL","必填字段不影响数据输入"],answer:2,explanation:"必填字段（Required）=是：该字段必须填写值，不能为NULL；=否：可以为NULL。"},
    {type:"single",text:"在Access中，若要同时按多个字段排序记录，应使用：",options:["只能按一个字段排序","在筛选设置中依次指定","高级筛选/排序功能","无法实现"],answer:2,explanation:"使用'高级筛选/排序'可以在Access中按多个字段排序，还可以设置不同的排序方向。"},
    {type:"judge",text:"在Access中，删除表时会同时删除表中的所有数据和表结构。",answer:true,explanation:"删除表操作会永久删除表结构和所有数据，操作不可撤销，需谨慎。"},
    {type:"fill",text:"在Access中，用于定义字段在数据表视图中显示宽度的属性是_______。",answer:"列宽",explanation:"在数据表视图中，可以拖动字段列边缘调整列宽，或通过'格式'菜单中的'列宽'精确设置。"},
    {type:"single",text:"Access中，若要查找表中重复的记录，应使用：",options:["选择查询","重复项查询向导","交叉表查询","参数查询"],answer:1,explanation:"使用'查找重复项查询向导'可以快速找出表中某个字段值重复的所有记录。"}
  ],
// ===== 查询设计章节 =====
// 选择查询基础（2-0）
  "2-0": [
    {type:"single",text:"Access中，从一个或多个表中检索满足条件的数据，应使用：",options:["追加查询","更新查询","选择查询","删除查询"],answer:2,explanation:"选择查询（Select Query）是最常用的查询类型，用于从表中检索、筛选和显示满足条件的记录。"},
    {type:"single",text:"在Access查询设计视图中，'条件'行用于：",options:["设置查询结果的排序方式","设置字段的显示格式","设置筛选记录的条件","设置字段别名"],answer:2,explanation:"在查询设计视图的'条件'行中输入筛选条件，只有满足条件的记录才会出现在查询结果中。"},
    {type:"judge",text:"在Access查询中，同一字段的不同条件写在同一行的'条件'中，表示这些条件之间是AND关系。",answer:true,explanation:"同一行的多个条件之间是AND（与）关系，所有条件都满足才显示该记录；不同行之间是OR（或）关系。"},
    {type:"single",text:"查询中，如果要显示所有姓'张'的学生，在姓名字段条件行应输入：",options:['="张"','Like "张*"','="张*"','Like "张"'],answer:1,explanation:'使用Like运算符配合通配符：Like "张*" 表示以"张"开头的任意字符串。*是通配符，代表零个或多个字符。'},
    {type:"fill",text:"在Access查询中，表示'大于等于'的运算符是_______。",answer:">=",explanation:"比较运算符：>（大于）、>=（大于等于）、<（小于）、<=（小于等于）、=（等于）、<>（不等于）。"},
    {type:"single",text:"在Access查询的条件中，要表示80到100之间（包含两端），可以使用：",options:[">=80 And <=100","80<=x<=100","Between 80 And 100","A或C都可以"],answer:3,explanation:"两种写法均正确：①>=80 And <=100 ②Between 80 And 100，效果相同，都包含边界值80和100。"},
    {type:"single",text:"下列关于Access查询的说法，不正确的是：",options:["查询可以基于多个表","查询结果可以作为另一个查询的数据源","查询会永久保存检索出的数据","查询可以包含计算字段"],answer:2,explanation:"查询本身不存储数据，只保存查询定义。每次运行查询时从原始表中提取数据，结果是动态的。"},
    {type:"single",text:"在Access查询中，要显示'成绩'字段的前10名学生，应使用：",options:["添加排序后设置返回记录数","使用删除查询","使用追加查询","使用更新查询"],answer:0,explanation:"设置'成绩'字段降序排列，然后在查询属性中设置'返回'（Top Values）为10，即可显示前10名。"},
    {type:"judge",text:"在Access中，交叉表查询可以将一个字段的多个值作为列标题显示。",answer:true,explanation:"交叉表查询（Crosstab Query）将字段值转换为列标题，以紧凑的格式显示汇总数据，类似Excel数据透视表。"},
    {type:"single",text:"在Access查询中，设置字段的别名（显示标题）的语法是：",options:["字段名 AS 别名","别名：字段名","字段名=别名","[别名]字段名"],answer:1,explanation:"在查询设计视图中，在字段名前加'别名:'的方式设置别名，如'总分:成绩'，结果列标题显示为'总分'。"},
    {type:"single",text:"在Access中，参数查询的特点是：",options:["查询条件固定不变","运行时弹出对话框提示用户输入条件","只能基于一个表","不能包含计算字段"],answer:1,explanation:"参数查询在运行时显示参数提示对话框，要求用户输入条件值，使查询更加灵活。"},
    {type:"fill",text:"在Access查询设计视图中，要在字段行不显示某字段但仍在查询中使用该字段（如用于条件），应将_______行设置为'否'。",answer:"显示",explanation:"'显示'行控制字段是否出现在查询结果中；设为'否'则该字段用于条件或排序但不显示。"},
    {type:"single",text:"Access中，用于创建基于多个表的查询的方法是：",options:["只能基于一个表","在查询设计视图中添加多个表","使用自动报表","无法实现"],answer:1,explanation:"在查询设计视图中，可以添加多个表（通过'显示表'对话框），并建立表间关系，创建多表查询。"},
    {type:"single",text:"在Access查询中，要把查询结果按'成绩'降序排列，应在'排序'行选择：",options:["不排序","升序","降序","随机"],answer:2,explanation:"排序行有'升序'（A→Z，小→大）和'降序'（Z→A，大→小）两个选项。"},
    {type:"judge",text:"在Access中，可以基于一个查询再创建另一个查询（嵌套查询）。",answer:true,explanation:"查询结果本身可以被视为一个'虚拟表'，作为另一个查询的数据源，这就是嵌套查询或层叠查询。"},
    {type:"fill",text:"在Access中，用于提示用户输入参数值的参数查询，在条件行应使用方括号，如：[请输入姓名：_______]。",answer:"]",explanation:"参数查询条件格式：[提示文字]，如 Like [请输入姓名：] & '*'，运行时会弹出对话框提示输入。"},
    {type:"single",text:"Access中，'查找不匹配项查询向导'的作用是：",options:["找出两个表中匹配的记录","找出在主表中存在但在从表中没有对应记录的记录","找出所有重复记录","找出空值记录"],answer:1,explanation:"'查找不匹配项查询'用于找出在主表中存在，但在关联表中没有对应记录的记录，常用于查找缺失数据。"},
    {type:"single",text:"在Access查询中，计算字段'年龄: Year(Date())-Year([出生日期])'的作用是：",options:["计算出生年份","计算当前年龄（近似值）","计算日期差","以上都不对"],answer:1,explanation:"Year(Date())获取当前年份，减去出生年份，得到年龄。注意这是近似值，未考虑具体月和日。"}
  ],
// 查询条件表达式（2-1）
  "2-1": [
    {type:"single",text:"在Access查询条件中，通配符'?'表示：",options:["任意多个字符","任意一个字符","数字字符","非字母字符"],answer:1,explanation:"在Access中，通配符'?'（问号）匹配任意一个字符，'*'（星号）匹配任意多个字符。"},
    {type:"fill",text:"在Access中，要查找所有包含'数据'两字的记录，Like条件应写为：Like _______。",answer:'"*数据*"',explanation:'Like "*数据*"：前后都有*通配符，表示字段值中任意位置包含"数据"二字。'},
    {type:"single",text:"在Access查询条件中，'Is Null'的含义是：",options:["字段值等于0","字段值为空字符串","字段值为NULL（未填写）","字段值为假"],answer:2,explanation:"Is Null用于检测字段值是否为NULL（即未填写任何值），Is Not Null表示字段有值。注意NULL≠空字符串。"},
    {type:"single",text:"在Access中，Date()函数的作用是：",options:["返回系统当前日期","返回日期字段的值","计算两个日期的差","格式化日期显示"],answer:0,explanation:"Date()函数返回系统当前日期（不含时间），Now()返回当前日期和时间，Time()返回当前时间。"},
    {type:"judge",text:"在Access查询中，条件'Not Like \"王*\"'表示筛选姓名不以'王'开头的记录。",answer:true,explanation:"Not运算符取反：Not Like '王*' 表示姓名不以'王'字开头的所有记录。"},
    {type:"single",text:"在Access中，要在查询中创建计算字段'平均成绩'（数学和语文成绩的平均），应在字段行输入：",options:["平均成绩:[数学]+[语文]/2","平均成绩=([数学]+[语文])/2","平均成绩:([数学]+[语文])/2","([数学]+[语文])/2 AS 平均成绩"],answer:2,explanation:"计算字段格式：别名:表达式。如'平均成绩:([数学]+[语文])/2'，字段名和表达式用':'分隔。"},
    {type:"single",text:"Access中，Year()函数的作用是：",options:["返回当前年份","从日期中提取年份数字","格式化年份显示","计算年龄"],answer:1,explanation:"Year([字段名])从日期值中提取年份，如Year(#2023-09-01#)返回2023。类似的有Month()、Day()。"},
    {type:"fill",text:"在Access查询中，要筛选'出生日期'在1990年到2000年之间的记录，条件应为：Between _______ And _______。",answer:"#1990-1-1# #2000-12-31#",explanation:"日期值需要用#号括起来。Between #1990-1-1# And #2000-12-31# 表示1990年到2000年的日期范围。"},
    {type:"single",text:"在Access中，Len()函数的作用是：",options:["返回字段的最大长度","计算字符串的字符个数","检测字符串是否为空","截取字符串"],answer:1,explanation:"Len(字符串)返回字符串的字符数，如Len('Access')返回6。可用于筛选特定长度的字段值。"},
    {type:"judge",text:"在Access查询中，字段条件行输入'In(\"北京\",\"上海\",\"广州\")'可以筛选城市是北京、上海或广州的记录。",answer:true,explanation:'In运算符用于判断值是否属于指定列表中，In("北京","上海","广州")等价于="北京" Or ="上海" Or ="广州"。'},
    {type:"single",text:"在Access查询条件中，要表示'成绩小于60或不填'，条件是：",options:[">60","<60","<60 Or Is Null","<60 And Is Null"],answer:2,explanation:"Or表示'或'关系：成绩小于60，或者成绩字段为NULL（未填写）。"},
    {type:"fill",text:"在Access中，用于返回字符串左边指定字符数的函数是_______。",answer:"Left",explanation:"Left(字符串, 字符数)返回字符串左侧指定数量的字符；类似的有Right()（右侧）、Mid()（中间）。"},
    {type:"single",text:"Access中，Mid('HelloWorld',3,4)的返回值是：",options:["Hel","lloW","llo","World"],answer:1,explanation:"Mid(字符串, 起始位置, 字符数)：从第3个字符开始取4个字符。'HelloWorld'第3位是'l'，取4位得'lloW'。"},
    {type:"single",text:"在Access查询中，条件'Like \"[A-C]*\"'表示：",options:["以A或C开头","以A到C范围内的字母开头","包含A-C字符","以上都不对"],answer:1,explanation:"方括号[]表示字符范围，[A-C]表示A、B、C中任意一个字母。所以Like '[A-C]*'表示以A、B或C开头。"},
    {type:"judge",text:"在Access中，空字符串（''）和NULL值是相同的概念。",answer:false,explanation:"空字符串是长度为0的字符串，是一个有效的值；NULL表示字段没有值（未填写）。两者不同，Is Null不检测空字符串。"},
    {type:"fill",text:"在Access中，用于连接两个字符串的运算符是_______（或+号）。",answer:"&",explanation:"& 是字符串连接运算符，如'Hello' & ' ' & 'World' 结果为 'Hello World'。+号也可以，但&更常用且更安全。"},
    {type:"single",text:"Access中，Format()函数的作用是：",options:["格式化字符串显示方式","计算字符串长度","转换数据类型","查找子字符串"],answer:0,explanation:"Format()函数将数值或日期按照指定格式显示为字符串，如Format(0.5,'Percent')显示'50%'。"},
    {type:"single",text:"在Access查询条件中，'Not In(\"北京\",\"上海\")'表示：",options:["只显示北京和上海","不显示北京和上海，显示其他城市","显示所有记录","语法错误"],answer:1,explanation:"Not In(...) 取反：不在列表中的值。所以不显示北京和上海的记录，显示其他城市。"}
  ],
// 操作查询与统计（2-2）
  "2-2": [
    {type:"single",text:"Access中，将查询结果追加到另一个表的查询类型是：",options:["选择查询","删除查询","更新查询","追加查询"],answer:3,explanation:"追加查询（Append Query）将查询结果中的记录追加到指定表中，适用于数据迁移和批量添加。"},
    {type:"single",text:"在Access中，批量修改表中满足条件记录的字段值，应使用：",options:["选择查询","更新查询","追加查询","生成表查询"],answer:1,explanation:"更新查询（Update Query）用于批量修改表中满足指定条件的记录的字段值，如给所有员工涨薪10%。"},
    {type:"judge",text:"在Access中，操作查询（追加、更新、删除、生成表查询）执行后，数据的改变是不可撤销的。",answer:true,explanation:"操作查询直接修改表中的数据，一旦执行就会永久改变数据。建议执行前备份，或先用选择查询预览。"},
    {type:"single",text:"在Access分组统计查询中，'总计'行中'Group By'的含义是：",options:["对该字段的值求和","按该字段的值进行分组","统计该字段的记录数","计算该字段的平均值"],answer:1,explanation:"在汇总查询中，'Group By'表示按该字段分组统计，Count、Sum等函数对每个分组分别计算。"},
    {type:"single",text:"在Access查询中，Count(*)表示：",options:["统计某字段的合计","统计非空记录数","统计所有记录的总数","计算记录的平均值"],answer:2,explanation:"Count(*)统计查询结果中所有记录的总数（包含NULL值）；Count([字段名])只统计该字段非NULL的记录数。"},
    {type:"fill",text:"在Access汇总查询中，对数字字段求最大值应使用_______函数。",answer:"Max",explanation:"常用聚合函数：Sum（求和）、Avg（平均值）、Count（计数）、Max（最大值）、Min（最小值）。"},
    {type:"single",text:"生成表查询与选择查询的主要区别是：",options:["生成表查询不能有条件","生成表查询将结果保存为新表","生成表查询只能操作一个表","生成表查询不能使用聚合函数"],answer:1,explanation:"生成表查询（Make Table Query）将查询结果创建并保存为一个新的永久表，而选择查询只显示动态结果。"},
    {type:"single",text:"在Access查询中，'Having'子句用于：",options:["筛选分组前的记录","筛选分组后的聚合结果","设置字段排序","定义计算字段"],answer:1,explanation:"Having子句对GROUP BY分组后的结果进行过滤，类似Where但用于聚合结果，如Having Count(*)>3。"},
    {type:"judge",text:"在Access中，删除查询会将满足条件的记录从表中永久删除。",answer:true,explanation:"删除查询（Delete Query）会从表中永久删除满足条件的记录，操作不可撤销，执行前应谨慎确认。"},
    {type:"single",text:"下列Access查询类型中，不会修改表中原始数据的是：",options:["更新查询","删除查询","追加查询","选择查询"],answer:3,explanation:"选择查询（Select Query）只读取和显示数据，不会修改原始表中的任何数据。其他三种都会改变数据。"},
    {type:"single",text:"在Access中，交叉表查询的行标题和列标题分别最多可以有：",options:["1个行标题，1个列标题","多个行标题，1个列标题","1个行标题，多个列标题","最多3个行标题，1个列标题"],answer:3,explanation:"交叉表查询最多可以有3个行标题字段和1个列标题字段，再加上一个汇总字段。"},
    {type:"fill",text:"在Access操作查询中，_______查询用于删除符合条件的记录。",answer:"删除",explanation:"删除查询（Delete Query）从表中删除满足条件的记录。执行前建议先用选择查询预览要删除的记录。"},
    {type:"single",text:"Access中，在更新查询的'更新到'行中输入'[成绩]*1.1'的作用是：",options:["将成绩显示为原来的1.1倍","将成绩字段值乘以1.1并保存","创建一个新的计算字段","语法错误"],answer:1,explanation:"'更新到'行指定字段的新值。'[成绩]*1.1'表示将成绩字段的当前值乘以1.1后保存。"},
    {type:"single",text:"在Access汇总查询中，若要统计某字段不同值的数量（去重计数），应使用：",options:["Count(*)","Count(字段名)","Count(Distinct 字段名)","以上都不正确"],answer:3,explanation:"注意：Access的Count函数不支持DISTINCT。要实现去重计数，需先创建去重查询，再在外层计数。"},
    {type:"judge",text:"生成表查询执行后，原表中的数据会被移动到新表中。",answer:false,explanation:"生成表查询是复制数据到新表，原表中的数据不会被移动或删除，仍然保留。"},
    {type:"fill",text:"在Access中，运行操作查询前，系统会弹出_______对话框要求确认。",answer:"确认",explanation:"运行操作查询（更新、删除、追加、生成表）前，Access会弹出确认对话框，显示即将影响的记录数，要求用户确认。"},
    {type:"single",text:"Access中，关于交叉表查询说法正确的是：",options:["交叉表查询只能基于一个表","交叉表查询的行标题显示在左侧","交叉表查询不能包含计算","交叉表查询只能用于数字汇总"],answer:1,explanation:"交叉表查询的行标题显示在结果左侧，列标题显示在顶部，交叉点显示汇总值。"},
    {type:"single",text:"在Access中，若要删除表中所有记录但保留表结构，应使用：",options:["删除查询（不加条件）","生成表查询","选择查询","压缩和修复数据库"],answer:0,explanation:"删除查询不加WHERE条件会删除所有记录但保留表结构；生成表是创建新表；压缩修复是维护操作。"}
  ],
// ===== SQL语言章节 =====
// SELECT查询基础（3-0）
  "3-0": [
    {type:"single",text:"下列SQL语句中，用于从表中查询数据的关键字是：",options:["INSERT","UPDATE","SELECT","DELETE"],answer:2,explanation:"SELECT是SQL中最基本的查询命令，用于从一个或多个表中检索数据。"},
    {type:"fill",text:"SQL中，SELECT查询的完整基本格式为：SELECT 字段列表 _______ 表名 WHERE 条件。",answer:"FROM",explanation:"SELECT语句基本格式：SELECT 字段 FROM 表名 WHERE 条件 ORDER BY 字段，FROM指定数据来源表。"},
    {type:"single",text:"在SQL中，'SELECT * FROM 学生表'中的'*'表示：",options:["所有记录","所有字段","表中的第一条记录","只查询主键字段"],answer:1,explanation:"SELECT后的'*'（星号）是通配符，表示查询该表的所有字段（列），等同于列出所有字段名。"},
    {type:"single",
     text:"以下SQL语句的功能是什么？\nSELECT 姓名, 成绩 FROM 学生 WHERE 成绩>=60 ORDER BY 成绩 DESC",
     code:"SELECT 姓名, 成绩\nFROM 学生\nWHERE 成绩 >= 60\nORDER BY 成绩 DESC",
     options:["查询所有学生成绩并升序排列","查询成绩及格学生的姓名和成绩，按成绩降序排列","删除不及格学生的记录","统计及格学生人数"],answer:1,explanation:"WHERE 成绩>=60 筛选及格学生；ORDER BY 成绩 DESC 按成绩降序（从高到低）排列结果。"},
    {type:"single",text:"在SQL的ORDER BY子句中，DESC表示：",options:["升序排列","降序排列","默认排列","随机排列"],answer:1,explanation:"ORDER BY 字段 DESC 表示按该字段降序排列（从大到小/从Z到A），ASC表示升序（默认）。"},
    {type:"judge",text:"SQL语句中，WHERE子句用于对查询结果进行过滤，只返回满足条件的记录。",answer:true,explanation:"WHERE子句在查询时对记录进行过滤，只有满足WHERE条件的记录才会被包含在查询结果中。"},
    {type:"single",text:"SQL中，用于去除查询结果中重复行的关键字是：",options:["UNIQUE","DISTINCT","DIFFERENT","NOT REPEAT"],answer:1,explanation:"SELECT DISTINCT 字段名 FROM 表名，DISTINCT关键字去除结果中的重复行，每个不同的值只显示一次。"},
    {type:"fill",text:"SQL中，查询'学生'表中学生总人数，应使用：SELECT _______ FROM 学生",answer:"COUNT(*)",explanation:"COUNT(*)统计表中所有记录的数量，即总人数。如 SELECT COUNT(*) FROM 学生 返回学生总人数。"},
    {type:"single",text:"在SQL中，连接两个表查询时，常用以下哪个关键字？",options:["CONNECT","JOIN","LINK","COMBINE"],answer:1,explanation:"JOIN（或INNER JOIN）用于连接两个表，通常配合ON子句指定连接条件，如 FROM A JOIN B ON A.id=B.id。"},
    {type:"judge",text:"在Access的SQL视图中，可以直接编写和执行SQL语句。",answer:true,explanation:"在Access查询的SQL视图（View→SQL View）中，可以直接编写SQL语句，也可以查看查询设计视图生成的SQL代码。"},
    {type:"single",text:"SQL中，WHERE子句和HAVING子句的主要区别是：",options:["WHERE用于分组前，HAVING用于分组后","WHERE用于分组后，HAVING用于分组前","两者完全相同","WHERE只能用于数字条件"],answer:0,explanation:"WHERE在GROUP BY分组前过滤原始数据；HAVING在分组后过滤聚合结果。HAVING可使用聚合函数。"},
    {type:"fill",text:"SQL中，按字段升序排列的关键字是_______（可省略）。",answer:"ASC",explanation:"ORDER BY 字段 ASC 表示升序（默认，可省略）；DESC表示降序。如 ORDER BY 姓名 ASC。"},
    {type:"single",text:"以下SQL语句正确的是：",options:["SELECT 姓名, 成绩 FROM 学生 WHERE 成绩>AVG(成绩)","SELECT 姓名, 成绩 FROM 学生 HAVING 成绩>60","SELECT 姓名, 成绩 FROM 学生 WHERE 成绩>60","SELECT * FROM 学生 ORDER BY 姓名 WHERE 成绩>60"],answer:2,explanation:"WHERE子句应在ORDER BY之前。HAVING只能用于GROUP BY之后。聚合函数不能直接用于WHERE。"},
    {type:"single",text:"SQL中，LIKE运算符用于：",options:["精确匹配","模糊匹配（模式匹配）","范围匹配","列表匹配"],answer:1,explanation:"LIKE用于模糊匹配，配合通配符%或_使用。如 WHERE 姓名 LIKE '张%' 查找所有姓张的人。"},
    {type:"judge",text:"在SQL中，SELECT语句查询结果中的字段顺序由SELECT后的字段列表顺序决定。",answer:true,explanation:"SELECT后字段列表的顺序决定了查询结果中列的显示顺序。如 SELECT 姓名,学号 与 SELECT 学号,姓名 结果列顺序不同。"},
    {type:"fill",text:"SQL中，用于给字段设置别名的关键字是_______。",answer:"AS",explanation:"AS关键字用于设置字段或表的别名，如 SELECT 姓名 AS name, 成绩 AS score FROM 学生。"},
    {type:"single",text:"在SQL中，同时设置多个查询条件时，AND运算符表示：",options:["任意一个条件满足即可","所有条件都必须满足","第一个条件必须满足","以上都不对"],answer:1,explanation:"AND表示'与'关系：所有条件都必须同时满足。OR表示'或'关系：任意一个条件满足即可。"},
    {type:"single",text:"SQL中，以下哪个通配符表示任意单个字符？",options:["%","_","[","#"],answer:1,explanation:"在标准SQL中，_（下划线）表示任意单个字符；%表示任意多个字符。在Access中对应?和*。"}
  ],
// 聚合函数与分组（3-1）
  "3-1": [
    {type:"single",text:"SQL中，'GROUP BY'的作用是：",options:["对结果排序","按指定字段分组统计","过滤记录","连接多个表"],answer:1,explanation:"GROUP BY子句将结果集按指定字段的值分组，配合聚合函数（SUM、COUNT等）对每组进行统计。"},
    {type:"fill",text:"SQL中，计算'成绩'字段平均值的聚合函数写法为：_______ (成绩)",answer:"AVG",explanation:"AVG()函数计算数值字段的平均值，如 SELECT AVG(成绩) FROM 学生 计算所有学生的平均成绩。"},
    {type:"single",
     text:"下面SQL语句的作用是什么？",
     code:"SELECT 班级, COUNT(*) AS 人数, AVG(成绩) AS 平均分\nFROM 学生\nGROUP BY 班级",
     options:["查询所有学生的班级、人数和成绩","按班级统计各班的人数和平均成绩","查询班级人数最多的记录","删除重复的班级记录"],answer:1,explanation:"GROUP BY 班级 按班级分组，COUNT(*)统计每班人数，AVG(成绩)计算每班平均成绩。"},
    {type:"single",text:"SQL中，HAVING子句与WHERE子句的区别是：",options:["HAVING用于分组后过滤，WHERE用于分组前过滤","两者完全相同可互换","HAVING只能用数字条件","WHERE只用于字符串字段"],answer:0,explanation:"WHERE在分组前过滤原始数据，HAVING在GROUP BY分组后过滤聚合结果。HAVING可使用聚合函数。"},
    {type:"judge",text:"SQL中，COUNT(字段名)会统计包含NULL值的记录数。",answer:false,explanation:"COUNT(字段名)只统计该字段不为NULL的记录数；COUNT(*)才统计所有记录数（包括含NULL的行）。"},
    {type:"single",text:"查询各科成绩最高分，SQL语句是：",options:["SELECT 科目, MAX(成绩) FROM 成绩表","SELECT 科目, MAX(成绩) FROM 成绩表 GROUP BY 科目","SELECT MAX(成绩) FROM 成绩表 GROUP BY 科目","SELECT 科目, SUM(成绩) FROM 成绩表 GROUP BY 科目"],answer:1,explanation:"需要GROUP BY 科目分组，再用MAX(成绩)求每科的最高分，结果显示科目名和对应最高分。"},
    {type:"fill",text:"SQL中，统计表中某字段的最小值使用_______函数。",answer:"MIN",explanation:"MIN()返回字段的最小值，MAX()返回最大值，SUM()求和，AVG()求平均，COUNT()计数。"},
    {type:"single",text:"以下SQL中，HAVING COUNT(*)>2的含义是：",options:["查询记录数大于2的字段","筛选分组后记录数超过2的组","查询第2条记录之后的数据","限制查询结果只显示2条"],answer:1,explanation:"HAVING COUNT(*)>2：在GROUP BY分组后，只保留该组记录数超过2条的分组。"},
    {type:"judge",text:"SQL中，GROUP BY语句后可以跟多个字段，表示按这些字段的组合进行分组。",answer:true,explanation:"GROUP BY可以跟多个字段，如 GROUP BY 班级, 性别，表示按班级和性别的组合进行分组统计。"},
    {type:"single",text:"下列SQL聚合函数中，可以用于非数值字段（如文本字段）的是：",options:["SUM","AVG","COUNT","MAX和MIN"],answer:3,explanation:"SUM和AVG只适用于数值字段；COUNT可用于任意字段；MAX和MIN也可用于文本、日期字段（按字母或日期顺序）。"},
    {type:"single",text:"SQL中，若要在分组统计中同时显示分组的字段值和聚合结果，SELECT子句应：",options:["只包含聚合函数","包含分组字段和聚合函数","只包含分组字段","以上都不对"],answer:1,explanation:"使用GROUP BY时，SELECT子句中只能包含：分组字段、聚合函数、常量。否则结果不确定。"},
    {type:"fill",text:"SQL中，用于计算某字段值合计的聚合函数是_______。",answer:"SUM",explanation:"SUM()函数对数值字段求和，如 SELECT SUM(成绩) FROM 学生 计算所有学生成绩总和。"},
    {type:"single",text:"在SQL中，关于GROUP BY的说法错误的是：",options:["GROUP BY可以与WHERE一起使用","GROUP BY可以与HAVING一起使用","GROUP BY必须在WHERE之后、HAVING之前","GROUP BY可以省略，直接使用聚合函数"],answer:3,explanation:"如果不使用GROUP BY，聚合函数作用于整张表（一个分组）。但SELECT中有聚合函数时，其他非聚合字段必须在GROUP BY中。"},
    {type:"single",text:"以下SQL语句的功能是：\nSELECT 班级, COUNT(*) FROM 学生 GROUP BY 班级 HAVING COUNT(*)>5",options:["统计每个班级的人数","统计人数超过5人的班级及其人数","统计人数少于5人的班级","删除人数少于5人的班级"],answer:1,explanation:"先按班级分组统计人数，HAVING筛选分组后人数>5的班级，显示班级名和对应人数。"},
    {type:"judge",text:"在SQL中，WHERE子句不能包含聚合函数，但HAVING子句可以。",answer:true,explanation:"WHERE不能使用聚合函数（因为分组前还没有聚合结果）；HAVING可以包含聚合函数，因为它在分组后执行。"},
    {type:"fill",text:"SQL中，分组统计时若要筛选聚合结果，应使用_______子句。",answer:"HAVING",explanation:"HAVING子句专门用于筛选GROUP BY分组后的聚合结果，类似WHERE但用于分组后。"},
    {type:"single",text:"在SQL中，以下哪个聚合函数会忽略NULL值？",options:["COUNT(*)","COUNT(字段名)","都不忽略","都忽略"],answer:1,explanation:"COUNT(字段名)忽略NULL值（只统计非NULL）；COUNT(*)不忽略（统计所有行，包括NULL）。其他聚合函数都忽略NULL。"},
    {type:"single",text:"SQL中，要查询平均成绩最高的班级，正确的语句是：",options:["SELECT 班级, AVG(成绩) FROM 学生 GROUP BY 班级","SELECT TOP 1 班级, AVG(成绩) FROM 学生 GROUP BY 班级 ORDER BY AVG(成绩) DESC","SELECT 班级, MAX(AVG(成绩)) FROM 学生","以上都不对"],answer:1,explanation:"先分组计算每班平均分，再按平均分降序排列，取第一条（TOP 1）即为平均分最高的班级。"}
  ],
// 数据操作与SQL代码排序（3-2）- 包含新题型！
  "3-2": [
    {type:"single",text:"SQL中，向表中插入一条新记录使用的命令是：",options:["INSERT INTO","UPDATE","ADD RECORD","APPEND"],answer:0,explanation:"INSERT INTO 表名 (字段1,字段2) VALUES (值1,值2) 是SQL中插入新记录的标准语法。"},
    {type:"fill",text:"SQL中，修改表中数据的命令关键字是_______。",answer:"UPDATE",explanation:"UPDATE 表名 SET 字段=新值 WHERE 条件，用于修改满足条件的记录中指定字段的值。"},
    {type:"single",
     text:"下面SQL语句的执行结果是什么？",
     code:"UPDATE 学生 SET 成绩 = 成绩 + 5\nWHERE 班级 = '高一1班'",
     options:["将所有学生成绩加5","将高一1班所有学生的成绩加5分","删除高一1班成绩等于5的记录","查询高一1班的学生成绩"],answer:1,explanation:"UPDATE...SET...WHERE：将'高一1班'所有学生的成绩字段值在原值基础上增加5分。"},
    {type:"single",text:"SQL中，DELETE语句若不加WHERE条件，将会：",options:["不执行任何操作","只删除第一条记录","删除表中所有记录","删除整个表"],answer:2,explanation:"DELETE FROM 表名 不加WHERE条件会删除表中所有记录！但表结构保留。执行前务必确认条件正确。"},
    {type:"judge",text:"SQL中，INSERT语句插入数据时，VALUES中值的顺序必须与字段名列表的顺序一一对应。",answer:true,explanation:"INSERT INTO 表(字段1,字段2) VALUES(值1,值2)：VALUES中的值必须按字段列表的顺序依次对应。"},
    {type:"single",text:"以下SQL语句正确的是：",options:["DELETE FROM 学生 WHERE 学号=1001","DELETE 学生 WHERE 学号=1001","REMOVE FROM 学生 WHERE 学号=1001","DELETE * FROM 学生 WHERE 学号=1001"],answer:0,explanation:"DELETE FROM的标准语法是：DELETE FROM 表名 WHERE 条件，不需要加字段名或*号。"},
    {type:"fill",text:"SQL中，'INSERT INTO 学生(姓名,年龄) VALUES(_______,_______)' 插入一条姓名为'李明'、年龄18的记录，括号内应填：",answer:"'李明',18",explanation:"字符串值用单引号括起来，数字值直接写。所以VALUES('李明',18)，注意姓名是文本需加引号。"},
    {type:"single",text:"SQL中，CREATE TABLE语句的作用是：",options:["创建查询","创建新的数据表","创建数据库","创建视图"],answer:1,explanation:"CREATE TABLE 表名(字段1 类型,字段2 类型...) 用于创建新的数据库表结构（DDL数据定义语言）。"},
    {type:"single",text:"下列SQL语句中，能查询学生表中年龄在18到20岁之间（含）的学生的是：",options:["SELECT * FROM 学生 WHERE 年龄=18 TO 20","SELECT * FROM 学生 WHERE 年龄 BETWEEN 18 AND 20","SELECT * FROM 学生 WHERE 年龄 IN (18,20)","SELECT * FROM 学生 WHERE 年龄>=18 OR 年龄<=20"],answer:1,explanation:"BETWEEN 18 AND 20等价于>=18 AND <=20，包含边界值。注意最后一项是OR（错的），应该是AND。"},
    {type:"judge",text:"在Access中，可以在查询的SQL视图中执行DDL语句（如CREATE TABLE）。",answer:false,explanation:"Access的查询SQL视图主要支持DML（SELECT/INSERT/UPDATE/DELETE），不支持DDL（CREATE TABLE等），DDL需要通过界面操作。"},
// ===== 新增题型：SQL代码排序 =====
    {type:"sort",text:"请将以下SQL语句片段按正确顺序排列，形成一条完整的查询语句（查询所有计算机科学专业学生的姓名和成绩，按成绩降序排列）：",fragments:["SELECT 姓名, 成绩","FROM 学生","WHERE 专业='计算机科学'","ORDER BY 成绩 DESC"],answer:[0,1,2,3],explanation:"完整SQL顺序：SELECT（选择字段）→ FROM（指定表）→ WHERE（过滤条件）→ ORDER BY（排序）。"},
    {type:"sort",text:"请将以下SQL语句片段按正确顺序排列，形成一条完整的插入语句（向'学生'表插入一条新记录，姓名为'张三'，年龄为20）：",fragments:["INSERT INTO 学生","(姓名, 年龄)","VALUES","('张三', 20)"],answer:[0,1,2,3],explanation:"INSERT语句顺序：INSERT INTO 表名 → (字段列表) → VALUES → (值列表)。"},
    {type:"sort",text:"请将以下SQL语句片段按正确顺序排列，形成一条完整的更新语句（将'学生'表中所有计算机专业学生的成绩加5分）：",fragments:["UPDATE 学生","SET 成绩 = 成绩 + 5","WHERE 专业='计算机'"],answer:[0,1,2],explanation:"UPDATE语句顺序：UPDATE 表名 → SET 字段=新值 → WHERE 条件。"},
    {type:"sort",text:"请将以下SQL语句片段按正确顺序排列，形成一条完整的删除语句（删除'学生'表中年龄小于18的记录）：",fragments:["DELETE FROM 学生","WHERE 年龄 < 18"],answer:[0,1],explanation:"DELETE语句顺序：DELETE FROM 表名 → WHERE 条件。注意：DELETE不需要指定字段，因为它删除整条记录。"},
    {type:"sort",text:"请将以下SQL语句片段按正确顺序排列，形成一条带分组统计的查询（查询各专业学生人数，只显示人数超过5人的专业）：",fragments:["SELECT 专业, COUNT(*) AS 人数","FROM 学生","GROUP BY 专业","HAVING COUNT(*) > 5"],answer:[0,1,2,3],explanation:"带分组的SQL顺序：SELECT（含聚合函数）→ FROM → GROUP BY → HAVING（筛选分组结果）。注意：WHERE在GROUP BY之前，HAVING在之后。"},
    {type:"sort",text:"请将以下SQL语句片段按正确顺序排列，查询'订单'表中金额最高的前3条记录（显示订单号和金额）：",fragments:["SELECT TOP 3","订单号, 金额","FROM 订单","ORDER BY 金额 DESC"],answer:[0,1,2,3],explanation:"TOP子句在SELECT后指定：SELECT TOP N 字段 → FROM → ORDER BY（必须配合排序使用TOP）。"},
    {type:"sort",text:"请将以下SQL语句片段按正确顺序排列，形成一条完整的创建表语句（创建'课程'表，包含课程号（文本）和课程名（文本）两个字段）：",fragments:["CREATE TABLE 课程","(课程号 TEXT(10),","课程名 TEXT(50))"],answer:[0,1,2],explanation:"CREATE TABLE语句顺序：CREATE TABLE 表名 → (字段1 类型, 字段2 类型...)。"},
    {type:"sort",text:"请将以下SQL连接查询的片段按正确顺序排列，查询学生姓名和对应的专业名称（学生表含专业编号，专业表含专业编号和专业名称）：",fragments:["SELECT 学生.姓名, 专业.专业名称","FROM 学生","INNER JOIN 专业","ON 学生.专业编号 = 专业.专业编号"],answer:[0,1,2,3],explanation:"连接查询顺序：SELECT → FROM 主表 → INNER JOIN 从表 → ON 连接条件。"},
    {type:"sort",text:"请将以下SQL语句片段按正确顺序排列，查询'学生'表中不姓'张'且成绩大于等于80分的学生姓名（使用NOT LIKE和AND）：",fragments:["SELECT 姓名","FROM 学生","WHERE 姓名 NOT LIKE '张*'","AND 成绩 >= 80"],answer:[0,1,2,3],explanation:"WHERE条件可以包含多个：WHERE 条件1 AND 条件2。NOT LIKE用于排除匹配项。"},
    {type:"sort",text:"请将以下Access SQL中的日期条件片段按正确顺序排列，查询'学生'表中出生日期在2000年以后的学生（Access中日期用#号括起）：",fragments:["SELECT 姓名, 出生日期","FROM 学生","WHERE 出生日期 >= #2000-1-1#"],answer:[0,1,2],explanation:"Access SQL中日期值用#号括起来：WHERE 出生日期 >= #2000-1-1#。"}
  ],
// ===== 窗体设计章节 =====
// 窗体基础（4-0）
  "4-0": [
    {type:"single",text:"在Access中，窗体的主要功能是：",options:["存储数据","提供用户友好的数据交互界面","直接打印报告","执行SQL语句"],answer:1,explanation:"窗体是Access与用户交互的界面对象，提供友好的数据浏览、输入和修改界面，而不直接存储数据。"},
    {type:"single",text:"Access窗体共分几个节（Section）？",options:["2个：窗体页眉和主体","3个：窗体页眉、主体、窗体页脚","5个：窗体页眉、页面页眉、主体、页面页脚、窗体页脚","4个：窗体页眉、页面页眉、主体、窗体页脚"],answer:2,explanation:"窗体完整的5个节：窗体页眉、页面页眉、主体、页面页脚、窗体页脚。默认显示3个，可添加页面页眉/脚。"},
    {type:"judge",text:"在Access中，使用窗体向导创建的窗体，之后仍可在设计视图中修改。",answer:true,explanation:"无论是通过向导还是自动创建的窗体，都可以在设计视图中进一步修改和自定义。"},
    {type:"single",text:"在Access窗体中，'绑定型'控件的含义是：",options:["控件固定在窗体上不能移动","控件与数据表字段相连，显示和修改实际数据","控件只能显示文本","控件不能被用户操作"],answer:1,explanation:"绑定型控件与数据表或查询的字段绑定，直接显示和修改数据库中的数据。非绑定控件不与字段关联。"},
    {type:"fill",text:"Access窗体中，通常用于浏览每条记录的导航按钮位于窗体的_______部分。",answer:"底部",explanation:"Access窗体底部的记录导航器（|< < > >|）用于在记录之间导航，还显示当前记录号和总记录数。"},
    {type:"single",text:"在Access窗体设计中，要查看窗体的实际运行效果，应切换到：",options:["设计视图","布局视图","窗体视图","数据表视图"],answer:2,explanation:"窗体视图（Form View）是窗体的运行状态，显示实际数据，可以进行数据的浏览和输入操作。"},
    {type:"single",text:"Access提供了哪种窗体可以同时以表格形式显示多条记录？",options:["单个窗体","数据表窗体","分割窗体","主/子窗体"],answer:1,explanation:"数据表窗体以类似表格的格式同时显示多条记录；单个窗体每次只显示一条记录。"},
    {type:"judge",text:"在Access中，子窗体（Subform）可以嵌入到主窗体中，用于显示相关表的多条记录。",answer:true,explanation:"主/子窗体结构：主窗体显示主表的一条记录，子窗体以表格形式显示从表中与之相关联的多条记录。"},
    {type:"single",text:"在Access窗体中，'标签'控件（Label）主要用于：",options:["输入数据","显示静态说明文字","执行命令","显示图片"],answer:1,explanation:"标签控件（Label）用于显示固定的说明性文字，不与数据绑定，不能用于输入数据。"},
    {type:"single",text:"Access窗体的'数据来源'属性指定的是：",options:["窗体的数据类型","窗体数据的来源表或查询","窗体文件的保存路径","窗体使用的字体"],answer:1,explanation:"窗体的'记录源'（数据来源）属性指定窗体所基于的表或查询，是窗体显示数据的根本来源。"},
    {type:"single",text:"在Access中，'分割窗体'的特点是：",options:["只显示一条记录","同时显示单个窗体（上方）和数据表（下方）两种视图","只能用于输入数据","不能绑定数据源"],answer:1,explanation:"分割窗体（Split Form）同时显示两种视图：上方是单个窗体视图（逐条显示），下方是数据表视图（所有记录）。"},
    {type:"fill",text:"在Access窗体设计中，用于设置窗体背景颜色的属性是_______。",answer:"背景色",explanation:"窗体的'背景色'（Back Color）属性设置窗体或控件的背景颜色。也可用'背景样式'设为透明。"},
    {type:"single",text:"Access中，关于'模态'窗体（Modal）的说法正确的是：",options:["可以与其他窗口同时操作","必须关闭才能操作其他窗口","只能显示数据不能输入","以上都不对"],answer:1,explanation:"模态窗体（Modal=是）弹出后，必须关闭它才能操作其他Access窗口，常用于重要提示或数据输入。"},
    {type:"single",text:"在Access窗体中，'自动套用格式'功能用于：",options:["自动输入数据","快速应用预定义的窗体样式","自动创建窗体","自动删除控件"],answer:1,explanation:"自动套用格式（AutoFormat）可以快速将预定义的颜色、字体、边框等样式应用到窗体上。"},
    {type:"judge",text:"在Access中，窗体的'允许添加'属性设为'否'时，用户无法通过该窗体添加新记录。",answer:true,explanation:"'允许添加'（Allow Additions）属性控制是否允许通过窗体添加新记录，设为'否'则禁止添加。"},
    {type:"fill",text:"Access窗体中，用于切换不同记录的按钮通常放在窗体的_______节中。",answer:"主体",explanation:"记录导航按钮通常放在窗体页脚或主体节底部，但Access自动生成的导航按钮在窗体底部（窗体页脚）。"},
    {type:"single",text:"在Access中，要创建基于多个表的窗体，应使用：",options:["只能基于一个表","窗体向导并选择多个表/查询","数据表窗体","无法实现"],answer:1,explanation:"使用窗体向导时，可以选择多个表或查询的字段，向导会自动创建主/子窗体结构。"},
    {type:"single",text:"Access窗体的'记录选择器'属性用于控制：",options:["是否显示记录选择器（行选择器）","是否允许选择多条记录","记录显示的顺序","记录过滤条件"],answer:0,explanation:"'记录选择器'（Record Selectors）属性控制是否在窗体左侧显示记录选择器（可选中整条记录的灰色竖条）。"}
  ],
// 常用控件（4-1）
  "4-1": [
    {type:"single",text:"在Access窗体中，用于输入和显示文本数据的最基本控件是：",options:["标签","文本框","组合框","列表框"],answer:1,explanation:"文本框（Text Box）是最常用的输入控件，可以绑定数据字段，用于输入和显示文本、数字、日期等数据。"},
    {type:"single",text:"在Access中，组合框（ComboBox）与列表框（ListBox）的主要区别是：",options:["组合框不能绑定数据源","组合框折叠时只显示当前值，可手动输入；列表框始终展开显示","列表框可以多选，组合框不可以","组合框只能显示数字"],answer:1,explanation:"组合框折叠时只显示一项（可手动输入新值）；列表框始终展开显示所有选项。两者都可绑定数据源。"},
    {type:"judge",text:"Access窗体中的命令按钮（Command Button）可以通过绑定宏或事件过程来执行特定操作。",answer:true,explanation:"命令按钮可以在'单击'等事件中绑定宏或VBA代码，实现查找、打开报表、关闭窗体等各种操作。"},
    {type:"fill",text:"在Access窗体设计中，单击控件后出现的可以调整控件大小的8个黑色小方块称为_______。",answer:"控件句柄",explanation:"选中控件后出现的8个黑色小方块是调整大小的控件句柄，拖动可调整大小；左上角橙色方块用于移动。"},
    {type:"single",text:"在Access窗体中，'选项按钮'（Option Button）通常与什么控件配合使用，实现单选功能？",options:["标签","文本框","选项组","组合框"],answer:2,explanation:"选项按钮（单选按钮）通常放在选项组（Option Group）控件中，实现在多个选项中只能选一个的功能。"},
    {type:"single",text:"在Access窗体中，要在字段值变化时自动执行操作，应在哪个事件上绑定代码？",options:["OnLoad","OnChange/AfterUpdate","OnClose","OnOpen"],answer:1,explanation:"AfterUpdate（更新后）或OnChange（更改时）事件在字段值发生变化时触发，可以在此执行验证或其他操作。"},
    {type:"single",text:"在Access窗体中，'图像'控件（Image）用于：",options:["显示数据表中的OLE图片字段","显示静态背景图片","拍摄照片","绘制图形"],answer:0,explanation:"图像控件可以绑定表中的OLE字段，显示存储在数据库中的图片数据，如员工照片、产品图片等。"},
    {type:"judge",text:"在Access中，窗体控件的'Tab键次序'决定用户按Tab键时焦点在控件间跳转的顺序。",answer:true,explanation:"Tab键次序（Tab Order）设置用户按Tab键时，焦点（光标）在各控件之间移动的顺序，提高操作效率。"},
    {type:"single",text:"Access窗体的'格式'属性中，'弹出方式'设为'是'时，窗体会：",options:["以全屏方式打开","以浮动弹出窗口方式打开，始终显示在其他窗口之上","自动关闭","显示在任务栏上"],answer:1,explanation:"弹出方式（Popup）=是时，窗体以弹出方式显示，始终浮于其他Access对象窗口之上。"},
    {type:"single",text:"在Access窗体中，要显示当前日期时间，在文本框的控件来源中应输入：",options:["=Date()","=Now()","=Today()","=Current()"],answer:1,explanation:"Now()函数返回当前日期和时间，Date()只返回日期，Time()只返回时间。在控件来源中用=Now()表达式显示。"},
    {type:"single",text:"在Access窗体中，'复选框'（CheckBox）控件通常用于：",options:["输入长文本","表示是/否型字段的两种状态","选择一条记录","执行命令"],answer:1,explanation:"复选框（CheckBox）常用于绑定是/否型字段，勾选表示True（是），未勾选表示False（否）。"},
    {type:"fill",text:"在Access窗体设计中，用于设置控件在窗体上显示位置的属性是_______和________。（提示：左上角坐标）",answer:"左边距 上边距",explanation:"'左边距'（Left）和'上边距'（Top）属性决定控件在窗体上的位置；'宽度'和'高度'决定控件大小。"},
    {type:"single",text:"Access中，关于'切换按钮'（Toggle Button）的说法正确的是：",options:["只能显示文字","可以在按下和弹起两种状态间切换，类似复选框","只能用于执行宏","以上都不对"],answer:1,explanation:"切换按钮可以在按下（凹陷）和弹起（正常）两种状态间切换，常用于工具栏或选项组，功能类似复选框。"},
    {type:"single",text:"在Access窗体中，'矩形'和'线条'控件主要用于：",options:["输入数据","将相关控件分组或美化界面","执行计算","连接字段"],answer:1,explanation:"矩形和线条控件用于界面美化，可以将相关控件用矩形框起来分组，或添加分隔线。"},
    {type:"judge",text:"在Access中，窗体控件的'可见'属性设为'否'时，运行时该控件不显示，但仍在窗体上存在。",answer:true,explanation:"'可见'（Visible）属性控制控件是否显示。设为'否'则运行时隐藏，但控件仍在窗体中，可通过VBA代码控制显示。"},
    {type:"fill",text:"在Access窗体中，用于显示OLE对象（如Word文档、Excel表格）的嵌入内容的控件是_______。",answer:"对象框",explanation:"对象框（Bound Object Frame）用于显示和编辑绑定到OLE对象字段的数据，如嵌入的Word或Excel对象。"},
    {type:"single",text:"Access窗体中，'选项卡'控件（Tab Control）的作用是：",options:["显示多个页面，每个页面可放置不同控件","只能显示一个页面","用于输入数据","用于打印窗体"],answer:0,explanation:"选项卡控件可以在一个窗体中显示多个标签页（页面），每个页面可以放置不同的控件，节省空间。"},
    {type:"single",text:"在Access中，要在窗体上显示计算结果的文本框，其'控件来源'属性应设置为：",options:["字段名","=表达式","固定文字","以上都不对"],answer:1,explanation:"要在文本框中显示计算结果，需在'控件来源'中输入以等号（=）开头的表达式，如 =[成绩1]+[成绩2]。"}
  ],
// ===== 报表与宏章节 =====
// 报表设计（5-0）
  "5-0": [
    {type:"single",text:"在Access中，报表的主要功能是：",options:["存储数据","实时修改数据","格式化并打印输出数据","提供数据输入界面"],answer:2,explanation:"报表专用于数据的格式化和打印输出，可以对数据进行分组、统计和美化，但不能修改数据。"},
    {type:"single",text:"Access报表中，用于每个分组开始时显示分组信息的节是：",options:["报表页眉","组页眉","主体","页面页眉"],answer:1,explanation:"组页眉（Group Header）在每个分组的开始处显示，通常放置分组字段和分组标题。组页脚显示分组汇总。"},
    {type:"judge",text:"在Access报表中，'报表页眉'节的内容只在报表的第一页开头出现一次。",answer:true,explanation:"报表页眉只在报表最开始出现一次（封面信息）；页面页眉则在每页顶部都出现（列标题等）。"},
    {type:"single",text:"在Access报表中，要显示当前页码，应在文本框的控件来源中输入：",options:['="第"&[Page]&"页"','=Page()','="第"&Page&"页"','=页码'],answer:0,explanation:'[Page]是报表的内置页码属性，[Pages]是总页数。"第"&[Page]&"页"可显示"第1页"的效果。'},
    {type:"fill",text:"在Access报表中，每条记录的详细数据在_______节中显示。",answer:"主体",explanation:"主体节（Detail Section）显示数据源中每条记录的详细信息，每条记录对应一次主体节的输出。"},
    {type:"single",text:"在Access中，使用'报表向导'创建分组报表时，可以：",options:["最多设置4个分组级别","只能设置1个分组级别","最多设置10个分组级别","不限制分组级别数量"],answer:0,explanation:"Access报表向导最多支持4个分组级别，如按年份→月份→部门→类别进行多级分组统计。"},
    {type:"single",text:"在Access报表中，要在每页底部显示页码和日期，应将这些控件放在：",options:["报表页眉","页面页眉","主体","页面页脚"],answer:3,explanation:"页面页脚（Page Footer）在每页底部显示，适合放置页码、打印日期等每页都需要的信息。"},
    {type:"judge",text:"Access报表中的'强制分页'属性可以设置在组之前或之后换页。",answer:true,explanation:"在组页眉/脚的强制分页（Force New Page）属性中，可以设置在该组之前（Before）或之后（After）换页。"},
    {type:"single",text:"Access报表中，标签（Label）控件与文本框（Text Box）控件的主要区别是：",options:["标签不能设置字体","文本框只能显示数字","标签显示固定文字，文本框显示动态数据","标签比文本框更大"],answer:2,explanation:"标签显示设计时固定的说明性文字（如列标题）；文本框绑定字段，动态显示数据库中的实际数据。"},
    {type:"single",text:"在Access中，以下哪种方式不能创建报表？",options:["报表向导","自动报表","空白报表（手动设计）","使用表直接生成"],answer:3,explanation:"创建报表的方式：报表向导、空报表（手动设计）、报表设计视图、自动报表（基于表/查询）。没有'表直接生成'的一键方式。"},
    {type:"single",text:"Access报表的'记录源'属性类似于窗体的'记录源'，用于指定：",options:["报表的打印设置","报表数据的来源表或查询","报表的页边距","报表的标题"],answer:1,explanation:"报表的'记录源'（Record Source）属性指定报表所基于的表或查询，是报表显示数据的来源。"},
    {type:"fill",text:"在Access报表中，用于显示总页数的内置属性是_______。",answer:"[Pages]",explanation:"[Page]显示当前页码，[Pages]显示总页数。如：'第'&[Page]&'页/共'&[Pages]&'页'。"},
    {type:"single",text:"在Access报表中，'组页脚'节通常用于：",options:["显示分组标题","显示该分组的汇总信息（如合计、平均值）","显示每条记录","显示报表标题"],answer:1,explanation:"组页脚（Group Footer）在每个分组结束处显示，通常放置该分组的汇总计算结果（如Count、Sum等）。"},
    {type:"single",text:"Access中，要将报表发送到打印机，应使用：",options:["只能预览不能打印","文件菜单中的打印命令","工具栏中的打印按钮","B和C都可以"],answer:3,explanation:"Access报表可以通过'文件→打印'菜单或工具栏打印按钮来打印，也可以先预览再打印。"},
    {type:"judge",text:"在Access中，报表设计视图中可以直接修改报表所基于的表结构。",answer:false,explanation:"报表设计视图只能修改报表的布局和格式，不能直接修改表结构。修改表结构需要在表的设计视图中进行。"},
    {type:"fill",text:"在Access报表中，若要在报表末尾显示总计信息，应将相应控件放在_______节中。",answer:"报表页脚",explanation:"报表页脚（Report Footer）在报表末尾显示，适合放置整个报表的总计、总结信息等。"},
    {type:"single",text:"Access报表中，'页面页眉'与'报表页眉'的区别是：",options:["没有区别","页面页眉每页重复，报表页眉只在第一页出现","报表页眉每页重复，页面页眉只在第一页出现","两者都只在最后一页出现"],answer:1,explanation:"报表页眉只在报表开头出现一次；页面页眉在每页顶部都出现（如列标题行）。"},
    {type:"single",text:"在Access中，要创建标签（名片、条形码等）报表，应使用：",options:["普通报表向导","标签向导","空白报表","数据表报表"],answer:1,explanation:"标签向导（Label Wizard）专门用于创建标签式报表，如名片、邮寄标签、条形码标签等。"}
  ],
// 宏与综合应用（5-1）
  "5-1": [
    {type:"single",text:"在Access中，宏（Macro）是：",options:["一段VBA程序代码","一系列操作命令的集合","一种查询类型","数据库的备份文件"],answer:1,explanation:"宏是一系列Access操作命令的有序集合，可以自动执行重复性任务，无需编写VBA代码。"},
    {type:"single",text:"在Access宏中，'OpenForm'操作的作用是：",options:["创建新窗体","打开已有的窗体","关闭当前窗体","修改窗体属性"],answer:1,explanation:"OpenForm操作打开指定的窗体，可以设置视图模式（窗体视图/设计视图）和过滤条件等参数。"},
    {type:"judge",text:"在Access中，一个宏可以包含多个操作命令，这些命令按顺序依次执行。",answer:true,explanation:"宏中的多个操作按从上到下的顺序依次执行，也可以使用条件（If）控制某些操作是否执行。"},
    {type:"fill",text:"在Access宏中，用于关闭当前对象（如窗体或报表）的宏操作是_______。",answer:"CloseWindow",explanation:"CloseWindow操作关闭指定的Access对象窗口，如窗体、报表等。Close操作在旧版Access中也可用。"},
    {type:"single",text:"在Access中，'AutoExec'宏的特殊之处是：",options:["只能执行一次","打开数据库时自动运行","只用于报表","不能包含条件"],answer:1,explanation:"名为'AutoExec'的宏是特殊的启动宏，在数据库打开时会自动执行，常用于显示欢迎窗体等初始化操作。"},
    {type:"single",text:"Access中，以下关于数据导出的说法正确的是：",options:["Access数据只能导出为Excel格式","Access数据可以导出为多种格式，包括Excel、CSV、文本文件等","导出数据会删除原数据","只能通过宏才能导出数据"],answer:1,explanation:"Access支持将数据导出为多种格式：Excel(.xlsx/.xls)、文本(.txt)、CSV、XML、PDF等，通过'外部数据'选项卡操作。"},
    {type:"judge",text:"在Access中，可以将Excel电子表格中的数据导入到Access数据库中。",answer:true,explanation:"Access提供了从Excel、文本文件、其他数据库等多种来源导入数据的功能，通过'外部数据'选项卡操作。"},
    {type:"single",text:"在Access中，'MsgBox'宏操作（或MessageBox）的作用是：",options:["向表中插入消息","显示一个对话框消息","发送电子邮件","在报表上添加文字"],answer:1,explanation:"MsgBox/MessageBox操作会弹出一个显示指定消息文本的对话框，常用于向用户提示操作结果或警告信息。"},
    {type:"single",text:"Access宏中，'SetValue'操作的作用是：",options:["设置字段的默认值","给窗体或报表上的控件赋值","创建新的值列表","以上都不对"],answer:1,explanation:"SetValue操作用于在宏中给窗体或报表上的控件（如文本框）赋值，实现动态更新。"},
    {type:"fill",text:"在Access中，用于将数据从Access导出到Excel文件的宏操作是_______。",answer:"OutputTo",explanation:"OutputTo操作可以将Access对象（表、查询、窗体、报表）的输出导出到文件（如Excel、PDF等）。"},
    {type:"single",text:"Access中，关于宏和VBA的说法正确的是：",options:["宏比VBA功能更强大","VBA可以实现比宏更复杂的逻辑","宏可以替代所有VBA功能","宏和VBA没有任何关系"],answer:1,explanation:"VBA（Visual Basic for Applications）是完整的编程语言，可以实现比宏更复杂的逻辑、错误处理和算法。"},
    {type:"single",text:"在Access宏中，若要设置条件执行（只有条件满足时才执行某操作），应使用：",options:["无法实现","在'条件'列中输入条件表达式","使用SetValue操作","使用MsgBox操作"],answer:1,explanation:"宏设计视图中有一个'条件'列，可以在其中输入条件表达式，只有条件为True时才执行该操作。"},
    {type:"judge",text:"在Access中，可以将宏转换为等效的VBA代码。",answer:true,explanation:"Access提供了将宏转换为VBA代码的功能，在宏设计视图中通过'将宏转换为Visual Basic代码'命令实现。"},
    {type:"fill",text:"在Access中，用于打开报表的宏操作是_______。",answer:"OpenReport",explanation:"OpenReport操作用于打开指定的报表，可以设置视图模式（报表视图/打印预览）和过滤条件。"},
    {type:"single",text:"Access中，'RunSQL'宏操作的作用是：",options:["运行Access查询","运行SQL语句（如INSERT、UPDATE等）","打开SQL视图","以上都不对"],answer:1,explanation:"RunSQL操作用于执行SQL语句（主要是操作查询：INSERT、UPDATE、DELETE等），可以实现批量数据操作。"}
  ]
};
