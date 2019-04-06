import camelCase from 'lodash/camelCase'

export default function ({Vue}) {
  const requireComponent = require.context('./directives', false, /[\w-]+\.js$/)

  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const name = camelCase(fileName.replace(/\.\w+$/, ''))
    Vue.directive(name, componentConfig.default || componentConfig)
  })
}
