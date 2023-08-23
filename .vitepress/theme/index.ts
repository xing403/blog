// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import ElementPlus from 'element-plus'
import XingLy from 'xing-ly'
import Theme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import './style.css'
import packageJson from "../../package.json"
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
console.log(`%c version %c ${ packageJson.version } `,
	"color:#FFF;background:#5c5c5c;border-radius:5px 0 0 5px;padding:5px;margin: 5px 0",
	"color:#FFF;background:#E6A23C;border-radius:0 5px 5px 0;padding:5px;margin: 5px 0"
);

