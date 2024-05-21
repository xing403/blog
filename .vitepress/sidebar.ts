import path from 'node:path'
import fs from 'node:fs'
import yaml from 'js-yaml'
import type { DefaultTheme } from 'vitepress'

export const sidebar = {
  '/blogs/': { base: '/blogs', items: sidebarMenu('blogs') },
  '/project/xing-ly/': { base: '/project/xing-ly', items: sidebarMenu("project/xing-ly") },
  '/project/schedule/': { base: '/project/schedule', items: sidebarMenu('project/schedule') },
  '/project/animate.ts/': { base: '/project/animate.ts', items: sidebarMenu('project/animate.ts') },
  '/pages/': { base: '/pages', items: sidebarMenu('pages') }
}

function sidebarMenu(dir = '', root = '/') {
  const sidebar: DefaultTheme.Sidebar = []
  for (const item of fs.readdirSync(path.resolve(__dirname, `../${dir}`))) {
    if (fs.statSync(path.resolve(__dirname, `../${dir}/${item}`)).isDirectory()) {
      sidebar.push({ text: item, items: sidebarMenu(`${dir}/${item}`, `${root}${item}/`) })
    } else {
      const content = fs.readFileSync(path.resolve(__dirname, `../${dir}/${item}`)).toString()
      const yamlObj = yaml.load(content.split('---')[1])

      if (!/^(description|introduction).md$/.test(item)) {// description introduction 排在前面
        sidebar.push({ text: yamlObj.title ?? item.split('.')[0], link: `${root}${item.split('.')[0]}` })
      } else {
        sidebar.unshift({ text: yamlObj.title ?? item.split('.')[0], link: `${root}${item.split('.')[0]}` })
      }
    }
  }
  return sidebar
}
