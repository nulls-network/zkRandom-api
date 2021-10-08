const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql")

module.exports = sequelize.define('Penalty', {
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
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    penaltyTimes: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    balance: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    requestKey: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rewardAmount: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    createTime: {
        type: DataTypes.TIME,
        allowNull: true
    }
}, {
    tableName: 'Penalty',
    timestamps: false
});


