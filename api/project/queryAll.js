const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const data = NewProject.findAll();
    const result = Result.commonResult(data);

    res.status(200).json(result);
}
