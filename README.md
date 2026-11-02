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
npm run pdf -- --route /maths-notes/linear-algebra/pagerank --out pagerank.pdf
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

## 发布到 GitHub Pages

### 1. 在 GitHub 上创建仓库

新建一个空仓库，例如 `takaOheartMyNote`。**不要**勾选自动生成 README。

### 2. 本地安装 git 并推送

macOS 如果提示“no developer tools”，先安装命令行工具：

```bash
xcode-select --install
```

然后在本文件夹里：

```bash
git init
git add .
git commit -m "init: takaOheartMyNote"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

> 没有 git 也可以：在 GitHub 网页上新建仓库，用 “uploading an existing file” 把项目文件夹（不含 `node_modules`、`tools`、`docs/.vitepress/dist`、`.tmp`）拖上去。

### 3. 打开 GitHub Pages

仓库页面 → **Settings → Pages → Build and deployment → Source** 选择
**GitHub Actions**。

推送完成后，`.github/workflows/deploy.yml` 会自动构建并发布，网址是：

```
https://<你的用户名>.github.io/<仓库名>/
```

仓库名如果是 `<用户名>.github.io`，网址直接是 `https://<用户名>.github.io/`。

工作流会自动设置 `BASE_PATH`，不需要手动改配置。

## 常用命令

```bash
npm run dev       # 本地预览
npm run build     # 构建到 docs/.vitepress/dist
npm run preview   # 预览构建结果
npm run new       # 新建网页笔记
npm run new-pdf   # 收录 PDF
npm run pdf       # 把网页导出成 PDF（先 npm run setup:pdf）
```
