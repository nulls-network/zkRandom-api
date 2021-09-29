const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const projectId = parseInt(req.query.projectId) || 0;

    await NewProject.findByPk(projectId).then(data => {
        res.send(Result.SUCCESS(data))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
