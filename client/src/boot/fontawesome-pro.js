import 'assets/icons/fontawesome-pro/css/fontawesome.min.css'
import 'assets/icons/fontawesome-pro/css/light.min.css'

import faIconSet from 'assets/icons/fontawesome-pro'

export default ({Vue}) => {
  const {$q} = Vue.prototype
  if ($q) {
    Vue.prototype.$q.iconSet = faIconSet
  }
}
