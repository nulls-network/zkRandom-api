const NewItem = require('../../model/NewItem')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    await NewItem.findAll({
        order: [['createTime', 'DESC']]
    }).then(data => {
        res.send(Result.SUCCESS(data))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
