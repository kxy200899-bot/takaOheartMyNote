import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const docsDir = path.resolve(fileURLToPath(new URL('../docs', import.meta.url)))
const outFile = path.join(docsDir, '.vitepress', 'sidebar.generated.js')

/** 顶层分类，顺序即侧边栏顺序 */
const CATEGORIES = [
  { dir: 'maths-notes', label: 'Maths Notes', nested: true },
  { dir: 'general-chemistry', label: 'General Chemistry' },
  { dir: 'python', label: 'Python' },
  { dir: 'personal-essay', label: 'Personal Essay' },
  { dir: 'career-plan', label: 'Career Plan' },
  { dir: 'other', label: 'Other' }
]

/** 子分类的显示名与排序 */
const SUBSECTIONS = [
  { dir: 'linear-algebra', label: 'Linear Algebra' },
  { dir: 'calculus', label: 'Calculus' }
]

function readHead(abs) {
  return fs.readFileSync(abs, 'utf8').slice(0, 4000)
}

function frontmatter(abs) {
  const match = readHead(abs).match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return match ? match[1] : ''
}

function titleOf(abs) {
  const t = frontmatter(abs).match(/^title:\s*(.+?)\s*$/m)
  if (t) return t[1].replace(/^["']|["']$/g, '')
  const h1 = readHead(abs).match(/^#\s+(.+?)\s*$/m)
  return h1 ? h1[1] : path.basename(abs, '.md')
}

function orderOf(abs) {
  const o = frontmatter(abs).match(/^order:\s*(\d+)\s*$/m)
  return o ? Number(o[1]) : 999
}

function linkOf(abs) {
  const rel = path.relative(docsDir, abs).split(path.sep).join('/')
  return '/' + rel.replace(/\.md$/, '').replace(/\/index$/, '/')
}

function pageItem(abs) {
  return { text: titleOf(abs), link: linkOf(abs) }
}

function sortPages(absFiles) {
  return [...absFiles].sort((a, b) => {
    const oa = orderOf(a)
    const ob = orderOf(b)
    if (oa !== ob) return oa - ob
    return titleOf(a).localeCompare(titleOf(b), 'zh-Hans-CN')
  })
}

function mdFilesIn(dirAbs) {
  if (!fs.existsSync(dirAbs)) return []
  return fs
    .readdirSync(dirAbs, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith('.md'))
    .map((d) => path.join(dirAbs, d.name))
}

const isIndex = (abs) => path.basename(abs) === 'index.md'

/** 生成侧边栏数据结构 */
export function generateSidebar() {
  const sidebar = []

  // 1. 数学笔记：按子目录分组
  const maths = CATEGORIES.find((c) => c.nested)
  if (maths) {
    const mathsAbs = path.join(docsDir, maths.dir)
    const subDirs = fs.existsSync(mathsAbs)
      ? fs
          .readdirSync(mathsAbs, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name)
      : []

    const ordered = [
      ...SUBSECTIONS.map((s) => s.dir).filter((d) => subDirs.includes(d)),
      ...subDirs.filter((d) => !SUBSECTIONS.some((s) => s.dir === d)).sort()
    ]

    const subs = []
    for (const sub of ordered) {
      const label =
        SUBSECTIONS.find((s) => s.dir === sub)?.label ??
        sub.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())
      const files = mdFilesIn(path.join(mathsAbs, sub))
      const index = files.find(isIndex)
      const rest = sortPages(files.filter((f) => !isIndex(f)))
      const items = []
      if (index) items.push({ text: 'Overview', link: linkOf(index) })
      for (const f of rest) items.push(pageItem(f))
      if (items.length) subs.push({ text: label, collapsed: false, items })
    }

    if (subs.length) sidebar.push({ text: maths.label, collapsed: false, items: subs })
  }

  // 2. 其他分类：index 作为 Overview，其余按 order / 标题排序
  for (const cat of CATEGORIES.filter((c) => !c.nested)) {
    const abs = path.join(docsDir, cat.dir)
    const files = mdFilesIn(abs)
    if (files.length === 0) continue

    const index = files.find(isIndex)
    const rest = sortPages(files.filter((f) => !isIndex(f)))

    if (!index && rest.length === 1) {
      sidebar.push({ ...pageItem(rest[0]) })
      continue
    }

    if (!index && rest.length === 0) continue

    // 只有一个 index 页时，直接作为一个链接，避免“单条目录”
    if (index && rest.length === 0) {
      sidebar.push({ text: cat.label, link: linkOf(index) })
      continue
    }

    const items = []
    if (index) items.push({ text: 'Overview', link: linkOf(index) })
    for (const f of rest) items.push(pageItem(f))
    sidebar.push({ text: cat.label, collapsed: false, items })
  }

  return sidebar
}

/** 写入 sidebar.generated.js，VitePress 会自动重启并读取 */
export function writeSidebar() {
  const sidebar = generateSidebar()
  const code =
    '// 此文件由 scripts/build-sidebar.mjs 自动生成，请勿手动编辑。\n' +
    '// 新增笔记后运行 npm run new，或重启 npm run dev 即可更新。\n' +
    `export default ${JSON.stringify(sidebar, null, 2)}\n`
  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, code, 'utf8')
  return sidebar
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const sidebar = writeSidebar()
  console.log(`[sidebar] 已更新 → ${path.relative(process.cwd(), outFile)}`)
}
