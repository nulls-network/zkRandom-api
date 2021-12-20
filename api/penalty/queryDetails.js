const Penalty = require('../../model/Penalty')
const NewProject = require('../../model/NewProject')
const NewMessage = require('../../model/NewMessage')
const NewRandom = require('../../model/NewRandom')
const Token = require('../../model/Token')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const requestKey = req.query.requestKey || '';

    await Penalty.findByPk(requestKey.toString()).then(async data => {

        if (data === null) return res.send(Result.SUCCESS(data));

        const project = await NewProject.findByPk(data.projectId);
        const message = await NewMessage.findOne({ where: { requestKey } })
        const random = await NewRandom.findByPk(requestKey)
        const token = await Token.findByPk(data.token)

        res.send(Result.SUCCESS( {
            'timestamp': data.createTime,
            'projectId': project.projectId,
            'projectName': project.name,
            'itemId': data.itemId,
            'nonce': message.key_nonce,
            'nonceKey': requestKey,
            'cumulativePenalty': data.penaltyTimes,
            'reportAddress': data.sender,
            'fine(USDT)': data.rewardAmount,
            'rv': random ? random.rv : null,
            'decimals': token.decimals,
            'tokenName': token.simpleName,
            'blockNumber': data.blockNumber ,
            'logIndex': data.logIndex
        } ))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
