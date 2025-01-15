// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from "express";
const router = Router();
import {gameData} from "../data/index.js";
import helpers from "../helpers.js";
import {teams} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";

router
  .route('/:teamId')
  .get(async (req, res) => {
    // check inputs that produce 400 status
    try{
      req.params.teamId = helpers.checkId(req.params.teamId);
    }
    catch(e){
      return res.status(400).json({error: e});
    }
    //  try getting the games by teamId
    try{
      const teamGames = await gameData.getAllGames(req.params.teamId);
      return res.json(teamGames);
    }
    catch(e){
      return res.status(404).json({error: e});
    }
  })
  .post(async (req, res) => {
    const createGameData = req.body;
    // make sure something is present in req.body
    if(!createGameData || Object.keys(createGameData).length === 0){
      return res.status(400).json({error: "There are no fields in request body"});
    }
    // check all inputs, should respond with 400
    try{
      req.params.teamId = helpers.checkId(req.params.teamId);
      createGameData.opposingTeamId = helpers.checkId(createGameData.opposingTeamId);
      createGameData.homeOrAway = helpers.checkString(createGameData.homeOrAway, "homeOrAway");
      createGameData.homeOrAway = helpers.checkHomeOrAway(createGameData.homeOrAway);
      createGameData.finalScore = helpers.checkString(createGameData.finalScore, "finalScore");
      createGameData.finalScore = helpers.checkFinalScore(createGameData.finalScore);
      createGameData.win = helpers.checkWin(createGameData.win);
      createGameData.gameDate = helpers.checkString(createGameData.gameDate, "gameDate");
    }
    catch(e){
      return res.status(400).json({error: e});
    }
    // try finding the team and opposing team documents
    try{
      const teamCollection = await teams();
      const team = await teamCollection.findOne({_id: new ObjectId(req.params.teamId)});
      if(team === null) throw "No team with that id";
      const opposingTeam = await teamCollection.findOne({_id: new ObjectId(createGameData.opposingTeamId)});
      if(opposingTeam === null) throw "No opposing team with that id";
    }
    catch(e){
      return res.status(404).json({error: e});
    }
    // continue checking inputs after confirming existence of teams, should respond with 400
    try{
      const teamCollection = await teams();
      const team = await teamCollection.findOne({_id: new ObjectId(req.params.teamId)});
      const opposingTeam = await teamCollection.findOne({_id: new ObjectId(createGameData.opposingTeamId)});
      if(team.sport.trim().toLowerCase() !== opposingTeam.sport.trim().toLowerCase()) throw "The team and opposing team must be competing in the same sport";
      createGameData.gameDate = helpers.checkGameDate(createGameData.gameDate, team.yearFounded, opposingTeam.yearFounded);
      if(req.params.teamId === createGameData.opposingTeamId) throw "The teamId and opposingTeamId cannot be the same, team cannot play against themself";
    }
    catch(e){
      return res.status(400).json({error: e});
    }

    // insert the game
    try{
      const {gameDate, opposingTeamId, homeOrAway, finalScore, win} = createGameData;
      const updatedTeam = await gameData.createGame(req.params.teamId, gameDate, opposingTeamId, homeOrAway, finalScore, win);
      return res.json(updatedTeam);
    }
    catch(e){
      return res.status(500).json({error: e});
    }
  });

