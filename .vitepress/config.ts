import { defineConfig } from 'vitepress'

export default defineConfig({
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
          { text: 'vue3-ts-mqtt 封装', link: '/blogs/vue3-mqtt/' },
          { text: '实现canvas中图片的平移与缩放', link: '/blogs/canvas-drag-image/' },
          { text: '实现pdf在canvas中展示', link: '/blogs/pdf-on-canvas/' },
          { text: 'PC端和移动端交互事件', link: '/blogs/event/' },
        ],
      },{
        text: 'resource',
        items: [
          { text: '外链', link: '/resource/' },
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
