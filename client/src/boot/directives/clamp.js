import clamp from '@/utils/clamp'

const handleClamp = (el, binding) => clamp(el, {clamp: binding.value})

const name = 'clamp'
const clampDirective = {
  name,
  inserted: handleClamp,
  update: handleClamp,
  unbind: handleClamp
}

export default clampDirective
