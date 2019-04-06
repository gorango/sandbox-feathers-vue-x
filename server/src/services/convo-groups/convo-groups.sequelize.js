
/* eslint quotes: 0 */
// Defines Sequelize model for service `convoGroups`. (Can be re-generated.)
const merge = require('lodash.merge')
const Sequelize = require('sequelize')
// eslint-disable-next-line no-unused-vars
const DataTypes = Sequelize.DataTypes
// !code: imports // !end
// !code: init // !end

let moduleExports = merge({},
  // !code: sequelize_model
  {
    uuid: {type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true},

    userUuid: {type: DataTypes.UUID, allowNull: false},
    convoUuid: {type: DataTypes.UUID, allowNull: false},

    status: {type: DataTypes.ENUM('live', 'muted', 'new', 'archived'), defaultValue: 'new'},

    createdAt: {type: DataTypes.DATE, defaultValue: Sequelize.NOW},
    updatedAt: {type: DataTypes.DATE, defaultValue: Sequelize.NOW}
  },
  // !end
  // !code: moduleExports // !end
)

// !code: exports // !end
module.exports = moduleExports

// !code: funcs // !end
// !code: end // !end
