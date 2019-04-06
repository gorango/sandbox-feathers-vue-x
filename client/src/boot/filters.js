import camelCase from 'lodash/camelCase'

export default function ({Vue}) {
  const requireComponent = require.context('./filters', false, /[\w-]+\.js$/)

  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const name = camelCase(fileName.replace(/\.\w+$/, ''))
    Vue.filter(name, componentConfig.default || componentConfig)
  })
}
