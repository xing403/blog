export const sidebar = [
  { text: 'home', link: '/home/' },
  {
    text: 'vue-vite',
    collapsed: false,
    items: [],
  }, {
    text: 'electron',
    collapsed: true,
    items: [
      { text: '主进程与渲染进程通信', link: '/blogs/electron/process-communication' },
      { text: '发送桌面通知', link: '/blogs/electron/send-notification' },
    ],
  }, {
    text: 'github',
    collapsed: true,
    items: [
      { text: 'workflows', link: '/blogs/github/workflows' },
      { text: 'token', link: '/blogs/github/token' },
      { text: 'pages', link: '/blogs/github/pages' },
      { text: 'pages2', link: '/blogs/github/pages2' },
    ]
  }, {
    text: '其他blog',
    collapsed: true,
    items: [
      { text: 'cron 规则', link: '/blogs/others/cron-rules' },
      { text: '数组与字典的相互转换', link: '/blogs/others/Arr2Dict' },
      { text: 'vue3-ts-mqtt 封装', link: '/blogs/others/vue3-mqtt' },
      { text: '实现canvas中图片的平移与缩放', link: '/blogs/others/canvas-drag-image' },
      { text: '实现pdf在canvas中展示', link: '/blogs/others/pdf-on-canvas' },
      { text: 'PC端和移动端交互事件', link: '/blogs/others/event' },
    ],
  }, {
    text: 'npm 仓库',
    collapsed: true,
    items: [
      {
        text: 'xing-ly', link: '/project/xing-ly/',
        items: [
          { text: 'xl-canvas-image', link: '/project/xing-ly/components/xl-canvas-image/' },
        ]
      },
    ],
  }, {
    text: 'resource',
    items: [
      { text: '外链', link: '/resource/' },
    ],
  },
]
