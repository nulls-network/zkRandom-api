const NewProject = require('../../model/NewProject')
const NewItem = require('../../model/NewItem')
const Penalty = require('../../model/Penalty')
const Result = require('../../constants/result')

module.exports = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    await NewProject.findAll({
        attributes: ['blockNumber', 'logIndex', 'projectId', 'name', 'oper', 'createTime'],
        limit: limit,
        offset: (page - 1) * limit,
        order: [['createTime', 'DESC']]
    }).then(async data => {
        const resList = []
        for (let datum of data) {
            const projectId = datum.projectId;
            const items = await NewItem.count({
                where: {
                    projectId: projectId
                }
            })
            resList.push({
                'blockNumber': datum.blockNumber,
                'logIndex': datum.logIndex,
                'Project': datum.name,
                'Admin Address': datum.oper,
                'Staked': 0,
                'Items': items,
                'Penalties': 0,
                'Randoms': 0,
                'Time': datum.createTime
            })
        }
        res.send(Result.SUCCESS(resList))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
