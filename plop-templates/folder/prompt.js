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
function createFolder(folderName) {
  fs.mkdir(folderName, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('文件夹已成功创建');
    }
  });
}
export default {
  description: '创建 folder',
  prompts: [{
    type: 'list',
    name: 'path',
    message: '请选择页面目录',
    choices: ['blogs', ...getFolder('blogs'), 'pages', ...getFolder('pages')],
  }, {
    type: 'input',
    name: 'name',
    message: '请输入文件夹名称',
    validate: (v) => {
      return (!v || v.trim === '') ? '名称不能为空' : true
    },
  }],
  actions: (data) => {
    createFolder(`${data.path}/${data.name}`)
    return []
  },
}
