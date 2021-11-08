const db = require('../../config/mysql')
const Result = require('../../constants/result')

module.exports = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1

    const projectId = req.query.projectId
    const itemId = req.query.itemId

    let sql = 'select '
        +' a.blockNumber,a.logIndex,a.blockHash,a.projectId,a.itemId,b.oper,a.rv,a.createTime time '+
        +' from newrandom a left join newproject b on a.projectId = b.projectId where 1=1 '

    if (!isNaN(projectId)) {
        sql += ' and projectId = ? '
    }
    if (!isNaN(itemId)) {
        sql += ' and itemId = ? '
    }
    const count_sql = 'select count(1) from ( ' + sql + ' )'
    sql += ' order by a.createTime DESC limit ?,? '

    let list = await db.query(sql, {
        replacements: [projectId, itemId, (page - 1) * limit, limit],
        type: QueryTypes.SELECT
    })
    let count = await db.query(count_sql, {
        replacements: [projectId, itemId],
        type: QueryTypes.SELECT
    })
    let data = {
        count: count[0]['count(1)'],
        row: list
    }
    res.status(200).json(result.success(data));
    
}