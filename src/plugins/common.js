import { componentsMap } from "@/components/common"

/**
 * Design System
 */
export default {
  /**
   * Install components.
   *
   * @param {object} Vue - Vue instance.
   */
  install(Vue) {
    // register components
    for (const [name, component] of Object.entries(componentsMap)) {
      Vue.component(name, component)
    }
  }
}
