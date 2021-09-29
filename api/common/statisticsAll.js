const NewProject = require('../../model/NewProject')
const NewItem = require('../../model/NewItem')
const NewMessage = require('../../model/NewMessage')
const Penalty = require('../../model/Penalty')
const Result = require('../../constants/result')

module.exports = async (req, res) => {

    const projects = await NewProject.count();
    const items = await NewItem.count();
    const nonces = await NewMessage.count();
    const penalties = await NewProject.count();

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
