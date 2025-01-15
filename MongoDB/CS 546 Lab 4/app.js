/*

Create a team of your choice.
Log the newly created team. (Just that team, not all teams)
Create another team of your choice.
Query all team, and log them all
Create the 3rd team of your choice.
Log the newly created 3rd team. (Just that team, not all team)
Move the first team
Log the first team with the updated info. 
Remove the second team you created.
Query all teams, and log them all
Try to create a team with bad input parameters to make sure it throws errors.
Try to remove a team that does not exist to make sure it throws errors.
Try to rename a team that does not exist to make sure it throws errors.
Try to rename a team passing in invalid data to make sure it throws errors.
Try getting a team by ID that does not exist to make sure it throws errors.

*/
import {createTeam, getAllTeams, getTeamById, removeTeam, moveTeam} from "./data/teams.js";
import {dbConnection, closeConnection} from "./config/mongoConnection.js";

const db = await dbConnection();
await db.dropDatabase();

let Giants = undefined;
let Nets = undefined;
let Yankees = undefined;
let Devils = undefined;

try{
    Giants = await createTeam("Giants", "Football", 1925, "New York", "NY", "MetLife Stadium", 4, [
        {firstName: "Daniel", lastName: "Jones", position: "QB"},
        {firstName: "Andrew", lastName: "Thomas", position: "OL"},
        {firstName: "Dexter", lastName: "Lawrence II", position: "NT"},
        {firstName: "Bobby", lastName: "Okereke", position: "LB"},
        {firstName: "Casey", lastName: "Kreiter", position: "LS"}
    ]); 
    console.log(Giants);
}
catch(e) {
    console.log(e);
}

try{
    Nets = await createTeam("Nets", "Basketball", 1967, "Brooklyn", "NY", "Barclays Center", 0, [
        {firstName: "Dennis", lastName: "Schroder", position: "PG"},
        {firstName: "Cam", lastName: "Thomas", position: "SG"},
        {firstName: "Cameron", lastName: "Johnson", position: "SF"},
        {firstName: "Dorian", lastName: "Finney-Smith", position: "PF"},
        {firstName: "Nic", lastName: "Claxton", position: "C"}
    ]);
}
catch(e){
    console.log(e);
}

try{
    const queryAll = await getAllTeams();
    console.log(queryAll);
}
catch(e){
    console.log(e);
}

try{
    Yankees = await createTeam("Yankees", "Baseball", 1967, "New York", "NY", "Yankee Stadium", 27, [
        {firstName: "Gleyber", lastName: "Torres", position: "2B"},
        {firstName: "Juan", lastName: "Soto", position: "RF"},
        {firstName: "Aaron", lastName: "Judge", position: "CF"},
        {firstName: "Austin", lastName: "Wells", position: "C"},
        {firstName: "Giancarlo", lastName: "Stanton", position: "DH"},
        {firstName: "Jazz", lastName: "Chisholm Jr.", position: "3B"},
        {firstName: "Anthony", lastName: "Volpe", position: "SS"},
        {firstName: "Oswaldo", lastName: "Cabrera", position: "1B"},
        {firstName: "Alex", lastName: "Verdugo", position: "LF"}
    ]); 
}
catch(e){
    console.log(e);
}

try{
    const queryYankees = await getTeamById(Yankees._id);
    console.log(queryYankees);
}
catch(e){
    console.log(e)
}

try{
    const moveGiants = await moveTeam(Giants._id, "Seattle", "WA", "Lumen Field");
    console.log(moveGiants);
}
catch(e){
    console.log(e);
}

try{
    const removeNets = await removeTeam(Nets._id);
    console.log(removeNets);
}
catch(e){
    console.log(e);
}

try{
    const queryAll = await getAllTeams();
    console.log(queryAll);
}
catch(e){
    console.log(e);
}

try{
    Devils = await createTeam("Devils", "Hockey", 1982, "Newark", "NJ", "Prudential Center", 3, [
        {firstName: "Timo", lastName: "Meier", position: ""},
        {firstName: "Jack", surname: "Hughes", position: "C"},
        {firstName: "Jesper", lastName: "Bratt", position: "RW"},
        {firstName: "Brenden", lastName: "Dillon", position: "D"},
        {firstName: "Dougie", lastName: "Hamilton", position: "D"},
    ]);
}
catch(e){
    console.log(e);
}

try{
    const removeSeahawks = await removeTeam("id_does_not_exist");
}
catch(e){
    console.log(e);
}

try{
    const moveTimberwolves = await moveTeam("id_does_not_exist", "Louisville", "KY", "Churchill Downs");
}
catch(e){
    console.log(e);
}

try{
    const moveYankees = await moveTeam(Yankees._id, "London", "England", "Tottenham Hotspur Stadium");
}
catch(e){
    console.log(e);
}

try{
    const querySeahawks = await getTeamById("id_does_not_exist");
}
catch(e){
    console.log(e);
}

await closeConnection();
console.log("Done!");
