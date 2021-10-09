const NewProject = require('../../model/NewProject')
const Penalty = require('../../model/Penalty')
const AddBound = require('../../model/AddBound')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const projectId = parseInt(req.query.projectId) || 0;

    await NewProject.findByPk(projectId).then(async data => {

        if (data === null) return res.send(Result.SUCCESS(data));

        const totalStaked = await AddBound.sum('payAmount', {where: {projectId: projectId}}) + data.depositAmt;
        const totalPenalty = await Penalty.sum('rewardAmount', {where: {projectId: projectId}});
        const totalBalance = totalStaked - totalPenalty;
        const tolerance = Math.min(totalBalance * 10 / data.depositAmt, 10);
        let unstaking = data.status === 1 ? totalBalance : 0;
        let unstaked = data.status === 2 ? totalBalance : 0;

        res.send(Result.SUCCESS({
            'projectID': data.projectId,
            'date': data.createTime,
            'staked': data.depositAmt,
            'adminAddress': data.oper,
            'totalStaked': totalStaked,
            'totalFine': totalPenalty,
            'unstaking': unstaking,
            'unstaked': unstaked,
            'toleranceTimes': tolerance
        }))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
