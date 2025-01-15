// This data file should export all functions using the ES6 standard as shown in the lecture code
import {teams} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import helpers from "../helpers.js";

const exportedMethods = {
    async createGame(teamId,gameDate,opposingTeamId,homeOrAway,finalScore,win) {
        teamId = helpers.checkId(teamId);
        opposingTeamId = helpers.checkId(opposingTeamId);
        homeOrAway = helpers.checkString(homeOrAway, "homeOrAway");
        homeOrAway = helpers.checkHomeOrAway(homeOrAway);
        finalScore = helpers.checkString(finalScore, "finalScore");
        finalScore = helpers.checkFinalScore(finalScore);
        win = helpers.checkWin(win);
        gameDate = helpers.checkString(gameDate, "gameDate");

        const teamCollection = await teams();
        const team = await teamCollection.findOne({_id: new ObjectId(teamId)});
        if(team === null) throw "No team with that id";
        const opposingTeam = await teamCollection.findOne({_id: new ObjectId(opposingTeamId)});
        if(opposingTeam === null) throw "No opposing team with that id";
        
        if(team.sport.trim().toLowerCase() !== opposingTeam.sport.trim().toLowerCase()) throw "The team and opposing team must be competing in the same sport";
        gameDate = helpers.checkGameDate(gameDate, team.yearFounded, opposingTeam.yearFounded);
        if(teamId === opposingTeamId) throw "The teamId and opposingTeamId cannot be the same, team cannot play against themself";

        let newGame = {_id: new ObjectId(), gameDate: gameDate, opposingTeamId: opposingTeamId, homeOrAway: homeOrAway, finalScore: finalScore, win: win}
        let updatedWinLossCount = helpers.updateWinLossCount(team.winLossCount, win);
        await teamCollection.updateOne({_id: new ObjectId(teamId)}, 
            {
                $push: {games: newGame},
                $set: {winLossCount: updatedWinLossCount}
            }
        );

        const updatedTeam = await teamCollection.findOne({_id: new ObjectId(teamId)});
        return updatedTeam;
    },

    async getAllGames(teamId){
        teamId = helpers.checkId(teamId);

        const teamCollection = await teams();
        const team = await teamCollection.findOne({_id: new ObjectId(teamId)});
        if(team === null) throw "No team with that id";
        return team.games;       
    },

    async getGame(gameId){
        gameId = helpers.checkId(gameId);

        const teamCollection = await teams();
        const team = await teamCollection.findOne(
            {"games._id": new ObjectId(gameId)},
            {projection: {"games.$": 1}}
        );
        if(team === null) throw "No team with that gameId";
        return team.games[0];
    },

    async updateGame(gameId, updateObject) {
        gameId = helpers.checkId(gameId);
    
        if (typeof updateObject !== "object") throw "You must provide an updateObject of the type object";
        const updateObjectKeys = Object.keys(updateObject);
        if (updateObjectKeys.length === 0) throw "You must provide a non-empty updateObject";
        const validKeys = ["_id", "gameDate", "opposingTeamId", "homeOrAway", "finalScore", "win"];
        for (let key in updateObject) {
            if (!validKeys.includes(key)) throw "The updateObject can only contain keys in the original game object";
        }
    
        const teamCollection = await teams();
        const team = await teamCollection.findOne(
            { "games._id": new ObjectId(gameId) },
            { projection: {"games.$": 1, "sport": 1, "winLossCount": 1, "yearFounded": 1, "_id": 1}}
        );
        if (team === null) throw "No team with that gameId";
        const currentGame = team.games[0];
        let winLossCount = team.winLossCount;
        let updatedGame = {_id: currentGame._id, gameDate: currentGame.gameDate, opposingTeamId: currentGame.opposingTeamId, homeOrAway: currentGame.homeOrAway, finalScore: currentGame.finalScore, win: currentGame.win}; // create a copy of the current game
    
        if ("opposingTeamId" in updateObject) {
            const updatedOpposingTeamId = helpers.checkId(updateObject.opposingTeamId);
            const opposingTeam = await teamCollection.findOne({ _id: new ObjectId(updatedOpposingTeamId) });
            if (opposingTeam === null) throw "No opposing team with that id";
            if (team.sport.trim().toLowerCase() !== opposingTeam.sport.trim().toLowerCase()) throw "The team and opposing team must be competing in the same sport";
            if (team._id.toString() === updatedOpposingTeamId) throw "The team _id and opposingTeamId cannot be the same, team cannot play against themself";
            updatedGame.opposingTeamId = updatedOpposingTeamId;
        }
    
        if ("gameDate" in updateObject) {
            let updatedGameDate = helpers.checkString(updateObject.gameDate, "updatedGameDate");
            if("opposingTeamId" in updateObject){
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

        }
    
        if ("homeOrAway" in updateObject) {
            let updatedHomeOrAway = helpers.checkString(updateObject.homeOrAway, "homeOrAway");
            updatedGame.homeOrAway = helpers.checkHomeOrAway(updatedHomeOrAway);
        }
    
        if ("finalScore" in updateObject) {
            let updatedFinalScore = helpers.checkString(updateObject.finalScore, "finalScore");
            updatedGame.finalScore = helpers.checkFinalScore(updatedFinalScore);
        }
    
        if ("win" in updateObject) {
            const updatedWin = helpers.checkWin(updateObject.win);
            if (currentGame.win === true && updatedWin === false) {
                winLossCount = helpers.updateWinToLoss(winLossCount);
            } else if (currentGame.win === false && updatedWin === true) {
                winLossCount = helpers.updateLossToWin(winLossCount);
            }
            updatedGame.win = updatedWin;
        }
    
        const result = await teamCollection.updateOne(
            { "games._id": new ObjectId(gameId) },
            {
                $set: {
                    "games.$": updatedGame,
                    "winLossCount": winLossCount
                }
            }
        );
        return await teamCollection.findOne({ "games._id": new ObjectId(gameId) });
    },

    async removeGame(gameId){
        gameId = helpers.checkId(gameId);

        const teamCollection = await teams();
        const team = await teamCollection.findOne(
            {"games._id": new ObjectId(gameId)},
            {projection: {"games.$": 1, "winLossCount": 1}}
        );
        if(team === null) throw "No team with that gameId";

        const game = team.games[0];
        const wasWin = game.win;
        const updatedWinLossCount = helpers.removeWinLoss(team.winLossCount, wasWin);
        await teamCollection.updateOne(
            {"games._id": new ObjectId(gameId)},
            {
                $pull: {games: {_id: new ObjectId(gameId)}}, 
                $set: {winLossCount: updatedWinLossCount}
            }
        ); 

        const updatedTeam = await teamCollection.findOne({_id: team._id});
        return updatedTeam;
    }
};

export default exportedMethods;
