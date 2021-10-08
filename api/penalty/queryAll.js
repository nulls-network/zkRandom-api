const Penalty = require('../../model/Penalty')
const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const projectId = parseInt(req.query.projectId);
    const itemId = parseInt(req.query.itemId);
    const options = {
        attributes: ['blockNumber', 'logIndex', 'blockHash', 'projectId', 'itemId', 'requestKey', 'rewardAmount', 'sender', 'createTime'],
        limit: limit,
        offset: (page - 1) * limit,
        order: [['createTime', 'DESC']]
    };
    if (!isNaN(projectId)) {
        options.where = {projectId: projectId}
    }
    if (!isNaN(itemId)) {
        options.where = {itemId: itemId}
    }

    await Penalty.findAll(options).then(async data => {
        const resList = []
        for (let datum of data) {
            const project = await NewProject.findByPk(datum.projectId)
            resList.push({
                'blockNumber': datum.blockNumber,
                'logIndex': datum.logIndex,
                'hash': datum.blockHash,
                'projectId': project.projectId,
                'project': project.name,
                'itemID': datum.itemId,
                'requestKey': datum.requestKey,
                'reporterAddress': datum.sender,
                'fine(USDT)': datum.rewardAmount,
                'time': datum.createTime
            })
        }
        res.send(Result.SUCCESS(resList))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
