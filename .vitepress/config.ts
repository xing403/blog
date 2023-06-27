import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  dir: '',
  title: "星如雨",
  titleTemplate: ':title - 星如雨',
  description: "星如雨",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // nav: [
    //   { text: 'Index', link: '/' },
    // ],
    search: {
      provider: 'local'
    },
    sidebar: [
      { text: 'home', link: '/home/' },
      {
        text: 'blog pages',
        items: [
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xing403' }
    ],
    footer: {
      copyright: '2020 - 2023 © Reach - <a href="http://ilstudy.vip" target="_blank">星如雨</a> | <a href="https://beian.miit.gov.cn" target="_blank">豫ICP备2021004680号-1</a>'
    },
    outline: "deep",
    outlineTitle: '目 录'
  }
})