router
  .route('/game/:gameId')
  .get(async (req, res) => {
    // check inputs that produce 400 status
    try{
      req.params.gameId = helpers.checkId(req.params.gameId);
    }
    catch(e){
      return res.status(400).json({error: e});
    }
    // try getting the game by gameId
    try{
      const game = await gameData.getGame(req.params.gameId);
      return res.json(game);
    }
    catch(e){
      return res.status(404).json({error: e});
    }
  })
  .patch(async (req, res) => {
    const updateGameData = req.body;
    // make sure something is present in req.body
    if(!updateGameData || Object.keys(updateGameData).length === 0){
      return res.status(400).json({error: "There are no fields in request body"});
    }
    
    const validKeys = ["gameDate", "opposingTeamId", "homeOrAway", "finalScore", "win"];
    // check keys in req.body, should produce 400
    for(let key in req.body){
      if(!validKeys.includes(key)){
        return res.status(400).json({error: "The req.body can only contain keys in the original game object"}); 
      }
    }
    // check game Id, should produce 400
    try{
      req.params.gameId = helpers.checkId(req.params.gameId);
    }
    catch(e){
      return res.status(400).json({error: e});
    }
    // check existence of team from req.params.gameId, should produce 404
    const teamCollection = await teams();
    const team = await teamCollection.findOne(
        {"games._id": new ObjectId(req.params.gameId)},
        {projection: {"games.$": 1, "sport": 1, "winLossCount": 1, "yearFounded": 1, "_id": 1}}
    );
    if(team === null){
      return res.status(404).json({error: "No team with that gameId"});
    }
    const currentGame = team.games[0];
    let winLossCount = team.winLossCount;
    let updatedGame = {_id: currentGame._id, gameDate: currentGame.gameDate, opposingTeamId: currentGame.opposingTeamId, homeOrAway: currentGame.homeOrAway, finalScore: currentGame.finalScore, win: currentGame.win}; // create a copy of the current game
    // check existence of opposing team if in req.body, should produce 404
    if("opposingTeamId" in req.body){
      const updatedOpposingTeamId = helpers.checkId(req.body.opposingTeamId);
      const opposingTeam = await teamCollection.findOne({_id: new ObjectId(updatedOpposingTeamId)});
      if(opposingTeam === null){
        return res.status(404).json({error: "No opposing team with that id"});
      }
    }
    // check the req.body, should produce 400
    try{
      if("opposingTeamId" in req.body){
        const updatedOpposingTeamId = helpers.checkId(req.body.opposingTeamId);
        const opposingTeam = await teamCollection.findOne({_id: new ObjectId(updatedOpposingTeamId)});
        if(team.sport.trim().toLowerCase() !== opposingTeam.sport.trim().toLowerCase()) throw "The team and opposing team must be competing in the same sport"            
        if(team._id === updatedOpposingTeamId) throw "The team _id and opposingTeamId cannot be the same, team cannot play against themself";
        updatedGame.opposingTeamId = updatedOpposingTeamId
      }

      if("gameDate" in req.body){
        let updatedGameDate = helpers.checkString(req.body.gameDate, "updatedGameDate");
        if("opposingTeamId" in req.body){
            const opposingTeamId = updatedGame.opposingTeamId;
            const opposingTeam = await teamCollection.findOne({ _id: new ObjectId(opposingTeamId)});
            updatedGameDate = helpers.checkGameDate(updatedGameDate, team.yearFounded, opposingTeam.yearFounded);
            updatedGame.gameDate = updatedGameDate;
        }
        else{
            const opposingTeamId = currentGame.opposingTeamId;
            const opposingTeam = await teamCollection.findOne({_id: new ObjectId(opposingTeamId)});
            updatedGameDate = helpers.checkGameDate(updatedGameDate, team.yearFounded, opposingTeam.yearFounded);
            updatedGame.gameDate = updatedGameDate;
      }    
      
      if("homeOrAway" in req.body){
          let updatedHomeOrAway = helpers.checkString(req.body.homeOrAway, "homeOrAway");
          updatedGame.homeOrAway = helpers.checkHomeOrAway(updatedHomeOrAway);
      }

      if("finalScore" in req.body){
          let updatedFinalScore = helpers.checkString(req.body.finalScore, "finalScore");
          updatedGame.finalScore = helpers.checkFinalScore(updatedFinalScore);
      }

      if("win" in req.body){
          const updatedWin = helpers.checkWin(req.body.win);
          if(currentGame.win === true && updatedWin === false){
              winLossCount = helpers.updateWinToLoss(winLossCount);
          } 
          else if(currentGame.win === false && updatedWin === true){
              winLossCount = helpers.updateLossToWin(winLossCount);
          }
          updatedGame.win = updatedWin;
      }
    }}
    catch(e){
      return res.status(400).json({error: e});
    }
    // patch the team
    try{
      const patchedTeam = await gameData.updateGame(req.params.gameId, req.body);
      return res.json(patchedTeam);
    }
    catch(e){
      return res.status(500).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //check the id
    try{
      req.params.gameId = helpers.checkId(req.params.gameId);
    }
    catch(e){
      return res.status(400).json({error: e});
    }
    // try to delete game
    try{
      let updatedTeam = await gameData.removeGame(req.params.gameId)
      return res.json(updatedTeam);
    }
    catch(e){
      return res.status(404).json({error: e});
    }
  });

export default router;