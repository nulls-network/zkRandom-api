const NewProject = require('../../model/NewProject')
const Penalty = require('../../model/Penalty')
const NewItem = require('../../model/NewItem')
const NewRandom = require('../../model/NewRandom')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const options = {
        attributes: ['blockNumber', 'logIndex', 'projectId', 'name', 'oper', 'depositAmt', 'createTime'],
        limit: limit,
        offset: (page - 1) * limit,
        order: [['createTime', 'DESC']]
    };

    await NewProject.findAll(options).then(async data => {
        const resList = []
        for (let datum of data) {
            const items = await NewItem.count({where: {projectId: datum.projectId}})
            const penalties = await Penalty.count({where: {projectId: datum.projectId}})
            const randoms = await NewRandom.count({where: {projectId: datum.projectId}})
            resList.push({
                'blockNumber': datum.blockNumber,
                'logIndex': datum.logIndex,
                'projectId': datum.projectId,
                'project': datum.name,
                'adminAddress': datum.oper,
                'staked': datum.depositAmt,
                'items': items,
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
