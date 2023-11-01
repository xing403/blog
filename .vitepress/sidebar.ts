export const sidebar = [
  { text: 'home', link: '/home/' },
  {
    text: 'vue-vite',
    items: [
      { text: '创建vue项目', link: '/blogs/vue-vite/create-vue' },
      { text: 'defineProps & defineEmits', link: '/blogs/vue-vite/props-emits' },
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
      { text: 'QT SQLite CRUD', link: '/blogs/qt/sqlite-crud' },
      { text: 'cron 规则', link: '/blogs/others/cron-rules' },
      { text: '数组与字典的相互转换', link: '/blogs/others/Arr2Dict' },
      { text: 'TypeScript', link: '/blogs/others/typescript' },
      { text: '修改Idea控制台输出', link: '/blogs/others/change-idea-console' },
      { text: 'github & gitee 图床', link: '/blogs/others/github-gitee-images' },
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
      { text: 'SpringBoot pom.xml', link: '/blogs/java/springboot-pom' },
      { text: 'Base64 utils文件', link: '/blogs/java/base64-utils' },
      { text: 'Redis utils文件', link: '/blogs/java/redis-utils' },
      { text: '@Data 注解', link: '/blogs/java/springboot-at-data' },
      { text: 'mybatis-plus 联表查询', link: '/blogs/java/springboot-mybatis-plus-join' },
      { text: '使用redis', link: '/blogs/java/springboot-redis' },
      { text: '异步任务', link: '/blogs/java/springboot-async-task' },
      { text: 'RabbitMQ消息服务', link: '/blogs/java/springboot-rabbitMQ' },
      { text: 'SpringBoot 上传 & 下载', link: '/blogs/java/springboot-upload-download' },
      { text: 'SpringBoot MVC', link: '/blogs/java/springboot-mvc' },
      { text: 'SpringBoot 用户安全访问', link: '/blogs/java/springboot-security' },
      { text: 'SpringBoot 自定义登录', link: '/blogs/java/springboot-custom-login' },
      { text: 'TomCat', link: '/blogs/java/tomcat' },
      { text: 'SpringBoot 构建 & 部署', link: '/blogs/java/springboot-build-deploy' },
      { text: 'Socket 点对点通信', link: '/blogs/java/socket-p2p' },
    ],
  }, {
    text: 'UniApp',
    items: [
      { text: 'uniApp 使用本地缓存', link: '/blogs/uniapp/usestorage' },
    ]
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
    text: '数据结构',
    items: [
      { text: '线性表', link: '/blogs/data-structure/linear-list' },
      { text: '单链表', link: '/blogs/data-structure/link-list' },
      { text: '顺序表', link: '/blogs/data-structure/sequence-list' },
      { text: '广义表', link: '/blogs/data-structure/generalized-list' },
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
      { text: '外链', link: '/pages/resource/' },
    ],
  },
]
