import fs from 'node:fs'

function getFolder(path) {
  const components = []
  const files = fs.readdirSync(path)
  files.forEach((item) => {
    const stat = fs.lstatSync(`${path}/${item}`)
    if (stat.isDirectory() === true && item !== 'components') {
      components.push(`${path}/${item}`)
      components.push(...getFolder(`${path}/${item}`))
    }
  })
  return components
}
export default {
  description: '创建 page 页面',
  prompts: [{
    type: 'list',
    name: 'path',
    message: '请选择页面目录',
    choices: getFolder('pages'),
  }, {
    type: 'input',
    name: 'name',
    message: '请输入文件名',
    validate: (v) => {
      return (!v || v.trim === '') ? '文件名不能为空' : true
    },
  }],
  actions: (data) => {
    return [{
      type: 'add',
      path: `${data.path}/{{name}}.md`,
      templateFile: 'plop-templates/page/index.hbs',
      data: {
        title: data.title,
      },
    }]
  },
}
