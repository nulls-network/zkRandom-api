const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql")

module.exports = sequelize.define('PublishPublicKey', {
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
    prikey: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createTime: {
        type: DataTypes.TIME,
        allowNull: true
    }
}, {
    tableName: 'PublishPublicKey',
    timestamps: false
});

