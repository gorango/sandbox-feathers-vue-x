// Defines Sequelize model for service `users`. (Can be re-generated.)
const merge = require('lodash.merge')
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

let moduleExports = merge({},
  {
    uuid: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true},

    googleId: {type: DataTypes.STRING},
    facebookId: {type: DataTypes.STRING},

    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.TEXT, allowNull: false},
    birthday: {type: DataTypes.DATE},
    permissions: {type: DataTypes.ENUM('basic', 'admin'), defaultValue: 'basic'},
    username: {type: DataTypes.STRING, unique: true},
    avatar: {type: DataTypes.TEXT},

    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},

    isVerified: {type: DataTypes.BOOLEAN},
    verifyToken: {type: DataTypes.TEXT},
    verifyShortToken: {type: DataTypes.STRING},
    verifyExpires: {type: DataTypes.DATE},
    verifyChanges: {type: DataTypes.JSON},
    resetToken: {type: DataTypes.TEXT},
    resetShortToken: {type: DataTypes.STRING},
    resetExpires: {type: DataTypes.DATE},

    createdAt: {type: DataTypes.DATE, defaultValue: Sequelize.NOW},
    updatedAt: {type: DataTypes.DATE, defaultValue: Sequelize.NOW}
  },
)

module.exports = moduleExports
