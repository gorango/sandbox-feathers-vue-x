// Import all files from services folder
const requireModule = require.context('./', false, /^((?!index|\.unit\.).)*\.js$/)
const servicePlugins = requireModule.keys().map(fileName => requireModule(fileName).default)

export default (client, service) => servicePlugins.map(plugin => plugin(client, service))
