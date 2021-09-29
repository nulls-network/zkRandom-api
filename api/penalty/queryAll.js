const Penalty = require('../../model/Penalty')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    await Penalty.findAll({
        order: [['createTime', 'DESC']]
    }).then(data => {
        res.send(Result.SUCCESS(data))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
