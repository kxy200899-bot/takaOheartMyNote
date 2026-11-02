import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { docsDir, writeSidebar } from './build-sidebar.mjs'

const CHOICES = [
  { key: 'maths-notes/linear-algebra', label: 'Maths Notes / Linear Algebra' },
  { key: 'maths-notes/calculus', label: 'Maths Notes / Calculus' },
  { key: 'general-chemistry', label: 'General Chemistry' },
  { key: 'python', label: 'Python' },
  { key: 'personal-essay', label: 'Personal Essay' },
  { key: 'career-plan', label: 'Career Plan' },
  { key: 'other', label: 'Other' }
]

function template(rawTitle) {
  const title = rawTitle.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/`/g, "'").replace(/\$\{/g, '$ {')
  return `---
title: "${title}"
---

# ${rawTitle}

> 这是一篇新笔记，从这里开始写。

## 第一节

把内容写在这里。行内公式写成 $E = mc^2$，块级公式写成：

$$
a^2 + b^2 = c^2
$$
`
}

function usage() {
  console.log(`
用法：
  npm run new                                     交互式创建
  npm run new -- <分类> <文件名> "<标题>"          一步创建

分类可选：
${CHOICES.map((c, i) => `  ${i + 1}. ${c.key.padEnd(28)} ${c.label}`).join('\n')}

例子：
  npm run new -- general-chemistry chm1001mid "CHM1001 期中复习"
`)
}

async function main() {
  const args = process.argv.slice(2)

  let category
  let slug
  let title

  if (args.length === 0) {
    const rl = readline.createInterface({ input, output })
    console.log('\n要把新笔记放在哪个分类？\n')
    CHOICES.forEach((c, i) => console.log(`  ${i + 1}) ${c.label}`))
    const pick = Number((await rl.question('\n输入序号（直接回车默认 3 = General Chemistry）：')).trim() || 3)
    category = CHOICES[pick - 1]?.key
    if (!category) {
      console.error('序号不对，退出。')
      rl.close()
      return
    }

    title = (await rl.question('标题（中文英文都行）：')).trim()
    if (!title) {
      console.error('标题不能为空，退出。')
      rl.close()
      return
    }

    const suggestion = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    const answer = (await rl.question(`文件名（小写英文、短横线，直接回车用 ${suggestion || 'note'}）：`)).trim()
    slug = answer || suggestion || 'note'
    rl.close()
  } else if (args.length >= 3) {
    ;[category, slug, title] = args
  } else {
    usage()
    process.exit(1)
  }

  if (!CHOICES.some((c) => c.key === category)) {
    console.error(`未知分类：${category}\n`)
    usage()
    process.exit(1)
  }

  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    console.error('文件名只能用小写字母、数字和短横线，例如 my-first-note')
    process.exit(1)
  }

  const dirAbs = path.join(docsDir, category)
  fs.mkdirSync(dirAbs, { recursive: true })
  const fileAbs = path.join(dirAbs, `${slug}.md`)

  if (fs.existsSync(fileAbs)) {
    console.error(`文件已存在：${path.relative(process.cwd(), fileAbs)}`)
    process.exit(1)
  }

  fs.writeFileSync(fileAbs, template(title), 'utf8')
  writeSidebar()

  const link = `/${category}/${slug}`
  console.log(`
已创建：${path.relative(process.cwd(), fileAbs)}
侧边栏已自动更新。

本地预览时打开：http://localhost:5173${link}
（如果正在运行 npm run dev，浏览器会自动刷新；没运行就先 npm run dev）
`)
}

main()
