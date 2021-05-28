/**
 * Automaticly require all components
 */
const requiredModules = require.context(".", true, /\.\/Matan[\w\W]+\/$/)
const modules = {}

requiredModules.keys().forEach(filename => {
  // get the module name from the filename
  const moduleName = filename.replace(/\.\/|\//g, "")
  modules[moduleName] =
    requiredModules(filename).default || requiredModules(filename)
})

export const componentsMap = modules
