const Penalty = require('../../model/Penalty')
const NewProject = require('../../model/NewProject')
const NewMessage = require('../../model/NewMessage')
const NewRandom = require('../../model/NewRandom')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const requestKey = req.query.requestKey || '';

    await Penalty.findByPk(requestKey.toString()).then(async data => {

        if (data === null) return res.send(Result.SUCCESS(data));

        const project = await NewProject.findByPk(data.projectId);
        const message = await NewMessage.findOne({ where : { requestKey } })
        const random = await NewRandom.findByPk(requestKey)

        res.send(Result.SUCCESS({
            'timestamp': data.createTime,
            'projectID': project.projectId,
            'projectName': project.name,
            'itemID': data.itemId,
            'nonce': message.key_nonce,
            'nonceKey': requestKey,
            'cumulativePenalty': data.penaltyTimes,
            'reportAddress': data.sender,
            'fine': data.rewardAmount,
            'rv':random.rv
        }))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
