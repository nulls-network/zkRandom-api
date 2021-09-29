const Penalty = require('../../model/Penalty')
const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const requestKey = req.query.requestKey || 0;

    await Penalty.findByPk(requestKey).then(async data => {

        if (data === null) return res.send(Result.SUCCESS(data));

        const project = await NewProject.findByPk(data.projectId);
        //TODO
        const reporterAddress = 'reporterAddress';
        const fine = 0;
        res.send(Result.SUCCESS({
            'Timestamp': data.createTime,
            'Project ID': project.projectId,
            'Project Name': project.name,
            'Item ID': data.itemId,
            'requestKey': requestKey,
            'PenaltyTimes': data.penaltyTimes,
            'Reporter Address': reporterAddress,
            'Fine': fine,
            'Admin Address': project.oper,
        }))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
