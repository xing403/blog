// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import ElementPlus from 'element-plus'
import XingLy from 'xing-ly'
import Theme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import './style.css'


export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus)
    app.use(XingLy)
  }
}
