const NewProject = require('../../model/NewProject')
const NewItem = require('../../model/NewItem')
const NewMessage = require('../../model/NewMessage')
const Penalty = require('../../model/Penalty')
const Result = require('../../constants/result')

module.exports = async (req, res) => {
    const projectId = parseInt(req.query.projectId);
    const itemId = parseInt(req.query.itemId);
    const options = {distinct: true,}
    if (!isNaN(projectId)) {
        options.where = {projectId: projectId}
    }
    if (!isNaN(itemId)) {
        options.where = {itemId: itemId}
    }
    const projects = await NewProject.count();
    const items = await NewItem.count(options);
    const nonces = await NewMessage.count(options);
    const penalties = await NewProject.count(options);

    //TODO
    const address = 0;
    const randoms = 0;
    res.send(Result.SUCCESS({
        'Projects': projects,
        'Items': items,
        'Nonces': nonces,
        'Randoms': randoms,
        'Penalties': penalties,
        'Player Address': address,
    }))
}
