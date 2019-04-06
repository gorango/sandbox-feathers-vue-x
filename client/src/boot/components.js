import makeGlobalLayouts from '@/layouts/globals'
import makeGlobalComponents from '@/components/globals'

export default ({ Vue }) => {
  makeGlobalLayouts(Vue)
  makeGlobalComponents(Vue)
}
