// This data file should export all functions using the ES6 standard as shown in the lecture code
import {teams} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import helpers from "../helpers.js";

let exportedMethods = {
    async createTeam(name,sport,yearFounded,city,state,stadium,championshipsWon,players){
        name = helpers.checkString(name, "name");
        sport = helpers.checkString(sport, "sport");
        yearFounded = helpers.checkYear(yearFounded);
        city = helpers.checkString(city, "city");
        state = helpers.checkString(state, "state");
        state = helpers.checkState(state);
        stadium = helpers.checkString(stadium, "stadium");
        championshipsWon = helpers.checkChampionshipsWon(championshipsWon);
        players = helpers.checkPlayers(players);

        let newTeam = {name: name, sport: sport, yearFounded: yearFounded, city: city, state: state, stadium: stadium, championshipsWon: championshipsWon, players: players, winLossCount: "0-0", games: []};
        const teamCollection = await teams();
        const insertInfo = await teamCollection.insertOne(newTeam);
        if(!insertInfo.acknowledged || !insertInfo.insertedId) throw "Could not add team to collection";
        const team = await teamCollection.findOne({_id: insertInfo.insertedId});
        return team;
    },
    
    async getAllTeams(){
        const teamCollection = await teams();
        let teamList = await teamCollection.find({}).project({_id: 1, name: 1}).toArray(); 
        if(!teamList) throw "Could not get all teams";
        return teamList;
    },
    
    async getTeamById(id){
        id = helpers.checkId(id);

        const teamCollection = await teams();
        const team = await teamCollection.findOne({_id: new ObjectId(id)});
        if(team === null) throw "No team with that id";
        return team;
    },
    
    async removeTeam(id){
        id = helpers.checkId(id);

        const teamCollection = await teams();
        const deletionInfo = await teamCollection.findOneAndDelete(
            {_id: new ObjectId(id)}
        );
        if(!deletionInfo) throw `Could not delete team with id of ${id}`;
        return {_id: id, deleted: true};
    },
    
    async updateTeam(id,name,sport,yearFounded,city,state,stadium,championshipsWon,players){
        id = helpers.checkId(id);
        name = helpers.checkString(name, "name");
        sport = helpers.checkString(sport, "sport");
        yearFounded = helpers.checkYear(yearFounded);
        city = helpers.checkString(city, "city");
        state = helpers.checkString(state, "state");
        state = helpers.checkState(state);
        stadium = helpers.checkString(stadium, "stadium");
        championshipsWon = helpers.checkChampionshipsWon(championshipsWon);
        players = helpers.checkPlayers(players);

        const updatedTeam = {name: name, sport: sport, yearFounded: yearFounded, city: city, state: state, stadium: stadium, championshipsWon: championshipsWon, players: players};
        const teamCollection = await teams();
        const updatedInfo = await teamCollection.findOneAndUpdate(
            {_id: new ObjectId(id)},
            {$set: updatedTeam},
            {returnDocument: "after"}
        )
        if(!updatedInfo) throw "Could not update team successfully";
        return updatedInfo;
    }
};

export default exportedMethods;