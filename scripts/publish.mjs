import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)))

const CANDIDATES = [
  'git',
  '/Applications/GitHub Desktop.app/Contents/Resources/app/git/bin/git'
]

function findGit() {
  for (const bin of CANDIDATES) {
    const r = spawnSync(bin, ['--version'], { encoding: 'utf8' })
    if (r.status === 0) return bin
  }
  return null
}

const git = findGit()
// GitHub Desktop 自带的 git 需要手动指定 exec-path，否则 https 推送会失败
const gitEnv = { ...process.env }
if (git.includes('GitHub Desktop.app')) {
  gitEnv.GIT_EXEC_PATH = '/Applications/GitHub Desktop.app/Contents/Resources/app/git/libexec/git-core'
}
if (!git) {
  console.error(`
找不到 git。

最简单的办法：打开 GitHub Desktop → Add Local Repository → 选择这个文件夹 → Publish repository。
或者安装 Xcode 命令行工具：xcode-select --install
`)
  process.exit(1)
}

const run = (args, opts = {}) =>
  spawnSync(git, args, { cwd: root, encoding: 'utf8', env: gitEnv, ...opts })

const status = run(['rev-parse', '--is-inside-work-tree'])
if (status.status !== 0) {
  const init = run(['init', '-b', 'main'], { stdio: 'inherit' })
  if (init.status !== 0) process.exit(init.status ?? 1)
  console.log('已初始化本地 git 仓库（main）。')
}

const name = run(['config', 'user.name']).stdout.trim()
const email = run(['config', 'user.email']).stdout.trim()
if (!name || !email) {
  console.error(`
还没有设置 git 身份，先运行（只需要一次）：

  git config --global user.name "你的名字"
  git config --global user.email "你的邮箱"

然后再运行 npm run publish。
`)
  process.exit(1)
}

run(['add', '-A'])

const staged = run(['diff', '--cached', '--quiet'])
if (staged.status === 0) {
  console.log('没有需要提交的改动。')
} else {
  const date = new Date().toISOString().slice(0, 10)
  const message = process.argv.slice(2).join(' ').trim() || `notes: 更新 ${date}`
  const commit = run(['commit', '-m', message], { stdio: 'inherit' })
  if (commit.status !== 0) process.exit(commit.status ?? 1)
}

const remotes = run(['remote']).stdout.trim()
if (!remotes) {
  console.log(`
提交已完成，但还没有远程仓库。

打开 GitHub Desktop → Add Local Repository → 选择：

  ${root}

然后点右上角的 "Publish repository"。
`)
  process.exit(0)
}

const push = spawnSync(git, ['push'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...gitEnv, GIT_TERMINAL_PROMPT: '0' }
})

if (push.status !== 0) {
  console.log(`
推送没有成功（可能是还没有登录 GitHub）。

打开 GitHub Desktop，点右上角 "Push origin" 即可。
`)
  process.exit(0)
}

const remote = run(['remote', 'get-url', 'origin']).stdout.trim()
let web = remote.replace(/\.git$/, '').replace(/^git@([^:]+):/, 'https://$1/')
if (!/^https?:/.test(web)) web = ''
console.log('已推送到 GitHub。')
if (web) console.log(`仓库：${web}\nActions：${web}/actions`)
