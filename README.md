# takaOheartMyNote

个人笔记站：数学、化学、Python、随笔、职业规划，以及一个 **PDF 笔记库**。

- 默认深色模式，右上角可切浅色
- 数学公式用 MathJax 渲染
- 左侧目录自动生成，加笔记不用改配置
- PDF 统一放在 `docs/public/pdfs/`，在 `/pdfs/` 页面集中展示

## 快速开始

```bash
npm install
npm run dev       # http://localhost:5173
```

## 新增笔记

### 普通网页笔记

```bash
npm run new
```

按提示选分类、填标题和文件名即可，左侧目录会自动更新。

### PDF 笔记（推荐用于手写笔记 / 讲义）

1. 把整理好的 PDF 放到任意位置（比如桌面）。
2. 运行：

```bash
npm run new-pdf
```

3. 把 PDF 拖进终端，选分类，填标题和一句话描述。

PDF 会被复制到 `docs/public/pdfs/`，并出现在 <http://localhost:5173/pdfs/> 的 PDF 笔记库里。

也可以一行完成：

```bash
npm run new-pdf -- ~/Desktop/chm1001.pdf general-chemistry "CHM1001 期中复习" "手写稿整理版"
```

### 把网页笔记导出成 PDF

第一次使用先安装排版工具（Typst + Pandoc，约 60 MB，只需要一次）：

```bash
npm run setup:pdf
```

之后 `npm run pdf` 会把 `/general-chemistry/chm1001mid` 这一页按 A4 打印样式导出为
`docs/public/pdfs/chm1001mid.pdf`，同时生成封面缩略图。

```bash
npm run pdf
# 或者指定别的页面
npm run pdf -- --md docs/maths-notes/linear-algebra/pagerank.md --out pagerank.pdf
```

导出的 PDF 是浅色、无导航栏的打印版，公式和手绘图都会保留。

## 目录结构

```
my-note-site/
├── .github/workflows/deploy.yml   # 推送到 GitHub 后自动部署
├── tools/                         # 本地 PDF 工具（自动下载，不提交）
├── scripts/
│   ├── build-sidebar.mjs          # 生成左侧目录
│   ├── build-pdfs.mjs             # 生成 PDF 笔记库数据
│   ├── new-note.mjs               # 新建网页笔记
│   ├── new-pdf.mjs                # 收录 PDF 笔记
│   ├── make-pdf.mjs               # 网页 → PDF（Pandoc + Typst）
│   └── setup-pdf.mjs              # 下载 PDF 工具
├── docs/
│   ├── index.md
│   ├── pdfs/index.md              # PDF 笔记库页面
│   ├── .vitepress/
│   │   ├── config.js
│   │   ├── pdf-catalog.json       # PDF 清单（标题 / 分类 / 日期）
│   │   └── theme/components/PdfLibrary.vue
│   ├── public/pdfs/               # 所有 PDF 与封面
│   ├── public/figures/            # 手绘图
│   ├── maths-notes/
│   ├── general-chemistry/
│   ├── python/
│   ├── personal-essay/
│   ├── career-plan/
│   └── other/
└── package.json
```

## 在 VS Code 里使用

打开项目文件夹，按 `Cmd + Shift + P`，输入 **Tasks: Run Task**，会看到：

| 任务 | 作用 |
| --- | --- |
| ① 导入 PDF 笔记 | 选 PDF、选分类、填标题，自动收录并更新 PDF 笔记库 |
| ② 本地预览网站 | 启动 `npm run dev` |
| ③ 发布到 GitHub | 自动 commit，并尝试 push |
| 新建网页笔记 | 交互式新建 Markdown 笔记 |
| 把网页笔记导出成 PDF | 用 Typst 导出打印版 PDF |

**导入 PDF 的正确姿势**：运行「① 导入 PDF 笔记」，在弹出的输入框里直接
把 Finder 里的 PDF **拖进去**，路径会自动填好，然后选分类、写标题即可。

## 发布到 GitHub

仓库：<https://github.com/kxy200899-bot/takaOheartMyNote>

本机没有系统 git，VS Code 已经配置使用 GitHub Desktop 自带的 git
（见 `.vscode/settings.json`）。

### 第一次：把项目加进 GitHub Desktop

仓库已经在本地初始化好，远程也配置好了，现在有 2 个 commit 等待推送。

1. 打开 GitHub Desktop → **File → Add Local Repository**
2. 选择 `/Users/ykxalexa/Desktop/my-note-site`
3. 左侧出现仓库后，点右上角 **Push origin**

> 如果左侧列表里还有一个 `my-note-site/my-note-site` 的旧仓库（提示找不到文件），
> 右键 → **Remove** 删掉它即可，那是一个空的重复 clone。

推送完成后，去 GitHub 仓库的 **Actions** 页面确认 workflow 是否在运行。

### 日常更新

1. 改完文件，GitHub Desktop 会自动列出改动；
2. 左下角 Summary 写一句说明（例如 `add: 线代第三章 PDF`）；
3. 点 **Commit to main**，再点 **Push origin**；
4. 1–2 分钟后 GitHub Actions 自动构建并发布。

### 或者用 VS Code 任务

运行「③ 发布到 GitHub」：它会自动 commit；如果 push 需要登录 GitHub，
脚本会自动帮你打开 GitHub Desktop，点 **Push origin** 即可。

### 第一次开启网站

workflow 里已经加了 `enablement: true`，第一次推送时会自动启用 Pages，
一般不需要手动设置。

如果 Actions 在 configure-pages 这一步报 “Pages site not found”，再手动开：

1. 打开 <https://github.com/kxy200899-bot/takaOheartMyNote/settings/pages>
2. 左侧菜单 **Code and automation → Pages**（直接访问上面链接最稳）
3. **Build and deployment → Source** 选择 **GitHub Actions**
4. 回 **Actions** 点 **Re-run all jobs**

之后网址是：

```
https://kxy200899-bot.github.io/takaOheartMyNote/
```

工作流会自动设置 `BASE_PATH`；仓库名如果是 `<用户名>.github.io`，网址是
`https://<用户名>.github.io/`。

> 注意：Pages 必须手动开一次；没开之前 Actions 的 deploy 步骤会失败。

## 常用命令

```bash
npm run dev       # 本地预览
npm run build     # 构建到 docs/.vitepress/dist
npm run preview   # 预览构建结果
npm run new       # 新建网页笔记
npm run new-pdf   # 收录 PDF
npm run pdf       # 把网页导出成 PDF（先 npm run setup:pdf）
```
