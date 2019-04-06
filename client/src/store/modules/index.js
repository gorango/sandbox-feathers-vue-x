// Import all files from services folder
const requireModule = require.context('./', false, /^((?!index|\.unit\.).)*\.js$/)
const modules = requireModule.keys()
const serviceModules = modules.reduce((obj, fileName) => ({
  ...obj,
  [/[\w-]+/.exec(fileName)]: requireModule(fileName).default
}), {})

export default serviceModules
