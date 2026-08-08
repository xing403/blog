import path from 'node:path'
import fs from 'node:fs'
import yaml from 'js-yaml'
import type { DefaultTheme } from 'vitepress'
/**
 * 生成 VitePress 侧边栏路由配置
 * @param routes 路由路径数组：[前缀, 根路径][]
 * @returns sidebar 对象
 */
function createSidebarConfig(routes: [string, string][]) {
  const sidebar: Record<string, { base: string; items: any }> = {};
  for (const [routePath, baseDir] of routes) {
    sidebar[routePath] = {
      base: baseDir,
      items: sidebarMenu(baseDir)
    };
  }
  return sidebar;
}

// 调用生成你原有配置
export const sidebar = createSidebarConfig([
  ['/blogs/', 'blogs'],
  ['/project/xing-ly/', 'project/xing-ly'],
  ['/project/schedule/', 'project/schedule'],
  ['/project/animate.ts/', 'project/animate.ts'],
  ['/pages/', 'pages'],
  ['/thesis/', 'thesis']
]);

function sidebarMenu(dir = '', root = '/') {
  const sidebar: DefaultTheme.Sidebar = []
  for (const item of fs.readdirSync(path.resolve(__dirname, `../${dir}`))) {
    const filePath = path.resolve(__dirname, `../${dir}/${item}`)
    const file = fs.statSync(filePath)
    if (file.isDirectory()) {
      sidebar.push({ text: item, collapsed: false, items: sidebarMenu(`${dir}/${item}`, `${root}${item}/`) })
    } else {
      const content = fs.readFileSync(filePath).toString()
      const yamlObj = yaml.load(content.split('---')[1]) as any
      const sidebarItemInfo = {
        text: yamlObj.title ?? item.split('.')[0],
        link: `${root}${item.split('.')[0]}`
      }
      if (/^(description|introduction|overview).md$/.test(item)) {
        sidebar.unshift(sidebarItemInfo)
      } else {
        sidebar.push(sidebarItemInfo)
      }
    }
  }
  return sidebar
}
