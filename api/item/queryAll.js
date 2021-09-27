const NewItem = require('../../model/NewItem')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const data = NewItem.findAll();
    const result = Result.commonResult(data);

    res.status(200).json(result);
}
