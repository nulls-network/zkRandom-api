const sequelize = require("../../config/mysql")
const Result = require('../../constants/result')


// statistics home page last 30 days data
module.exports = async (req, res) => {


    let sql = 'select a.date,IFNULL(b.count,0) count  from ( SELECT CURDATE() AS date '
    for( let i = 1; i <= 29; i ++ ){
        sql += " union all SELECT DATE_SUB(CURDATE(), INTERVAL "+ i +" DAY) AS date"
    }
    sql += ') a left join (select FROM_UNIXTIME(createTime / 1000,"%Y-%m-%d") date,count(1) count from NewRandom group by FROM_UNIXTIME(createTime / 1000,"%Y-%m-%d")) b on a.date = b.date order by date'

    const object = await sequelize.query(sql,{ raw : true })


    let result = []

    if( object ){
        for( let obj of object[0] ){
            result.push( obj.count )
        }
    }


    res.send(Result.SUCCESS(result))

}
