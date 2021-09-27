const NewItem = require('../../model/NewItem')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const data = await NewItem.findAll({
        order: [['createTime', 'DESC']]
    });
    const result = Result.commonResult(data);

    res.status(200).json(result);
}
