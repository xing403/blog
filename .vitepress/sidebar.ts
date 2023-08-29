export const sidebar = [
  { text: 'home', link: '/home/' },
  {
    text: 'blog pages',
    items: [
      { text: '数组与字典的相互转换', link: '/blogs/Arr2Dict/' },
      { text: 'vue3-ts-mqtt 封装', link: '/blogs/vue3-mqtt/' },
      { text: '实现canvas中图片的平移与缩放', link: '/blogs/canvas-drag-image/' },
      { text: '实现pdf在canvas中展示', link: '/blogs/pdf-on-canvas/' },
      { text: 'PC端和移动端交互事件', link: '/blogs/event/' },
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
