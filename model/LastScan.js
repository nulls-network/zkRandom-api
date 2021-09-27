const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql")

const LastScan = sequelize.define('LastScan', {
    lastScanNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
    }
}, {
    tableName: 'LastScan',
    timestamps: false
});
module.exports = LastScan
