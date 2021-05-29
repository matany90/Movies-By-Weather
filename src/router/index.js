import Vue from "vue"
import VueRouter from "vue-router"

import Home from "../views/home.vue"
import Details from "../views/details.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/details/:id",
    name: "details",
    component: Details
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
