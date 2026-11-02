import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
export const pdfDir = path.join(root, 'docs/public/pdfs')
export const catalogFile = path.join(root, 'docs/.vitepress/pdf-catalog.json')
const outFile = path.join(root, 'docs/.vitepress/pdfs.generated.js')

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function readCatalog() {
  if (!fs.existsSync(catalogFile)) return []
  return JSON.parse(fs.readFileSync(catalogFile, 'utf8'))
}

export function generatePdfs() {
  const catalog = readCatalog()
  const entries = []

  for (const item of catalog) {
    const abs = path.join(pdfDir, item.file)
    if (!fs.existsSync(abs)) {
      console.warn(`[pdfs] 目录里有记录但文件不存在：${item.file}`)
      continue
    }
    const stat = fs.statSync(abs)
    const base = item.file.replace(/\.pdf$/i, '')
    const cover = path.join(pdfDir, 'covers', `${base}.png`)
    entries.push({
      file: `/pdfs/${item.file}`,
      title: item.title || base,
      category: item.category || 'Other',
      categoryKey: item.categoryKey || 'other',
      description: item.description || '',
      date: item.date || '',
      size: formatSize(stat.size),
      sizeBytes: stat.size,
      cover: fs.existsSync(cover) ? `/pdfs/covers/${base}.png` : null
    })
  }

  const known = new Set(catalog.map((c) => c.file))
  if (fs.existsSync(pdfDir)) {
    for (const name of fs.readdirSync(pdfDir)) {
      if (name.toLowerCase().endsWith('.pdf') && !known.has(name)) {
        console.warn(`[pdfs] 发现未收录的 PDF：${name}（运行 npm run new-pdf 添加）`)
      }
    }
  }

  entries.sort(
    (a, b) => (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title, 'zh-Hans-CN')
  )

  const code =
    '// 此文件由 scripts/build-pdfs.mjs 自动生成，请勿手动编辑。\n' +
    `export default ${JSON.stringify(entries, null, 2)}\n`
  fs.writeFileSync(outFile, code, 'utf8')
  return entries
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const list = generatePdfs()
  console.log(`[pdfs] 已收录 ${list.length} 份 PDF → ${path.relative(process.cwd(), outFile)}`)
}
