const NewProject = require('../../model/NewProject')
const NewItem = require('../../model/NewItem')
const NewMessage = require('../../model/NewMessage')
const Penalty = require('../../model/Penalty')
const NewRandom = require('../../model/NewRandom')
const Result = require('../../constants/result')

// statistics home page data
module.exports = async (req, res) => {

    const projectId = parseInt(req.query.projectId);
    const itemId = parseInt(req.query.itemId);
    const options = {}
    if (!isNaN(projectId)) {
        options.where = {projectId: projectId}
    }
    if (!isNaN(itemId)) {
        options.where = {itemId: itemId}
    }
    const projects = await NewProject.count();
    const items = await NewItem.count(options);
    const nonces = await NewMessage.count(options);
    const penalties = await Penalty.count(options);
    const randoms = await NewRandom.count(options);
    const addresses = await NewMessage.count({col: 'origin', distinct: true});

    res.send(Result.SUCCESS({
        'projects': projects,
        'items': items,
        'nonces': nonces,
        'randoms': randoms,
        'penalties': penalties,
        'playerAddress': addresses,
    }))
}
