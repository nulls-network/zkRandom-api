const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql")

module.exports = sequelize.define('AddBound', {
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
        allowNull: true,
        primaryKey: true
    },
    logIndex: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    payAmount: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    penaltyTimes: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    createTime: {
        type: DataTypes.TIME,
        allowNull: true
    }
}, {
    tableName: 'AddBound',
    timestamps: false
});
