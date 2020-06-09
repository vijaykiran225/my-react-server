function getAllMatches(req, res) {
    getProperController(req).getAllMatches(req, res);
}
function getMatchById(req, res) {
    getProperController(req).getMatchById(req, res);
}
function getMatchActivites(req, res) {
    getProperController(req).getMatchActivites(req, res);
}
function getMatchActivityById(req, res) {
    getProperController(req).getMatchActivityById(req, res);
}
function createMatch(req, res) {
    getProperController(req).createMatch(req, res);
}
function addActivityToMatch(req, res) {
    getProperController(req).addActivityToMatch(req, res);
}
function getAllPlayers(req, res) {
    getProperController(req).getAllPlayers(req, res);
}
function getPlayerById(req, res) {
    getProperController(req).getPlayerById(req, res);
}
function addPlayer(req, res) {
    getProperController(req).addPlayer(req, res);
}

function getProperController(req) {
    if (req.params.sportName === 'cricket') {
        return require("./cricketController")
    } else if (req.params.sportName === 'football') {
        return require("./footballController")
    }
}

module.exports = {
    getAllMatches,
    getMatchById,
    getMatchActivites,
    getMatchActivityById,
    createMatch,
    addActivityToMatch,
    getAllPlayers,
    getPlayerById,
    addPlayer
}