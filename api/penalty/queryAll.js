const Penalty = require('../../model/Penalty')
const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    await Penalty.findAll({
        attributes: ['blockNumber', 'logIndex', 'blockHash', 'projectId', 'itemId', 'requestKey', 'createTime'],
        limit: limit,
        offset: (page - 1) * limit,
        order: [['createTime', 'DESC']]
    }).then(async data => {
        const resList = []
        for (let datum of data) {
            const project = await NewProject.findByPk(datum.projectId)
            //TODO
            const reportAddress = 'reporter';
            const fine = 0;
            resList.push({
                'blockNumber': datum.blockNumber,
                'logIndex': datum.logIndex,
                'Hash': datum.blockHash,
                'Project': project.name,
                'Item ID': datum.itemId,
                'requestKey': datum.requestKey,
                'Reporter Address': reportAddress,
                'Fine': fine,
                'Time': datum.createTime
            })
        }
        res.send(Result.SUCCESS(resList))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
