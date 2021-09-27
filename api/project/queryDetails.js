const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const projectId = parseInt(req.query.projectId) || 0;

    const data = await NewProject.findOne({
        where: {
            projectId: projectId
        }
    });
    const result = Result.commonResult(data);

    res.status(200).json(result);
}
