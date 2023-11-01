// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import ElementPlus from 'element-plus'
import XingLy from 'xing-ly'
import Theme from 'vitepress/theme'
import Layout from './Layout.vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'

import './rainbow.css'
import './style.css'

import pkg from "../../package.json"

export default {
  ...Theme,
  Layout: () => h(Layout),
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus)
    app.use(XingLy)
  }
}
console.log(`%c author %c ${ pkg.author } `,
	"color:#FFF;background:#5c5c5c;border-radius:5px 0 0 5px;padding:5px;margin: 5px 0",
	"color:#FFF;background:#E6A23C;border-radius:0 5px 5px 0;padding:5px;margin: 5px 0"
);
console.log(`%c github %c ${ pkg.repository.url } `,
	"color:#FFF;background:#5c5c5c;border-radius:5px 0 0 5px;padding:5px;margin: 5px 0",
	"color:#FFF;background:#409eff;border-radius:0 5px 5px 0;padding:5px;margin: 5px 0"
);

