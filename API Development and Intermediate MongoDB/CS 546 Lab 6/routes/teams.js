// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from "express";
const router = Router();
import {teamData} from "../data/index.js";
import helpers from "../helpers.js";

router
  .route('/')
  .get(async (req, res) => {
    try{
      const teamList = await teamData.getAllTeams();
      return res.json(teamList);
    }
    catch(e){
      return res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    const createTeamData = req.body;
    // make sure something is present in req.body
    if(!createTeamData || Object.keys(createTeamData).length === 0){
      return res.status(400).json({error: "There are no fields in request body"});
    }
    // check all inputs, should respond with 400
    try{
        createTeamData.name = helpers.checkString(createTeamData.name, "name");
        createTeamData.sport = helpers.checkString(createTeamData.sport, "sport");
        createTeamData.yearFounded = helpers.checkYear(createTeamData.yearFounded);
        createTeamData.city = helpers.checkString(createTeamData.city, "city");
        createTeamData.state = helpers.checkString(createTeamData.state, "state");
        createTeamData.state = helpers.checkState(createTeamData.state);
        createTeamData.stadium = helpers.checkString(createTeamData.stadium, "stadium");
        createTeamData.championshipsWon = helpers.checkChampionshipsWon(createTeamData.championshipsWon);
        createTeamData.players = helpers.checkPlayers(createTeamData.players);
    }
    catch(e){
      return res.status(400).json({error: e});
    }

    //insert the team
    try{
      const {name, sport, yearFounded, city, state, stadium, championshipsWon, players} = createTeamData;
      const newTeam = await teamData.createTeam(name, sport, yearFounded, city, state, stadium, championshipsWon, players);
      return res.json(newTeam);
    }
    catch(e){
      return res.status(500).json({error: e});
    }
  });

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
    // try getting the team by ID
    try{
      const team = await teamData.getTeamById(req.params.teamId);
      return res.json(team);
    }
    catch(e){
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //check the id
    try{
      req.params.teamId = helpers.checkId(req.params.teamId);
    }
    catch(e){
      return res.status(400).json({error: e});
    }
    // try to delete team
    try{
      let deletedTeam = await teamData.removeTeam(req.params.teamId);
      return res.json(deletedTeam);
    }
    catch(e){
      return res.status(404).json({error: e});
    }
  })
  .put(async (req, res) => {
    const updatedData = req.body;
    // make sure there is something in req.body
    if(!updatedData || Object.keys(updatedData).length === 0){
      return res.status(400).json({error: "There are no fields in the request body"});
    }
    // check all the inputs that will return 400 if they fail
    try{
      req.params.teamId = helpers.checkId(req.params.teamId, "ID url param");
      updatedData.name = helpers.checkString(updatedData.name, "name");
      updatedData.sport = helpers.checkString(updatedData.sport, "sport");
      updatedData.yearFounded = helpers.checkYear(updatedData.yearFounded);
      updatedData.city = helpers.checkString(updatedData.city, "city");
      updatedData.state = helpers.checkString(updatedData.state, "state");
      updatedData.state = helpers.checkState(updatedData.state);
      updatedData.stadium = helpers.checkString(updatedData.stadium, "stadium");
      updatedData.championshipsWon = helpers.checkChampionshipsWon(updatedData.championshipsWon);
      updatedData.players = helpers.checkPlayers(updatedData.players);
    }
    catch(e){
      return res.status(400).json({error: e});
    }
    // try to update the team
    try{
      const {name, sport, yearFounded, city, state, stadium, championshipsWon, players} = updatedData;
      const updatedTeam = await teamData.updateTeam(req.params.teamId, name, sport, yearFounded, city, state, stadium, championshipsWon, players);
      return res.json(updatedTeam);
    }
    catch(e){
      return res.status(404).json({error: e});
    }
  });

export default router;