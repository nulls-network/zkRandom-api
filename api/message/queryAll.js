const NewMessage = require('../../model/NewMessage')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const data = NewMessage.findAll();
    const result = Result.commonResult(data);

    res.status(200).json(result);
}
