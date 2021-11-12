const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql")

module.exports = sequelize.define('NewMessage', {
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
    },
    requestKey: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: true
    },
    hv: {
        type: DataTypes.STRING,
        allowNull: true
    },
    callback: {
        type: DataTypes.STRING,
        allowNull: true
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
    key_nonce: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    key_itemId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    key_hv: {
        type: DataTypes.STRING,
        allowNull: true
    },
    key_callback: {
        type: DataTypes.STRING,
        allowNull: true
    },
    key_created: {
        type: DataTypes.STRING,
        allowNull: true
    },
    key_isDead: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: 'newmessage',
    timestamps: false
});

