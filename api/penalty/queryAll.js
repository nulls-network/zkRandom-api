const Penalty = require('../../model/Penalty')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const data = Penalty.findAll();
    const result = Result.commonResult(data);

    res.status(200).json(result);
}
