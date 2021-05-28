import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import common from "./plugins/common"

import "./assets/css/tailwind.css"
import "./assets/tailwind.css"

// install internal plugins
Vue.use(common)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
