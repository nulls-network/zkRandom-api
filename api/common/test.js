const sequelize = require("../../config/mysql")
const Result = require('../../constants/result')


module.exports = async (req, res) => {
    res.send(Result.SUCCESS({ result : 'ok' }))
}
