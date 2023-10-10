import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

export default defineConfig({
  base: '/blog/',
  head: [
    ['link', {
      rel: 'icon',
      href: '/images/avatar.jpg'
    }]
  ],
  lang: 'zh-CN',
  dir: '',
  title: "星如雨",
  titleTemplate: ':title - 星如雨',
  description: "星如雨",
  // cleanUrls: true,  // 使 folder/index.html 变为 folder/index
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xing403' }
    ],
    footer: {
      copyright: '2020 - 2023 © Reach - <a href="http://ilstudy.vip" target="_blank">星如雨</a> | <a href="https://beian.miit.gov.cn" target="_blank">豫ICP备2021004680号-1</a>'
    },

    outline: "deep",
    outlineTitle: '目 录'
  },
  // rewrites: {
  //   'blogs/:pkg/(.*)': ':pkg/(.*)',
  //   'project/:pkg/(.*)': ':pkg/(.*)'
  // }
})
