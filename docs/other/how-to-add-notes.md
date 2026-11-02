---
title: 如何新增笔记
---

# 如何新增笔记

好消息：这个站点的**左侧目录是自动生成的**，你不需要手动改导航或侧边栏。

::: tip 用 VS Code 最快
按 `Cmd + Shift + P` → **Tasks: Run Task** → 「① 导入 PDF 笔记」，
把 PDF 拖进输入框，选分类、填标题就行。
:::

## 方法一：一条命令（推荐）

在项目文件夹里打开终端，运行：

```bash
npm run new
```

然后按提示回答三个问题：

1. 放进哪个分类（输入序号，回车默认 General Chemistry）
2. 标题（中文英文都可以）
3. 文件名（小写英文，用短横线连接，比如 `chm1001-chapter-5`）

脚本会建好 `.md` 文件，并自动刷新左侧目录。

如果不想回答问题，也可以一行写完：

```bash
npm run new -- general-chemistry chm1001-chapter-5 "CHM1001 第五章"
```

第一个参数是分类，可选值：

```
maths-notes/linear-algebra
maths-notes/calculus
general-chemistry
python
personal-essay
career-plan
other
```

## 方法二：手动加文件

1. 在 `docs/` 下对应分类的文件夹里新建一个 `.md` 文件。
2. 文件开头写标题：

```markdown
---
title: 我的新笔记
---

# 我的新笔记

正文……
```

3. 回到终端，按 `Ctrl + C` 停掉当前服务，再运行 `npm run dev`。

左侧目录会在启动时重新扫描，新笔记就出现了。标题取 `title:`，没有就取第一个 `#` 标题。

> 加笔记时不需要动 `docs/.vitepress/config.js`。侧边栏文件 `sidebar.generated.js` 由 `scripts/build-sidebar.mjs` 自动生成，不要手动改它。

## 加 PDF 笔记（手写稿整理版）

手写笔记让 AI 整理成打印体后，一般会得到一份 PDF。把它收进站点的步骤：

1. 运行：

   ```bash
   npm run new-pdf
   ```

2. 把 PDF 文件拖进终端（或者粘贴路径），回车。
3. 选分类、填标题和一句话描述。

PDF 会被复制到 `docs/public/pdfs/`，并自动出现在 [PDF 笔记](/pdfs/) 页面和对应分类下。

也可以一行完成：

```bash
npm run new-pdf -- ~/Desktop/chm1001.pdf general-chemistry "CHM1001 期中复习"
```

网页上的笔记想导出成 PDF，先装一次排版工具，再导出：

```bash
npm run setup:pdf   # 只需第一次
npm run pdf
```

它会把 `/general-chemistry/chm1001mid` 按 A4 打印样式导出，并生成封面缩略图。

## 写内容的常用格式

### 数学公式

行内：`$E = mc^2$` → $E = mc^2$

独立一行：

```markdown
$$
\int_a^b f(x)\,dx = F(b) - F(a)
$$
```

### 图片

把图片放进 `docs/public/figures/` 里，比如 `docs/public/figures/my-note/fig1.png`，然后：

```markdown
![说明文字](/figures/my-note/fig1.png)
```

想给手绘图加边框和说明，可以用：

```html
<figure class="hand-figure">
  <img src="/figures/my-note/fig1.png" alt="说明">
  <figcaption>图 1 · 说明文字</figcaption>
</figure>
```

### 提示框、表格、代码

```markdown
::: tip 小提示
这里可以写提示。
:::

| 列 1 | 列 2 |
| --- | --- |
| 内容 | 内容 |
```

::: tip 新笔记没出现？
先确认文件真的在 `docs/<分类>/` 里面，再重启 `npm run dev`。如果用了 `npm run new`，它已经帮你更新过目录了。
:::
