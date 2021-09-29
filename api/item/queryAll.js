const NewItem = require('../../model/NewItem')
const NewProject = require('../../model/NewProject')
const Penalty = require('../../model/Penalty')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    await NewItem.findAll({
        attributes: ['blockNumber', 'logIndex', 'blockHash', 'projectId', 'itemId', 'createTime'],
        limit: limit,
        offset: (page - 1) * limit,
        order: [['createTime', 'DESC']]
    }).then(async data => {
        const resList = []
        for (let datum of data) {
            const project = await NewProject.findByPk(datum.projectId)
            const penalties = await Penalty.count({where: {itemId: datum.itemId}})
            //TODO
            // To Be Completed Api
            const randoms = 0;
            resList.push({
                'blockNumber': datum.blockNumber,
                'logIndex': datum.logIndex,
                'Hash': datum.blockHash,
                'Project': project.name,
                'Admin Address': project.oper,
                'Item ID': datum.itemId,
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
