


export function nav() {
  return [{
    text: '博客文章',
    link: '/blogs/overview',
    activeMatch: '/blogs/'
  },{
    text: '论文',
    link: '/thesis/overview',
    activeMatch: '/thesis/'
  }, {
    text: '项目',
    items: [{
      text: 'xing-ly',
      link: '/project/xing-ly/introduction'
    }, {
      text: 'schedule',
      link: '/project/schedule/introduction'
    }, {
      text: 'animate.ts',
      link: '/project/animate.ts/introduction'
    }]
  },
  //  {
  //   text: '玩一下',
  //   items: [{
  //     text: 'schedule',
  //     link: 'http://schedule.ilstudy.vip'
  //   }, {
  //     text: 'vue3 md editor',
  //     link: 'http://editor.ilstudy.vip'
  //   }, {
  //     text: 'todo list',
  //     link: 'http://todo.ilstudy.vip'
  //   }, {
  //     text: 'games',
  //     link: 'http://games.ilstudy.vip'
  //   }, {
  //     text: 'avatar',
  //     link: 'https://avatar.ilstudy.vip'
  //   }, {
  //     text: 'board',
  //     link: 'http://board.ilstudy.vip'
  //   }, {
  //     text: 'Vue实时弹幕',
  //     link: 'http://dm.project.ilstudy.vip'
  //   }]
  // },
  {
    text: '资源导航',
    link: '/pages/resource',
  }]
}
