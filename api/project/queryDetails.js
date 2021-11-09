const NewProject = require('../../model/NewProject')
const Penalty = require('../../model/Penalty')
const AddBound = require('../../model/AddBound')
const NewItem = require('../../model/NewItem')
const NewRandom = require('../../model/NewRandom')
const Result = require('../../constants/result')
const db = require('../../config/mysql')
const { QueryTypes } = require('sequelize')

module.exports = async (req, res) => {

    const projectId = parseInt(req.query.projectId) || 0;

    const data = await NewProject.findByPk(projectId)
    if (data === null) return res.send(Result.SUCCESS(data));

    const totalStaked = await AddBound.sum('payAmount', { where: { projectId: projectId } }) + data.depositAmt;
    const totalPenalty = await Penalty.sum('rewardAmount', { where: { projectId: projectId } });
    const totalBalance = totalStaked - totalPenalty;
    const tolerance = Math.min(totalBalance * 10 / data.depositAmt, 10);
    let unstaking = data.status === 1 ? totalBalance : 0;
    let unstaked = data.status === 2 ? totalBalance : 0;

    const penalties = await Penalty.count({ where: { projectId } })
    const randoms = await NewItem.count({ where: { projectId } })
    const items = await NewRandom.count({ where: { projectId } })

    // statistics
    let sql = 'select a.date,IFNULL(b.count,0) count  from ( SELECT CURDATE() AS date '
    for (let i = 1; i <= 29; i++) {
        sql += " union all SELECT DATE_SUB(CURDATE(), INTERVAL " + i + " DAY) AS date"
    }
    sql += ') a left join (select FROM_UNIXTIME(createTime / 1000,\'%Y-%m-%d\') date,count(1) count from newrandom where projectId = ? group by FROM_UNIXTIME(createTime / 1000,\'%Y-%m-%d\')) b on a.date = b.date '
    sql += ' order by date'
    const object = await db.query(sql, {
        replacements: [projectId],
        type: QueryTypes.SELECT
    })

    let statistics = []

    if (object) {
        for (let obj of object[0]) {
            statistics.push(obj.count)
        }
    }
    res.send(Result.SUCCESS({
        'projectID': data.projectId,
        'date': data.createTime,
        'staked': data.depositAmt,
        'adminAddress': data.oper,
        'totalStaked': totalStaked,
        'totalFine': totalPenalty,
        'unstaking': unstaking,
        'unstaked': unstaked,
        'toleranceTimes': tolerance,
        penalties, randoms, items, statistics
    }))

}
