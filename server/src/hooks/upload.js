const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const projectName = require('../../package.json').name
const getFolderName = t => `${projectName}/${process.env.NODE_ENV}/${t}s`

module.exports = () => async context => {
  const {type, dataUrl, userUuid} = context.data

  if (type && dataUrl) {
    const options = {
      folder: getFolderName(type),
      public_id: userUuid
    }

    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        dataUrl,
        options,
        (error, result) => {
          if (error) return reject(error)

          const {secure_url: url} = result
          context.data[type] = url
          resolve(context)
        }
      )
    }).catch(error => {
      // TODO: handle error
      console.log(error) // eslint-disable-line
      context.data[type] = undefined
      return context
    })
  }

  if (type && type ==='avatar' && context.data.hasOwnProperty('avatar')) {
    const {avatar} = context.params.user
    const fileName = avatar.split('/').reverse()[0].split('.')[0]
    const destination = `${getFolderName(type)}/${fileName}`

    return new Promise(resolve => {
      cloudinary.v2.api.delete_resources(destination, error => {
        if (error) {
          context.data.avatar = avatar
        }
        resolve(context)
      })
    })
  }

}
