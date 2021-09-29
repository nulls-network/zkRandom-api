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
            const items = await NewItem.count({where: {projectId: datum.projectId}})
            const penalties = await Penalty.count({where: {projectId: datum.projectId}})
            //TODO
            const staked = 0;
            const randoms = 0;
            resList.push({
                'blockNumber': datum.blockNumber,
                'logIndex': datum.logIndex,
                'ProjectId': datum.projectId,
                'Project': datum.name,
                'Admin Address': datum.oper,
                'Staked': staked,
                'Items': items,
                'Penalties': penalties,
                'Randoms': randoms,
                'Time': datum.createTime
            })
        }
        res.send(Result.SUCCESS(resList))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
