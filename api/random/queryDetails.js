const NewRandom = require('../../model/NewRandom')
const NewMessage = require('../../model/NewMessage')
const NewProject = require('../../model/NewProject')
const NewItem = require('../../model/NewItem')
const PublishPublicKey = require('../../model/PublishPublicKey')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const requestKey = req.query.requestKey || '';

    await NewRandom.findByPk(requestKey.toString()).then(async data => {

        if (data === null) return res.send(Result.SUCCESS(data));

        const project = await NewProject.findByPk(data.projectId);
        const message = await NewMessage.findByPk(requestKey.toString());

        const newItem = await NewItem.findByPk(data.itemId)
        const privateKey = await PublishPublicKey.findOne({ attributes: ['prikey'], where: { itemId: data.itemId } });

        res.send(Result.SUCCESS({
            'logIndex': data.logIndex,
            'blockNumber': data.blockNumber,
            'rV': data.rv,
            'requestKey': data.key,
            'timestamp': data.createTime,
            'hV': message.hv,
            'nonce': message.key_nonce,
            'hash': data.transactionHash,
            'playerAddress': message.origin,
            'projectId': project.projectId,
            'projectName': project.name,
            'itemId': data.itemId,
            'adminAddress': project.oper,
            'publicKey': newItem.pubkey,
            'privateKey': privateKey

        }))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
