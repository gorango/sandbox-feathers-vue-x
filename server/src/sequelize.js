const Sequelize = require('sequelize')
let { Op } = Sequelize

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
}

module.exports = function (app) {
  let connectionString = app.get('postgres')
  let sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    operatorsAliases,
    define: {
      freezeTableName: true
    }
  })

  let oldSetup = app.setup

  app.set('sequelizeClient', sequelize)

  app.setup = function (...args) {
    let result = oldSetup.apply(this, args)

    // Set up data relationships
    const models = sequelize.models
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models)
      }
    })

    // Sync to the database
    // NOTE: the following initialization will change in v4.0 back to:
    app.set('sequelizeSync', sequelize.sync())

    return result
  }
}
