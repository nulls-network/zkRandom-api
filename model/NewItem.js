const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql")

const NewItem = sequelize.define('NewItem', {
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
        allowNull: true
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    },
    pubkey: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createTime: {
        type: DataTypes.TIME,
        allowNull: true
    }
}, {
    tableName: 'NewItem',
    timestamps: false
});
module.exports = NewItem
