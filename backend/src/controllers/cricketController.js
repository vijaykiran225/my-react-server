
let mongoose = require('mongoose');

const schemas = require('../schema/cricket/cricketSchema');

mongoose.connect("mongodb://root:example@mongo:27017/cricket?authSource=admin", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB ...'))
    .catch(err => {
        console.error('Could not connect to MongoDB:‌');
        // serv.close();
    });

function getAllMatches(req, res) {
    const MyModel = mongoose.model('Matches', schemas.matchSchema, 'matches');

    MyModel.find((err, docs) => {
        if (err) {
            console.log(err);

            res.json({ error: "failed" });
        } else {
            res.json(docs);
        }

    })
}
function getMatchById(req, res) {
    const MyModel = mongoose.model('Matches', schemas.matchSchema, 'matches');

    MyModel.findById(req.params.matchId, (err, doc) => {
        if (err) {
            console.log(err);
            res.json({ error: "failed" });
        } else {
            res.json(doc);
        }
    });
}
function getMatchActivites(req, res) {
    const MyModel = mongoose.model('MatchActivity', schemas.matchActivitySchema, 'match_activities');

    MyModel.find((err, docs) => {
        if (err) {
            console.log(err);

            res.json({ error: "failed" });
        } else {
            res.json(docs);
        }

    })
}
function getMatchActivityById(req, res) {
    const MyModel = mongoose.model('MatchActivity', schemas.matchActivitySchema, 'match_activities');

    MyModel.findById(req.params.actId, (err, doc) => {
        if (err) {
            console.log(err);
            res.json({ error: "failed" });
        } else {
            res.json(doc);
        }
    });
}
function createMatch(req, res) {
    const MyModel = mongoose.model('Match', schemas.matchSchema, 'match');
    const m = new MyModel();
    console.log(req);
    m.team1 = req.body.team1
    m.team2 = req.body.team2
    m.venue = req.body.venue
    m.team1Score = req.body.team1Score
    m.team2Score = req.body.team2Score
    m.winner = req.body.winner
    m.winMargin = req.body.winMargin

    m.save()
        .then(x => res.json(x))
        .catch(x => {
            console.log(x);
            res.send('failed');
        });

}
function addActivityToMatch(req, res) {
    const MyModel = mongoose.model('MatchActivity', schemas.matchActivitySchema, 'match_activities');
    const m = new MyModel();
    console.log(req);

    m.matchId = req.params.matchId
    m.bowler = req.body.bowler
    m.batsman = req.body.batsman
    m.over = req.body.over
    m.action = req.body.action


    m.save()
        .then(x => res.json(x))
        .catch(x => {
            console.log(x);
            res.send('failed');
        });
}
function getAllPlayers(req, res) {
    const MyModel = mongoose.model('Players', schemas.playerSchema, 'players');

    MyModel.find((err, doc) => {
        if (err) {
            console.log(err);
            res.json({ error: "failed" });
        } else {
            res.json(doc);
        }
    });
}
function getPlayerById(req, res) {
    const MyModel = mongoose.model('Players', schemas.playerSchema, 'players');

    MyModel.findById(req.params.playerId, (err, doc) => {
        if (err) {
            console.log(err);
            res.json({ error: "failed" });
        } else {
            res.json(doc);
        }
    });
}
function addPlayer(req, res) {
    const MyModel = mongoose.model('Players', schemas.playerSchema, 'players');
    const m = new MyModel();
    console.log(req);

    m.Player_Name = req.body.Player_Name;
    m.DOB = req.body.dob;
    m.Batting_Hand = req.body.Batting_Hand;
    m.Bowling_Skill = req.body.Bowling_Skill;
    m.Country = req.body.Country;

    m.save()
        .then(x => res.json(x))
        .catch(x => {
            console.log(x);
            res.send('failed');
        });
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