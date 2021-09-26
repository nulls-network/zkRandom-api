/*
 * Define NewProject Model
 */

const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql")

const NewProject = sequelize.define('NewProject', {
    blockNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    blockHash: {
        type: DataTypes.STRING,
        allowNull: true
    },
    transactionIndex: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    transactionHash: {
        type: DataTypes.STRING,
        allowNull: true
    },
    logIndex: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    oper: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createTime: {
        type: DataTypes.TIME,
        allowNull: true
    }
}, {
    tableName: 'NewProject',
    timestamps: false
});
module.exports = NewProject
