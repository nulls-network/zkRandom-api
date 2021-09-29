const NewMessage = require('../../model/NewMessage')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    await NewMessage.findAll({
        order: [['createTime', 'DESC']]
    }).then(data => {
        res.send(Result.SUCCESS(data))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
