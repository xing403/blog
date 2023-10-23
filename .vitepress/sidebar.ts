export const sidebar = [
  { text: 'home', link: '/home/' },
  {
    text: 'vue-vite',
    items: [
      { text: '创建vue项目', link: '/blogs/vue-vite/create-vue' },
    ],
  }, {
    text: 'electron',
    items: [
      { text: '主进程与渲染进程通信', link: '/blogs/electron/process-communication' },
      { text: '发送桌面通知', link: '/blogs/electron/send-notification' },
    ],
  }, {
    text: 'github',
    items: [
      { text: 'workflows', link: '/blogs/github/workflows' },
      { text: 'token', link: '/blogs/github/token' },
      { text: 'pages', link: '/blogs/github/pages' },
      { text: 'pages2', link: '/blogs/github/pages2' },
    ]
  }, {
    text: 'blog',
    items: [
      { text: 'cron 规则', link: '/blogs/others/cron-rules' },
      { text: '数组与字典的相互转换', link: '/blogs/others/Arr2Dict' },
      { text: '实现canvas中图片的平移与缩放', link: '/blogs/others/canvas-drag-image' },
      { text: '实现pdf在canvas中展示', link: '/blogs/others/pdf-on-canvas' },
      { text: 'PC端和移动端交互事件', link: '/blogs/others/event' },
      { text: 'powershell命令简写', link: '/blogs/others/change-shell-command' },
    ],
  }, {
    text: 'Java',
    items: [
      { text: '安装JDK8', link: '/blogs/java/install-jdk8' },
      { text: 'SpringBoot 配置maven', link: '/blogs/java/springboot-maven' },
      { text: 'Base64 utils文件', link: '/blogs/java/base64-utils' },
      { text: 'Redis utils文件', link: '/blogs/java/redis-utils' },
    ],
  }, {
    text: 'MySQL',
    items: [
      { text: '安装MySQL', link: '/blogs/mysql/install' },
    ],
  }, {
    text: 'mqtt',
    items: [
      { text: 'HTML 使用MQTT', link: '/blogs/mqtt/html-mqtt' },
      { text: 'vue3-ts-mqtt 封装', link: '/blogs/mqtt/vue3-mqtt' },
    ],
  }, {
    text: '小游戏',
    items: [
      { text: '贪吃蛇C语言实现', link: '/blogs/games/gluttonous-snake-c' },
      { text: '俄罗斯方块C语言实现', link: '/blogs/games/tetris-c' },
    ],
  }, {
    text: 'npm 仓库',
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
