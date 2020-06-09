
let mongoose = require('mongoose');

mongoose.connect("mongodb://root:example@localhost:27017/football?authSource=admin", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB ...'))
    .catch(err => {
        console.error('Could not connect to MongoDB:‌');
        // serv.close();
    });

function getAllMatches(req, res) {

}
function getMatchById(req, res) {

}
function getMatchActivites(req, res) {

}
function getMatchActivityById(req, res) {

}
function createMatch(req, res) {

}
function addActivityToMatch(req, res) {

}
function getAllPlayers(req, res) {

}
function getPlayerById(req, res) {

}
function addPlayer(req, res) {

}
