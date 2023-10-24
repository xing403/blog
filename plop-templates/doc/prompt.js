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
  description: '创建 doc 页面',
  prompts: [{
    type: 'list',
    name: 'path',
    message: '请选择页面目录',
    choices: getFolder('blogs'),
  }, {
    type: 'input',
    name: 'name',
    message: '请输入文件名',
    validate: (v) => {
      return (!v || v.trim === '') ? '文件名不能为空' : true
    },
  }, {
    type: 'input',
    name: 'title',
    message: '请输入标题',
    default: '默认标题',
  }, {
    type: 'input',
    name: 'keyword',
    message: '请输入关键词(`,` 分割)',
  }],
  actions: (data) => {
    return [{
      type: 'add',
      path: `${data.path}/{{name}}.md`,
      templateFile: 'plop-templates/doc/index.hbs',
      data: {
        title: data.title,
        keywords: data.keyword.split(',').filter(key => key != ''),
        hasKeywords: data.keyword.split(',').filter(key => key != '').length > 0,
      },
    }]
  },
}
