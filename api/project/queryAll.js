const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const data = await NewProject.findAll({
        order:['createTime','DESC']
    });
    const result = Result.commonResult(data);

    res.status(200).json(result);
}
