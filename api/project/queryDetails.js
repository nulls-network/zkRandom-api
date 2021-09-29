const NewProject = require('../../model/NewProject')
const TotalFine = require('../penalty/totalFine')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const projectId = parseInt(req.query.projectId) || 0;

    await NewProject.findByPk(projectId).then(async data => {
        //TODO
        const staked = 0;
        const totalFine = await TotalFine();
        res.send(Result.SUCCESS({
            'ProjectID': data.projectId,
            'Date': data.createTime,
            'Staked': staked,
            'Admin Address': data.oper,
            'Total Fine': totalFine
        }))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
