---
layout: home

hero:
  name: takaOheartMyNote
  text: 数学、化学、代码与生活
  tagline: 个人笔记站 · 默认深色模式 · MathJax 数学公式
  actions:
    - theme: brand
      text: 读 PageRank 笔记
      link: /maths-notes/linear-algebra/pagerank
    - theme: alt
      text: 普通化学
      link: /general-chemistry/
    - theme: alt
      text: PDF 笔记库
      link: /pdfs/

features:
  - title: Maths Notes
    icon: ∑
    details: 线性代数笔记：PageRank 的推导与关联矩阵。
    link: /maths-notes/linear-algebra/pagerank
    linkText: 进入 Maths Notes
  - title: General Chemistry
    icon: ⚗
    details: CHM1001 期中复习笔记，手写稿整理成打印体，手绘图保留。
    link: /general-chemistry/
    linkText: 进入 General Chemistry
  - title: Python
    icon: ⌘
    details: 语法、常用库和小项目，代码可以直接复制运行。
    link: /python/
    linkText: 进入 Python
  - title: Personal Essay
    icon: ✎
    details: 读书、电影和生活里值得留下来的想法。
    link: /personal-essay/
    linkText: 进入 Personal Essay
  - title: Career Plan
    icon: ◈
    details: 方向、技能清单与时间线，把焦虑拆成可以执行的小步骤。
    link: /career-plan/
    linkText: 进入 Career Plan
  - title: Other
    icon: ✦
    details: 暂时归不了类的东西，以及如何新增笔记的说明。
    link: /other/
    linkText: 进入 Other
---

## 站点说明

- 左侧目录按分类组织，**Maths Notes** 下面放 **Linear Algebra**，以后有新的数学笔记再加。
- 右上角可以搜索全部笔记；旁边的太阳 / 月亮图标用来切换深浅色（默认深色）。
- 数学公式用 MathJax 渲染，行内写 `$a^2+b^2=c^2$`，独立成行写 `$$ ... $$`。

## 新增笔记不用改配置

运行下面这条命令，回答三个问题就行，文件会建好、侧边栏会自动更新：

```bash
npm run new
```

也可以直接把 `.md` 文件放进对应分类文件夹，重启 `npm run dev` 后它会自动出现在左侧目录里。详细说明见 [如何新增笔记](/other/how-to-add-notes)。

> 笔记不用写给别人看，先写给自己。
