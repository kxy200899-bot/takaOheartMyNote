import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { pdfDir, catalogFile, generatePdfs } from './build-pdfs.mjs'

const CATEGORIES = [
  { key: 'maths-notes', label: 'Maths Notes' },
  { key: 'general-chemistry', label: 'General Chemistry' },
  { key: 'python', label: 'Python' },
  { key: 'personal-essay', label: 'Personal Essay' },
  { key: 'career-plan', label: 'Career Plan' },
  { key: 'other', label: 'Other' }
]

function today() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function usage() {
  console.log(`
用法：
  npm run new-pdf                                    交互式添加
  npm run new-pdf -- <PDF 路径> <分类> "<标题>" ["描述"]  一步添加

分类可选：${CATEGORIES.map((c) => c.key).join(' / ')}

例子：
  npm run new-pdf -- ~/Desktop/chm1001.pdf general-chemistry "CHM1001 期中复习"
`)
}

async function main() {
  const args = process.argv.slice(2)
  let source
  let categoryKey
  let title
  let description = ''

  if (args.length >= 3) {
    ;[source, categoryKey, title] = args
    description = args[3] || ''
  } else if (args.length === 0) {
    const rl = readline.createInterface({ input, output })
    source = (await rl.question('\nPDF 文件路径（把文件拖进终端即可）：')).trim()
    if (!source) {
      rl.close()
      return
    }
    console.log('\n放进哪个分类？\n')
    CATEGORIES.forEach((c, i) => console.log(`  ${i + 1}) ${c.label}`))
    const pick = Number((await rl.question('\n输入序号（默认 2 = General Chemistry）：')).trim() || 2)
    categoryKey = CATEGORIES[pick - 1]?.key
    if (!categoryKey) {
      console.error('序号不对，退出。')
      rl.close()
      return
    }
    title = (await rl.question('标题：')).trim()
    if (!title) {
      console.error('标题不能为空，退出。')
      rl.close()
      return
    }
    description = (await rl.question('一句话描述（可留空）：')).trim()
    rl.close()
  } else {
    usage()
    process.exit(1)
  }

  source = source.replace(/^['"]|['"]$/g, '')
  if (source.startsWith('~/')) source = path.join(process.env.HOME || '', source.slice(2))
  const srcAbs = path.resolve(source)

  if (!fs.existsSync(srcAbs) || !fs.statSync(srcAbs).isFile()) {
    console.error(`找不到文件：${srcAbs}`)
    process.exit(1)
  }
  if (path.extname(srcAbs).toLowerCase() !== '.pdf') {
    console.error('目前只支持 PDF 文件。')
    process.exit(1)
  }

  const category = CATEGORIES.find(
    (c) => c.key === categoryKey || c.label.toLowerCase() === String(categoryKey).toLowerCase()
  )
  if (!category) {
    console.error(`未知分类：${categoryKey}\n`)
    usage()
    process.exit(1)
  }

  fs.mkdirSync(pdfDir, { recursive: true })

  let slug = slugify(path.basename(srcAbs, path.extname(srcAbs)))
  if (!slug) slug = `note-${Date.now()}`
  let file = `${slug}.pdf`
  let dest = path.join(pdfDir, file)

  // 如果源文件已经在 pdfs 目录里，直接使用
  if (path.resolve(dest) !== srcAbs) {
    if (fs.existsSync(dest)) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`
      file = `${slug}.pdf`
      dest = path.join(pdfDir, file)
    }
    fs.copyFileSync(srcAbs, dest)
  }

  const catalog = fs.existsSync(catalogFile)
    ? JSON.parse(fs.readFileSync(catalogFile, 'utf8'))
    : []

  if (catalog.some((item) => item.file === file)) {
    console.error(`这个 PDF 已经收录过了：${file}`)
    process.exit(1)
  }

  catalog.push({
    file,
    title,
    category: category.label,
    categoryKey: category.key,
    description,
    date: today()
  })
  fs.writeFileSync(catalogFile, JSON.stringify(catalog, null, 2) + '\n', 'utf8')

  const list = generatePdfs()
  console.log(`
已收录：${path.relative(process.cwd(), dest)}
标题：${title}
分类：${category.label}
当前共 ${list.length} 份 PDF，打开 http://localhost:5173/pdfs/ 查看。
`)
}

main()
