let mongoose = require('mongoose');


const matchSchema = new mongoose.Schema({
    team1: String,
    team2: String,
    venue: String,
    team1Score: String,
    team2Score: String,
    winner: String,
    winMargin: String,

});

const matchActivitySchema = new mongoose.Schema({

    matchId: String,
    bowler: String,
    batsman: String,
    over: String,
    action: String,


});

const playerSchema = new mongoose.Schema({
    Player_Name: String,
    DOB: String,
    Batting_Hand: String,
    Bowling_Skill: String,
    Country: String
});

module.exports = {
    matchActivitySchema,
    matchSchema,
    playerSchema
}