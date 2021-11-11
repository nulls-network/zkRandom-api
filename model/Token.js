const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql")

module.exports = sequelize.define('Token', {
    contract: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey : true
    },
    decimals: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    simpleName: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'token',
    timestamps: false
});

