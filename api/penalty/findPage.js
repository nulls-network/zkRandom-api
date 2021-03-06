const db = require('../../config/mysql')
const Result = require('../../constants/result')
const { QueryTypes } = require('sequelize')

module.exports = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10
    const page = req.query.page ? parseInt(req.query.page) : 1

    const projectId = req.query.projectId
    const itemId = req.query.itemId

    let sql = 'select '
        + ' a.blockNumber, a.logIndex, a.transactionHash hash, a.projectId, b.name project, a.itemId, a.requestKey,a.rewardAmount \'fine(USDT)\', a.sender reporterAddress, a.createTime time, c.decimals,c.simpleName tokenName, d.key_nonce nonce '
        + ' from Penalty a left join newproject b on a.projectId = b.projectId left join token c on a.token = c.contract left join newmessage d on d.requestKey = a.requestKey where 1=1 '

    const params = []
    if (!isNaN(projectId)) {
        sql += ' and a.projectId = ?'
        params.push(projectId)
    }
    if (!isNaN(itemId)) {
        sql += ' and a.itemId = ?'
        params.push(itemId)
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