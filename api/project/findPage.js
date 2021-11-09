const db = require('../../config/mysql')
const Result = require('../../constants/result')
const Penalty = require('../../model/Penalty')
const NewItem = require('../../model/NewItem')
const NewRandom = require('../../model/NewRandom')
const { QueryTypes } = require('sequelize')

module.exports = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10
    const page = req.query.page ? parseInt(req.query.page) : 1

    let sql = 'select '
        + ' a.blockNumber,a.logIndex,a.projectId,a.name project,a.oper adminAddress,a.depositAmt staked,a.createTime time, '
        + ' (select count(1) from newitem where projectId = a.projectId) items,'
        + ' (select count(1) from Penalty where projectId = a.projectId) penalties,'
        + ' (select count(1) from NewRandom where projectId = a.projectId) randoms'
        + ' from newproject a '

    const count_sql = 'select count(1) from ( ' + sql + ' ) a '
    sql += ' order by a.createTime desc limit ?,? '

    const replacements = []
    replacements.push((page - 1) * limit)
    replacements.push(limit)
    let list = await db.query(sql, {
        replacements,
        type: QueryTypes.SELECT
    })
    let count = await db.query(count_sql, {
        replacements: [],
        type: QueryTypes.SELECT
    })
    let data = {
        count: count[0]['count(1)'],
        row: list
    }
    res.status(200).json(Result.SUCCESS(data))
}