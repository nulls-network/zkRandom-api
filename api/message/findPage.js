const db = require('../../config/mysql')
const Result = require('../../constants/result')
const { QueryTypes } = require('sequelize')

module.exports = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10
    const page = req.query.page ? parseInt(req.query.page) : 1
    const projectId = req.query.projectId
    const itemId = req.query.itemId
    const address = req.query.address

    let sql = 'select '
        + ' a.blockNumber, a.logIndex, a.blockHash hash, a.projectId, b.name project, a.itemID, a.origin playerAddress, a.requestKey, a.createTime time, a.key_nonce nonce '
        + ' from newmessage a left join newproject b on a.projectId = b.projectId where 1=1'

    const params = []
    if (!isNaN(projectId)) {
        sql += ' and a.projectId = ?'
        params.push( projectId )
    }
    if (!isNaN(itemId)) {
        sql += ' and a.itemId = ?'
        params.push( itemId )
    }
    if (!isNaN(address)) {
        sql += ' and a.origin = ?'
        params.push( address )
    }

    const count_sql = 'select count(1) from ( ' + sql + ' ) a '
    sql += ' order by a.createTime desc limit ?,? '

    const replacements = [].concat(params)
    replacements.push((page - 1) * limit)
    replacements.push(limit)
    let list = await db.query(sql, {
        replacements,
        type: QueryTypes.SELECT
    })
    let count = await db.query(count_sql, {
        replacements: params,
        type: QueryTypes.SELECT
    })
    let data = {
        count: count[0]['count(1)'],
        row: list
    }
    res.status(200).json(Result.SUCCESS(data))
}