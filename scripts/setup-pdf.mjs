import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const toolsDir = path.join(root, 'tools')
const tmpDir = path.join(root, '.tmp/setup')

const arm = process.arch === 'arm64'
const TYPST = {
  url: arm
    ? 'https://github.com/typst/typst/releases/download/v0.15.1/typst-aarch64-apple-darwin.tar.xz'
    : 'https://github.com/typst/typst/releases/download/v0.15.1/typst-x86_64-apple-darwin.tar.xz',
  dir: arm ? 'typst-aarch64-apple-darwin' : 'typst-x86_64-apple-darwin',
  archive: 'typst.tar.xz',
  target: 'typst'
}

const PANDOC = {
  url: arm
    ? 'https://github.com/jgm/pandoc/releases/download/3.13/pandoc-3.13-arm64-macOS.zip'
    : 'https://github.com/jgm/pandoc/releases/download/3.13/pandoc-3.13-x86_64-macOS.zip',
  dir: arm ? 'pandoc-3.13-arm64' : 'pandoc-3.13-x86_64',
  archive: 'pandoc.zip',
  target: 'pandoc'
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`下载失败 ${res.status}: ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(dest, buf)
  console.log(`  ↓ ${(buf.length / 1024 / 1024).toFixed(1)} MB`)
}

async function install(tool, label) {
  fs.mkdirSync(tmpDir, { recursive: true })
  const archive = path.join(tmpDir, tool.archive)
  const dest = path.join(toolsDir, tool.target)

  if (fs.existsSync(dest)) {
    console.log(`✓ ${label} 已存在，跳过`)
    return
  }

  console.log(`\n下载 ${label}…`)
  await download(tool.url, archive)

  if (tool.archive.endsWith('.zip')) {
    execFileSync('unzip', ['-o', '-q', archive, '-d', tmpDir], { stdio: 'inherit' })
  } else {
    execFileSync('tar', ['-xf', archive, '-C', tmpDir], { stdio: 'inherit' })
  }

  fs.rmSync(dest, { recursive: true, force: true })
  fs.renameSync(path.join(tmpDir, tool.dir), dest)
  console.log(`✓ ${label} → ${path.relative(root, dest)}`)
}

fs.mkdirSync(toolsDir, { recursive: true })
await install(TYPST, 'Typst')
await install(PANDOC, 'Pandoc')

const typst = path.join(toolsDir, 'typst/typst')
const pandoc = path.join(toolsDir, 'pandoc/bin/pandoc')
for (const bin of [typst, pandoc]) fs.chmodSync(bin, 0o755)

console.log('\n完成。现在可以用 `npm run pdf` 把网页笔记导出成 PDF。')
