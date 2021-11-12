const db = require('../../config/mysql')
const Result = require('../../constants/result')
const { QueryTypes } = require('sequelize')

module.exports = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10
    const page = req.query.page ? parseInt(req.query.page) : 1

    const address = req.query.address
    if (isNaN(address)) {
        res.status(200).json(Result.SUCCESS({ count : 0, row : [] }))
        return
    }

    let sql = 'select '
        + ' a.blockNumber,a.logIndex,a.transactionHash hash,a.itemId,b.key_nonce nonce,a.sender reportAddress,a.rewardAmount \'fine(USDT)\',a.createTime time, c.decimals,c.simpleName tokenName,a.requestKey '
        + ' from penalty a left join newmessage b on a.requestKey = b.requestKey left join token c on a.token = c.contract where 1=1 '

    const params = []
    sql += ' and a.sender = ?'
    params.push(address)

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