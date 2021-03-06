const NewMessage = require('../../model/NewMessage')
const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const requestKey = req.query.requestKey || '';

    await NewMessage.findByPk(requestKey.toString()).then(async data => {

        if (data === null) return res.send(Result.SUCCESS(data));

        const project = await NewProject.findByPk(data.projectId);
        res.send(Result.SUCCESS({
            'requestKey': data.requestKey,
            'timestamp': data.createTime,
            'hV': data.hv,
            'hash': data.transactionHash,
            'playerAddress': data.origin,
            'projectId': project.projectId,
            'projectName': project.name,
            'itemId': data.itemId,
            'adminAddress': project.oper,
            'nonce':data.key_nonce,
            'blockNumber': data.blockNumber ,
            'logIndex': data.logIndex
        }))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
