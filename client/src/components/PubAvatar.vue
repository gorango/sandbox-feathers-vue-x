<template lang="pug">
  .rounded-full.bg-cover.bg-center.bg-primary(
    :class='sizeClass',
    :style='{backgroundImage: `url(${avatar})`, backgroundColor: `white`}'
  )
</template>

<script>
const sizes = {
  xs: '8',
  sm: '10',
  md: '16',
  lg: '32',
  xl: '48'
}

export default {
  props: {
    avatar: {
      type: String,
      default: '' // TODO: make default profile placeholder
    },
    size: {
      type: String,
      default: 'sm'
    }
  },

  computed: {
    sizeClass () {
      const s = sizes[this.size]
      return `h-${s} w-${s}`
    }
  }
}
</script>
