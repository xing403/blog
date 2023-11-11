import { defineConfig } from 'vitepress'
import { nav } from './nav'
import { sidebar } from './sidebar'

export default defineConfig({
  head: [['link', {
    rel: 'icon',
    href: '/images/avatar.jpg'
  }],
  // ['meta', {
  //   name: 'referrer',
  //   content: 'no-referrer'
  // }], 
  ['script', {
    src: 'https://hm.baidu.com/hm.js?17dab9a98b7784c14b4abbfeb30df854'
  }]],
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
    nav: nav(),
    sidebar,
    socialLinks: [
      { link: 'https://github.com/xing403', ariaLabel: 'github', icon: 'github' },
      { link: 'https://gitee.com/xing403', ariaLabel: 'gitee', icon: { svg: `<svg role="img" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1631" width="200" height="200"><title>Gitee</title><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" p-id="1632" /></svg>` } },
    ],
    footer: {
      copyright: '2020 - 2023 © Reach - <a href="http://ilstudy.vip" target="_blank">星如雨</a> | <a href="https://beian.miit.gov.cn" target="_blank">豫ICP备2021004680号-1</a>'
    },

    outline: "deep",
    outlineTitle: '目 录'
  },
})
