const NewMessage = require('../../model/NewMessage')
const NewProject = require('../../model/NewProject')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const requestKey = req.query.requestKey || 0;

    await NewMessage.findByPk(requestKey).then(async data => {

        if (data === null) return res.send(Result.SUCCESS(data));

        const project = await NewProject.findByPk(data.projectId);
        //TODO
        const playerAddress = 'playerAddress';
        res.send(Result.SUCCESS({
            'requestKey': data.key,
            'Timestamp': data.createTime,
            'HV': data.hv,
            'Hash': data.transactionHash,
            'Player Address': playerAddress,
            'Project ID': project.projectId,
            'Project Name': project.name,
            'Item ID': data.itemId,
            'Admin Address': project.oper,
        }))
    }).catch(err => {
        res.send(Result.ERROR(err))
    });

}
