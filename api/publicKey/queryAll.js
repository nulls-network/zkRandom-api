const PublishPublicKey = require('../../model/PublishPublicKey')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const data = await PublishPublicKey.findAll({
        order: [['createTime', 'DESC']]
    });
    const result = Result.commonResult(data);

    res.status(200).json(result);
}
