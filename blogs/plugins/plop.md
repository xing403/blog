---
title: plop plugin
layout: doc
tags: [plop, tool, plugin]
---

## 介绍
`plop` 是一个命令行工具，用于生成重复代码。在项目的开发过程中，我们经常需要重复创建一些文件，比如创建一个组件，创建一个页面，创建一个接口文件等等。每次创建一个文件，我们都需要手动创建文件，然后填写文件名，文件内容等信息，以及在文件中可能需要 `import` 或者 `require` 引入其他文件。
`plop` 就是用于解决这个问题的，它提供了一个命令行工具，用于生成重复代码。

## 安装
```bash
npm i plop -D # pnpm i plop -D or yarn add plop -D
```
## 使用
在项目的根目录中创建 `plopfile.js` 文件，用于配置 `plop` 命令行工具。
```js
import fs from 'node:fs'

export default async function (plop) {
  // `plop-templates` 为模板的存放目录，查询目录下的所有模板
  for (const item of fs.readdirSync('./plop-templates')) {
    
    if (fs.lstatSync(`./plop-templates/${item}`).isDirectory())
      // `prompt.js` 为模板的配置文件，用于配置模板的文件名，文件内容等信息
      plop.setGenerator(item, (await import(`./plop-templates/${item}/prompt.js`)).default)
  }
};
```
## 配置模板
在 `plop-templates` 目录下创建模板文件夹，用于存放模板文件。
例如创建 `page`
```bash
mkdir plop-templates/page
```
在 `page` 目录下创建 `prompt.js` 文件，用于配置模板的文件名，文件内容等信息 和 `index.hbs` 模板文件。

### prompt.js
```js
// 获取文件创建的目录列表
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
      templateFile: 'plop-templates/page/index.hbs',// 模板文件
      data: {
        title: data.title,
      },
    }]
  },
}
```
### index.hbs
```md
---
title: {{ title }}
layout: page
---
# {{ title }}
```
## 使用
项目的package.json 配置
```json
{
  "scripts": {
    "plop": "plop"
  }
}
```
在命令行中运行
```bash
npm run plop # pnpm plop
```
选择 `page` 目录，输入文件名，点击回车。
将会在指定的文件下创建一个 `.md` 文件，并生成一个包含 `index.hbs` 模板文件的内容。

