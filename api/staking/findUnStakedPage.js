const db = require('../../config/mysql')
const Result = require('../../constants/result')
const { QueryTypes } = require('sequelize')

module.exports = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10
    const page = req.query.page ? parseInt(req.query.page) : 1

    const projectId = req.query.projectId

    if( isNaN(projectId) ){
        res.status(200).json(Result.SUCCESS({ count:0,rows:[] }))
        return
    }

    let sql = 'select '
        + ' a.blockNumber,a.logIndex,a.blockHash hash,a.oper unstakingAddress,a.unBondBalance value,a.unBondTime time, b.decimals, b.simpleName tokenName '
        + ' from newproject a left join token b on a.token = b.contract where a.projectId = ? and a.status = 2 '
    
    const params = []
    params.push(projectId)
    

    const count_sql = 'select count(1) from ( ' + sql + ' ) a '
    sql += ' order by a.unBondTime desc limit ?,? '

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