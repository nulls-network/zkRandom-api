const NewItem = require('../../model/NewItem')
const NewProject = require('../../model/NewProject')
const Penalty = require('../../model/Penalty')
const PublishPublicKey = require('../../model/PublishPublicKey')
const Token = require('../../model/Token')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const itemId = parseInt(req.query.itemId) || 0;

    await NewItem.findByPk(itemId).then(async data => {

        if (data === null) return res.send(Result.SUCCESS(data));

        const project = await NewProject.findByPk(data.projectId);
        const penalties = await Penalty.count({ where: { itemId: itemId } });
        const totalFine = await Penalty.sum('rewardAmount', { where: { itemId: itemId } });
        const pen = await Penalty.findOne({ where: { itemId: itemId } })
        const privateKey = await PublishPublicKey.findOne({ attributes: ['prikey'], where: { itemId: itemId } });
        const token = await Token.findByPk(pen.token)

        res.send(Result.SUCCESS({
            'timestamp': data.createTime,
            'projectID': project.projectId,
            'projectName': project.name,
            'adminAddress': project.oper,
            'itemID': data.itemId,
            'penalties': penalties,
            'totalFine': totalFine,
            'publicKey': data.pubkey,
            'privateKey': privateKey,
            'decimals': token.decimals,
            'tokenName': token.simpleName
        }))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
