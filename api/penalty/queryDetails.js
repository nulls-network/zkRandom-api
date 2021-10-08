const Penalty = require('../../model/Penalty')
const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const requestKey = req.query.requestKey || '';

    await Penalty.findByPk(requestKey.toString()).then(async data => {

        if (data === null) return res.send(Result.SUCCESS(data));

        const project = await NewProject.findByPk(data.projectId);

        res.send(Result.SUCCESS({
            'timestamp': data.createTime,
            'projectID': project.projectId,
            'projectName': project.name,
            'itemID': data.itemId,
            'requestKey': requestKey,
            'penaltyTimes': data.penaltyTimes,
            'reporterAddress': data.sender,
            'fine': data.rewardAmount,
        }))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
