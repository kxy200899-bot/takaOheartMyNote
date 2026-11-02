import { defineConfig } from 'vitepress'
import sidebar from './sidebar.generated.js'

// GitHub Pages 项目站点部署在 /<repo>/ 下，需要 base 前缀
const repoName = (process.env.GITHUB_REPOSITORY || '').split('/')[1] || ''
const base =
  process.env.BASE_PATH ||
  (repoName && !repoName.endsWith('.github.io') ? `/${repoName}/` : '/')

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: 'takaOheartMyNote',
  description: 'takaOheartMyNote —— 数学、化学、Python 与生活的个人笔记',
  // 默认深色模式，右上角仍可切回浅色
  appearance: 'dark',
  cleanUrls: true,
  markdown: {
    // 依赖 markdown-it-mathjax3，见 package.json
    math: true
  },
  head: [
    ['meta', { name: 'theme-color', content: '#14120f' }],
    ['meta', { name: 'color-scheme', content: 'dark light' }],
    [
      'link',
      {
        rel: 'icon',
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%23e0a458'/%3E%3Cpath d='M28 74V26h9l13 22 13-22h9v48h-9V45l-13 21-13-21v29z' fill='%2314120f'/%3E%3C/svg%3E"
      }
    ]
  ],
  vite: {
    server: {
      watch: {
        // 构建产物和自动生成的侧边栏不参与热更新
        ignored: ['**/dist/**', '**/cache/**']
      }
    }
  },
  themeConfig: {
    siteTitle: 'takaOheartMyNote',
    nav: [
      { text: '首页', link: '/' },
      {
        text: 'Maths Notes',
        activeMatch: '/maths-notes/',
        items: [
          { text: 'PageRank 与线性代数', link: '/maths-notes/linear-algebra/pagerank' },
          { text: '关联矩阵', link: '/maths-notes/linear-algebra/incidence-matrix' }
        ]
      },
      { text: 'General Chemistry', link: '/general-chemistry/', activeMatch: '/general-chemistry/' },
      { text: 'Python', link: '/python/', activeMatch: '/python/' },
      { text: 'Personal Essay', link: '/personal-essay/', activeMatch: '/personal-essay/' },
      { text: 'Career Plan', link: '/career-plan/', activeMatch: '/career-plan/' },
      { text: 'Other', link: '/other/', activeMatch: '/other/' },
      { text: 'PDF 笔记', link: '/pdfs/', activeMatch: '/pdfs/' }
    ],
    sidebar: [...sidebar, { text: 'PDF 笔记', link: '/pdfs/' }],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除搜索',
            backButtonTitle: '返回上一页',
            noResultsText: '没有找到相关结果：',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc'
            }
          }
        }
      }
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '切换语言',
    externalLinkIcon: true,
    footer: {
      message: '用 Markdown 记录值得留下的东西',
      copyright: '© 2026 takaOheartMyNote'
    }
  }
})
