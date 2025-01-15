// TODO: Export and implement the following functions in ES6 format
import {teams} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

export const createTeam = async (name, sport, yearFounded, city, state, stadium, championshipsWon, players) => {
  if(!name) throw "You must provide a name for the team";
  if(typeof name !== "string") throw "Team name must be a string";
  if(name.trim().length === 0) throw "Team name cannot be an empty string";
  name = name.trim();

  if(!sport) throw "You must provide a name for the sport";
  if(typeof sport !== "string") throw "Sport must be a string";
  if(sport.trim().length === 0) throw "Sport cannot be an empty string";
  sport = sport.trim();

  if(!Number.isInteger(yearFounded)) throw "You must provide a whole number for the year founded";
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  if(yearFounded < 1850 || yearFounded > currentYear) throw "You must provide a year between 1850 and the current year";

  if(!city) throw "You must provide a city for the team";
  if(typeof city !== "string") throw "City must be a string";
  if(city.trim().length === 0) throw "City cannot be an empty string";
  city = city.trim();

  if(!state) throw "You must provide a state for the team";
  if(typeof state !== "string") throw "State must be a string";
  if(state.trim().length === 0) throw "State cannot be an empty string";
  state = state.trim().toUpperCase();
  if(state.length !== 2) throw "State can only contain two characters";
  if(!states.includes(state)) throw "Entered state is not valid";

  if(!stadium) throw "You must provide a stadium for the team";
  if(typeof stadium !== "string") throw "Stadium must be a string";
  if(stadium.trim().length === 0) throw "Stadium cannot be an empty string";
  stadium = stadium.trim();

  if(!Number.isInteger(championshipsWon)) throw "You must provide an integer for championships won";
  if(championshipsWon < 0) throw "Championships won cannot be negative";

  if(!Array.isArray(players)) throw "You must provide an array for the players";
  if(players.length === 0) throw "Players cannot be an empty array";
  for(let obj of players){
      if(Array.isArray(obj)) throw "Players cannot contain arrays";
      if(typeof obj !== "object") throw "Players must contain objects";
      if(Object.keys(obj).length !== 3) throw "Each object in players must contain exactly three keys";
      if(!("firstName" in obj) || !("lastName" in obj) || !("position" in obj)) throw "Each object in players must contain the following keys: firstName, lastName, and position";
      for(let key in obj){
        if(!obj[key]) throw "You must provide a value for each key in each object of players";
        if(typeof obj[key] !== "string") throw "The value for each key in each object of players must be a string";
        if(obj[key].trim().length === 0) throw "The value for each key in each object of players cannot be an empty string";
        obj[key] = obj[key].trim();
      }
  }

  let newTeam = {name: name, sport: sport, yearFounded: yearFounded, city: city, state: state, stadium: stadium, championshipsWon: championshipsWon, players: players};
  const teamCollection = await teams();
  const insertInfo = await teamCollection.insertOne(newTeam);
  if(!insertInfo.acknowledged || !insertInfo.insertedId) throw "Could not add team to collection";
  const team = await teamCollection.findOne({_id: insertInfo.insertedId});
  team._id = team._id.toString(); 
  return team;
};

export const getAllTeams = async () => {
  const teamCollection = await teams();
  let teamList = await teamCollection.find().toArray(); // .find() is used to query the documents in a collection. by passing no argument, we query all documents, and convert them to an array
  if(!teamList) throw "Could not get all teams";
  teamList = teamList.map((obj) => {
    obj._id = obj._id.toString();
    return obj;
  })
  return teamList;
};

export const getTeamById = async (id) => {
  if(!id) throw "You must provide an id to search for";
  if(typeof id !== "string") throw "Id must be a string";
  if(id.trim().length === 0) throw "Id cannot be an empty string";
  id = id.trim();
  if(!ObjectId.isValid(id)) throw "Invalid object ID";

  const teamCollection = await teams();
  const team = await teamCollection.findOne({_id: new ObjectId(id)});
  if(team === null) throw "No team with that id";
  team._id = team._id.toString();
  return team;
};

export const removeTeam = async (id) => {
  if(!id) throw "You must provide an id to search for";
  if(typeof id !== "string") throw "Id must be a string";
  if(id.trim().length === 0) throw "Id cannot be an empty string";
  id = id.trim();
  if(!ObjectId.isValid(id)) throw "Invalid object ID";

  const teamCollection = await teams();
  const deletionInfo = await teamCollection.findOneAndDelete(
    {_id: new ObjectId(id)}
  );
  if(!deletionInfo) throw `Could not delete team with id of ${id}`;
  return `${deletionInfo.name} have been successfully deleted!`;
};

export const moveTeam = async (id, newCity, newState, newStadium) => {
  if(!id) throw "You must provide an id to search for";
  if(typeof id !== "string") throw "Id must be a string";
  if(id.trim().length === 0) throw "Id cannot be an empty string";
  id = id.trim();
  if(!ObjectId.isValid(id)) throw "Invalid object ID";

  if(!newCity) throw "You must provide a new city for the team";
  if(typeof newCity !== "string") throw "New city must be a string";
  if(newCity.trim().length === 0) throw "New city cannot be an empty string";
  newCity = newCity.trim();

  if(!newState) throw "You must provide a new state for the team";
  if(typeof newState !== "string") throw "New state must be a string";
  if(newState.trim().length === 0) throw "New state cannot be an empty string";
  newState = newState.trim().toUpperCase();
  if(newState.length !== 2) throw "New state can only contain two characters";
  if(!states.includes(newState)) throw "Entered new state is not valid";

  if(!newStadium) throw "You must provide a new stadium for the team";
  if(typeof newStadium !== "string") throw "New stadium must be a string";
  if(newStadium.trim().length === 0) throw "New stadium cannot be an empty string";
  newStadium = newStadium.trim();

  const updatedTeam = {city: newCity, state: newState, stadium: newStadium};
  const teamCollection = await teams();
  const updatedInfo = await teamCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: updatedTeam}, // findOneAndUpdate only replaces the parameters specified in updatedTeam, and leaves the rest of the document unchanged
    {returnDocument: "after"}
  )
  if(!updatedInfo) throw "Could not update team successfully";
  updatedInfo._id = updatedInfo._id.toString();
  return updatedInfo;
};
