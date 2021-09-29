const NewItem = require('../../model/NewItem')
const NewProject = require('../../model/NewProject')
const Penalty = require('../../model/Penalty')
const PublishPublicKey = require('../../model/PublishPublicKey')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const itemId = parseInt(req.query.itemId) || 0;

    await NewItem.findByPk(itemId).then(async data => {
        const project = await NewProject.findByPk(data.projectId);
        const penalties = await Penalty.count({where: {itemId: itemId}});
        const privateKey = await PublishPublicKey.findOne({attributes: ['prikey'], where: {itemId: itemId}});
        //TODO
        const totalFine = 0;
        res.send(Result.SUCCESS({
            'Project ID': project.projectId,
            'Project Name': project.name,
            'Admin Address': project.oper,
            'Item ID': data.itemId,
            'Penalties': penalties,
            'TotalFine': totalFine,
            'Public Key': data.pubkey,
            'Private Key': privateKey.prikey || 0,
            'Timestamp': data.createTime
        }))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
