let express = require('express');

const sportsController = require('../controllers/sportsController');

let router = express.Router();


//read match and match data
router.get("/sports/:sportName/matches", sportsController.getAllMatches)
router.get("/sports/:sportName/matches/:matchId", sportsController.getMatchById)
router.get("/sports/:sportName/matches/:matchId/activities", sportsController.getMatchActivites)
router.get("/sports/:sportName/matches/:matchId/activities/:actId", sportsController.getMatchActivityById)

//add match and match data
router.post("/sports/:sportName/matches", sportsController.createMatch)
router.post("/sports/:sportName/matches/:matchId/activities", sportsController.addActivityToMatch)

//player info
router.get("/sports/:sportName/players", sportsController.getAllPlayers)
router.get("/sports/:sportName/players/:playerId", sportsController.getPlayerById)

//add player - internal
router.post("/sports/:sportName/players", sportsController.addPlayer)



module.exports = router;