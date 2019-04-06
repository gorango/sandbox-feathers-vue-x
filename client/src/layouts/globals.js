import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default function (Vue) {
  // see /src/components/globals for better comments
  const requireComponent = require.context('.', false, /[\w-]+\.vue$/)

  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)
    const componentName = upperFirst(camelCase(fileName.replace(/\.\w+$/, 'Layout')))
    Vue.component(componentName, componentConfig.default || componentConfig)
  })
}
