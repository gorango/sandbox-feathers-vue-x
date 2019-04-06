
export default {
  methods: {
    profileColor (date) {
      const classes = [
        'red',
        'pink',
        'purple',
        'deep-purple',
        'indigo',
        'light-blue',
        'cyan',
        'teal',
        'green',
        'light-green',
        'lime',
        'amber',
        'orange',
        'deep-orange',
        'brown'
      ]
      const index = new Date(date) % (classes.length - 1)
      return `${classes[index]}`
    }
  }
}
