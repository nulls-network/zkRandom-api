const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const projectId = parseInt(req.query.projectId) || 0;

    await NewProject.findByPk(projectId).then(data => {

        if (data === null) return res.send(Result.SUCCESS(data));

        //TODO
        const staked = 0;
        const totalFine = 0;
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
