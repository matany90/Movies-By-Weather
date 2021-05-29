import Vue from "vue"
import VueI18n from "vue-i18n"
import VueScrollTo from "vue-scrollto"

import App from "./App.vue"
import router from "./router"
import store from "./store"
import common from "./plugins/common"
import { translations } from "./locales"
import components from "./plugins/components"

import "./assets/css/tailwind.css"
import "./assets/tailwind.css"

// install internal plugins
Vue.use(common)
Vue.use(components)
Vue.use(VueScrollTo)

// install il18
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: "en", // set locale
  messages: translations
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app")
