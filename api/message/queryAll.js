const NewMessage = require('../../model/NewMessage')
const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const projectId = parseInt(req.query.projectId);
    const options = {
        attributes: ['blockNumber', 'logIndex', 'blockHash', 'projectId', 'itemId', 'key', 'createTime'],
        limit: limit,
        offset: (page - 1) * limit,
        order: [['createTime', 'DESC']]
    }
    if (!isNaN(projectId)) {
        options.where = {
            projectId: projectId
        }
    }
    await NewMessage.findAll(options).then(async data => {
        const resList = []
        for (let datum of data) {
            const project = await NewProject.findByPk(datum.projectId)
            //TODO
            const playerAddress = 'nulls';
            resList.push({
                'blockNumber': datum.blockNumber,
                'logIndex': datum.logIndex,
                'Hash': datum.blockHash,
                'Project': project.name,
                'Item ID': datum.itemId,
                'Player Address': playerAddress,
                'requestKey': datum.key,
                'Time': datum.createTime
            })
        }
        res.send(Result.SUCCESS(resList))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
