import path from 'node:path'
import fs from 'node:fs'
import type { DefaultTheme } from 'vitepress'

export const sidebar = {
  '/blogs/': { base: '/blogs/', items: sidebarBlogs() },
  '/project/xing-ly/': { base: '/project/xing-ly/', items: sidebarProject() },
  '/project/schedule/': { base: '/project/schedule', items: sidebarMenu('project/schedule') },
  '/pages/': { base: '/pages/', items: sidebarPage() }
}

function sidebarBlogs() {
  return [
    {
      text: 'vue-vite',
      items: [
        { text: '创建vue项目', link: 'vue-vite/create-vue' },
        { text: 'defineProps & defineEmits', link: 'vue-vite/props-emits' },
      ],
    }, {
      text: 'plugins',
      items: [
        { text: 'plop 创建模板文件', link: 'plugins/plop' },
      ],
    }, {
      text: 'electron',
      items: [
        { text: '主进程与渲染进程通信', link: 'electron/process-communication' },
        { text: '发送桌面通知', link: 'electron/send-notification' },
      ],
    }, {
      text: 'github',
      items: [
        { text: 'workflows', link: 'github/workflows' },
        { text: 'token', link: 'github/token' },
        { text: 'pages', link: 'github/pages' },
        { text: 'pages2', link: 'github/pages2' },
      ]
    }, {
      text: 'blog',
      items: [
        { text: 'QT SQLite CRUD', link: 'qt/sqlite-crud' },
        { text: 'cron 规则', link: 'others/cron-rules' },
        { text: '数组与字典的相互转换', link: 'others/Arr2Dict' },
        { text: 'TypeScript', link: 'others/typescript' },
        { text: '修改Idea控制台输出', link: 'others/change-idea-console' },
        { text: 'github & gitee 图床', link: 'others/github-gitee-images' },
        { text: '实现canvas中图片的平移与缩放', link: 'others/canvas-drag-image' },
        { text: '实现pdf在canvas中展示', link: 'others/pdf-on-canvas' },
        { text: 'PC端和移动端交互事件', link: 'others/event' },
        { text: 'powershell命令简写', link: 'others/change-shell-command' },

      ],
    }, {
      text: 'Java',
      items: [
        { text: '安装JDK8', link: 'java/install-jdk8' },
        { text: 'SpringBoot 配置maven', link: 'java/springboot-maven' },
        { text: 'SpringBoot pom.xml', link: 'java/springboot-pom' },
        { text: 'Base64 utils文件', link: 'java/base64-utils' },
        { text: 'Redis utils文件', link: 'java/redis-utils' },
        { text: '@Data 注解', link: 'java/springboot-at-data' },
        { text: 'mybatis-plus 联表查询', link: 'java/springboot-mybatis-plus-join' },
        { text: '使用redis', link: 'java/springboot-redis' },
        { text: '异步任务', link: 'java/springboot-async-task' },
        { text: 'RabbitMQ消息服务', link: 'java/springboot-rabbitMQ' },
        { text: 'SpringBoot 上传 & 下载', link: 'java/springboot-upload-download' },
        { text: 'SpringBoot MVC', link: 'java/springboot-mvc' },
        { text: 'SpringBoot 用户安全访问', link: 'java/springboot-security' },
        { text: 'SpringBoot 自定义登录', link: 'java/springboot-custom-login' },
        { text: 'TomCat', link: 'java/tomcat' },
        { text: 'SpringBoot 构建 & 部署', link: 'java/springboot-build-deploy' },
        { text: 'Socket 点对点通信', link: 'java/socket-p2p' },
      ],
    }, {
      text: 'UniApp',
      items: [
        { text: 'uniApp 使用本地缓存', link: 'uniapp/usestorage' },
      ]
    }, {
      text: 'MySQL',
      items: [
        { text: '安装MySQL', link: 'mysql/install' },
      ],
    }, {
      text: 'mqtt',
      items: [
        { text: 'HTML 使用MQTT', link: 'mqtt/html-mqtt' },
        { text: 'vue3-ts-mqtt 封装', link: 'mqtt/vue3-mqtt' },
      ],
    }, {
      text: '数据结构',
      items: [
        { text: '线性表', link: 'data-structure/linear-list' },
        { text: '单链表', link: 'data-structure/link-list' },
        { text: '顺序表', link: 'data-structure/sequence-list' },
        { text: '广义表', link: 'data-structure/generalized-list' },
      ],
    }, {
      text: '小游戏',
      items: [
        { text: '贪吃蛇C语言实现', link: 'games/gluttonous-snake-c' },
        { text: '俄罗斯方块C语言实现', link: 'games/tetris-c' },
      ],
    }]
}

function sidebarProject() {
  return [{
    text: '介绍',
    link: '/'
  }, {
    text: '组件',
    items: [
      { text: 'canvas-image', link: 'components/canvas-image' },
      { text: 'qr-code', link: 'components/qr-code' },
    ]
  }]
}

function sidebarPage() {
  return []
}
function sidebarMenu(dir = '', root = '/') {
  const sidebar: DefaultTheme.Sidebar = []
  for (const item of fs.readdirSync(path.resolve(__dirname, `../${dir}`))) {
    if (fs.statSync(path.resolve(__dirname, `../${dir}/${item}`)).isDirectory()) {
      sidebar.push({
        text: item,
        items: sidebarMenu(`${dir}/${item}`, `${root}${item}/`)
      })

    } else if (!/^(description|introduction)/.test(item)) {// description introduction 排在前面
      sidebar.push({
        text: item.split('.')[0],
        link: `${root}${item.split('.')[0]}`,
      })
    } else if (/^(description|introduction)/.test(item)) {
      sidebar.unshift({
        text: item.split('.')[0],
        link: `${root}${item.split('.')[0]}`,
      })
    }
  }
  return sidebar
}
