const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    await NewProject.findAll({
        order: [['createTime', 'DESC']]
    }).then(data => {
        res.send(Result.SUCCESS(data))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
