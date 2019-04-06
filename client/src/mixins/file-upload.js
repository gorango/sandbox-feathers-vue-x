
export default {
  methods: {
    async onFileAdded ({target: {files}}, type) {
      const reader = new FileReader()
      const file = files[0]
      reader.readAsDataURL(file)
      return new Promise(resolve => {
        reader.onloadend = async () => {
          // const base64 = reader.result.substring(reader.result.indexOf(',') + 1)
          resolve(reader.result)
        }
      })
    }
  }
}
