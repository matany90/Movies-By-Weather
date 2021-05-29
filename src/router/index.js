import Vue from "vue"
import VueRouter from "vue-router"

import home from "../views/Home.vue"
import details from "../views/Details.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: home
  },
  {
    path: "/details/:id",
    name: "details",
    component: details
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

// check if path exists
router.beforeEach(async (to, from, next) => {
  if (!to.matched.length) {
    next("/")
  }

  next()
})

export default router
