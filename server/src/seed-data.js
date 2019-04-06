/* eslint-disable no-console */
const { join } = require('path')
const { readJsonFileSync } = require('@feathers-plus/test-utils')

const doSeedServices = ['--seed', '-s'].some(str => process.argv.slice(2).includes(str))
const fakeData = readJsonFileSync(join(__dirname, '../seeds/fake-data.json')) || {}

module.exports = async function (app) {
  if (!doSeedServices) return
  if (!Object.keys(fakeData).length) {
    console.log('Cannot seed services as seed/fake-data.json doesn\'t have seed data.')
    process.exit()
  }

  await Object.keys(fakeData).reduce(async (promise, serviceName) => {
    return promise.then(async () => {
      const [name, path] = [serviceName, `/${serviceName}`]

      if (fakeData[name] && fakeData[name].length) {
        try {
          const service = app.service(path)

          const deleted = await service.remove(null)
          let result = []
          for (const data of fakeData[name]) {
            result.push(await service.create(data))
          }
          console.log(`Seeded service "${name}":\n - deleting ${deleted.length}\n - adding ${result.length}`)
          return Promise.resolve()
        } catch (err) {
          console.log(`Error on seeding service "${name}"`, err.message)
          return Promise.resolve()
        }
      } else {
        console.log(`Not seeding service "${name}".\n - No seed data`)
        return Promise.resolve()
      }
    })
  }, Promise.resolve())

  process.exit()
}
