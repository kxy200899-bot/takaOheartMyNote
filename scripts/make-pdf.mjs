import fs from 'node:fs'
import path from 'node:path'
import { execFileSync, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const workDir = path.join(root, '.tmp/pdf')
const pdfDir = path.join(root, 'docs/public/pdfs')
const coverDir = path.join(pdfDir, 'covers')

const args = process.argv.slice(2)
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback
}

const mdPath = path.resolve(root, arg('md', 'docs/general-chemistry/chm1001mid.md'))
const outName = arg('out', 'chm1001mid.pdf')
const title = arg('title', 'CHM1001 期中复习笔记')

const pandocBin = process.env.PANDOC || path.join(root, 'tools/pandoc/bin/pandoc')
const typstBin = process.env.TYPST || path.join(root, 'tools/typst/typst')

for (const [name, bin] of [
  ['pandoc', pandocBin],
  ['typst', typstBin]
]) {
  if (!fs.existsSync(bin)) {
    console.error(`\n缺少 ${name}。先运行一次：\n\n  npm run setup:pdf\n`)
    process.exit(1)
  }
}

if (!fs.existsSync(mdPath)) {
  console.error(`找不到笔记：${mdPath}`)
  process.exit(1)
}

/** 把站点用的 Markdown 转成 Pandoc 能吃的版本 */
function preprocess(md) {
  let s = md.replace(/^---\n[\s\S]*?\n---\n/, '')
  s = s.replace(/::: tip[^\n]*\n[\s\S]*?\n:::\n/g, '')
  s = s.replace(/(?<!!)\[([^\]]+)\]\((\/[^)]+)\)/g, '$1')

  s = s.replace(
    /<figure class="hand-figure">\s*<img src="([^"]+)"[^>]*>\s*<figcaption>([\s\S]*?)<\/figcaption>\s*<\/figure>/g,
    (_, src, caption) => {
      const text = caption
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
      return `![${text}](/docs/public${src}){width=88%}`
    }
  )

  s = s.replace(/<\/?sub>/g, '')
  s = s.replace(/<p class="kicker">[\s\S]*?<\/p>/g, '')
  return s
}

fs.mkdirSync(workDir, { recursive: true })
fs.mkdirSync(pdfDir, { recursive: true })
fs.mkdirSync(coverDir, { recursive: true })

const md = fs.readFileSync(mdPath, 'utf8')
fs.writeFileSync(path.join(workDir, 'body.md'), preprocess(md), 'utf8')

execFileSync(pandocBin, [path.join(workDir, 'body.md'), '-f', 'markdown', '-t', 'typst', '-o', path.join(workDir, 'body.typ')], {
  cwd: root,
  stdio: 'inherit'
})

const footerTitle = `takaOheartMyNote · ${title}`
fs.writeFileSync(
  path.join(workDir, 'main.typ'),
  `#set page(
  paper: "a4",
  margin: (x: 2.0cm, top: 2.0cm, bottom: 2.4cm),
  footer: context {
    set text(size: 8pt, fill: luma(130))
    grid(
      columns: (1fr, auto),
      align(left)[${footerTitle}],
      align(right)[#counter(page).display("1 / 1")],
    )
  },
)
#set text(font: ("PingFang SC", "Songti SC", "Helvetica Neue"), size: 10.5pt, lang: "zh", region: "cn")
#set par(justify: true, leading: 0.85em)

#show heading.where(level: 1): it => block(above: 1.4em, below: 0.9em, text(size: 21pt, weight: "bold", it.body))
#show heading.where(level: 2): it => block(above: 1.3em, below: 0.7em, text(size: 14.5pt, weight: "bold", it.body))
#show heading.where(level: 3): it => block(above: 1em, below: 0.5em, text(size: 11.8pt, weight: "bold", it.body))

#show figure.caption: set text(size: 9pt, fill: luma(110))
#show table: set text(size: 9.3pt)

#include "body.typ"
`,
  'utf8'
)

const outAbs = path.join(pdfDir, outName)
execFileSync(typstBin, ['compile', '--root', root, path.join(workDir, 'main.typ'), outAbs], {
  cwd: root,
  stdio: 'inherit'
})

const size = fs.statSync(outAbs).size
console.log(`[pdf] 已生成 ${path.relative(root, outAbs)}（${(size / 1024 / 1024).toFixed(2)} MB）`)

const coverAbs = path.join(coverDir, outName.replace(/\.pdf$/i, '.png'))
const sips = spawnSync('sips', ['-s', 'format', 'png', outAbs, '-Z', '1200', '--out', coverAbs], { stdio: 'pipe' })
if (sips.status === 0 && fs.existsSync(coverAbs)) {
  console.log(`[pdf] 封面：${path.relative(root, coverAbs)}`)
}
