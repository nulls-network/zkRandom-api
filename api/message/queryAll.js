const NewMessage = require('../../model/NewMessage')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const data = await NewMessage.findAll({
        order:['createTime','DESC']
    });
    const result = Result.commonResult(data);

    res.status(200).json(result);
}
