const NewItem = require('../../model/NewItem')
const NewProject = require('../../model/NewProject')
const NewRandom = require('../../model/NewRandom')
const Penalty = require('../../model/Penalty')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const projectId = parseInt(req.query.projectId);
    const options = {
        attributes: ['blockNumber', 'logIndex', 'blockHash', 'projectId', 'itemId', 'createTime'],
        limit: limit,
        offset: (page - 1) * limit,
        order: [['createTime', 'DESC']]
    }
    if (!isNaN(projectId)) {
        options.where = {projectId: projectId}
    }

    await NewItem.findAll(options).then(async data => {
        const resList = []
        for (let datum of data) {
            const project = await NewProject.findByPk(datum.projectId)
            const penalties = await Penalty.count({where: {itemId: datum.itemId}})
            const randoms = await NewRandom.count({where: {itemId: datum.itemId}})
            resList.push({
                'blockNumber': datum.blockNumber,
                'logIndex': datum.logIndex,
                'hash': datum.blockHash,
                'projectId': project.projectId,
                'project': project.name,
                'adminAddress': project.oper,
                'itemID': datum.itemId,
                'penalties': penalties,
                'randoms': randoms,
                'time': datum.createTime
            })
        }
        res.send(Result.SUCCESS(resList))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
