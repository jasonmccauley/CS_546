// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
import {ObjectId} from "mongodb"
const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];


const exportedMethods = {
    checkId(id){
        if(!id) throw "Error: You must provide an id";
        if(typeof id !== "string") throw "Error: Id must be a string";
        id = id.trim();
        if(id.length === 0) throw "Error: Id cannot be an empty string";
        if(!ObjectId.isValid(id)) throw "Error: Id is invalid object ID";
        return id;
    },

    checkString(str, varName){
        if(!str) throw `Error: You must supply a ${varName}`;
        if(typeof str !== "string") throw `Error: ${varName} Must be a string`;
        str = str.trim();
        if(str.length === 0) throw `Error: ${varName} cannot be an empty string`;
        if(!isNaN(str)) throw `Error: ${str} is not a valid value for ${varName} since it only contains digits`;
        return str;
    },

    checkYear(yr){
        if(!Number.isInteger(yr)) throw "You must provide a whole number for the year founded";
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        if(yr < 1850 || yr > currentYear) throw "You must provide a year between 1850 and the current year";
        return yr;
    },

    checkState(state){
        state = state.trim().toUpperCase();
        if(state.length !== 2) throw "State can only contain two characters";
        if(!states.includes(state)) throw "Entered state is not valid";
        return state;
    },

    checkChampionshipsWon(championshipsWon){
        if(!Number.isInteger(championshipsWon)) throw "You must provide an integer for championships won";
        if(championshipsWon < 0) throw "Championships won cannot be negative";
        return championshipsWon;
    },

    checkPlayers(players){
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
        return players;
    },

    checkHomeOrAway(homeOrAway){
        const location = ["Home", "Away"];
        if(!location.includes(homeOrAway)) throw 'homeOrAway must be either "Home" or "Away" exactly, case sensitive';
        return homeOrAway;
    },

    checkFinalScore(finalScore){
        const scores = finalScore.split("-");
        if(scores.length !== 2) throw 'finalScore must contain only two scores in the format "K-N"';
        const score1 = parseInt(scores[0], 10);
        const score2 = parseInt(scores[1], 10);
        if(isNaN(score1) || isNaN(score2)) throw "Each score in finalScore must be a number";
        if(!Number.isInteger(score1) || !Number.isInteger(score2)) throw "Each score in finalScore must be an integer";
        if(score1 < 0 || score2 < 0) throw "Each score in finalScore must be a positive integer";
        if(score1 === score2) throw "Each score in finalScore cannot be equal, no ties allowed";
        return finalScore;
    },

    checkWin(win){
        if(typeof win !== "boolean") throw "You must provide a boolean for win";
        return win;
    },

    checkGameDate(gameDate, teamYearFounded, opposingTeamYearFounded){
        const date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if(!date_regex.test(gameDate)) throw "You must provide a date in the format mm/dd/yyyy"; // I referred to noirbizarre answer to the following StackOverflow post for the regex for validating the format mm/dd/yyyy https://stackoverflow.com/questions/15196451/regular-expression-to-validate-datetime-format-mm-dd-yyyy
        const gameDateArr = gameDate.split("/");
        const gameDateMonth = parseInt(gameDateArr[0], 10);
        const gameDateDay = parseInt(gameDateArr[1], 10);
        const gameDateYear = parseInt(gameDateArr[2], 10);
        teamYearFounded = parseInt(teamYearFounded, 10);
        opposingTeamYearFounded = parseInt(opposingTeamYearFounded, 10);
        if(gameDateMonth < 1 || gameDateMonth > 12) throw "The entered month cannot be less than 1 or greater than 12";
        if(gameDateDay < 1 || gameDateDay > 31) throw "The entered day cannot be less than 1 or greater than 31";
        if(gameDateYear < 1850) throw "The entered game cannot occur before the year 1850"; 
        if(gameDateYear < teamYearFounded || gameDateYear < opposingTeamYearFounded) throw "The entered game cannot occur before either of the participating teams were founded";
        if(gameDateMonth === 2){
            if(checkLeapYear(gameDateYear)){
                if(gameDateDay > 29) throw "February cannot have more than 29 days in a leap year";
            }
            else{
                if(gameDateDay > 28) throw "February cannot have more than 28 days in a non-leap year";
            }
        }
        else if([4,6,9,11].includes(gameDateMonth)){
            if(gameDateDay > 30) throw "April, June, September, and November cannot have more than 30 days"
        }
        else{
            if(gameDateDay > 31) throw "January, March, May, July, August, October, and December cannot have more than 31 days";
        }
        
        const gameDateObject = new Date(gameDateYear, gameDateMonth - 1, gameDateDay); // month is zero-indexed in date object
        const currentDate = new Date();
        if (gameDateObject > currentDate) throw "The entered game cannot occur in the future.";
        
        return gameDate;
    },

    checkLeapYear(year){
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    },

    updateWinLossCount(winLossCount, win){
        const record = winLossCount.split("-");
        let winCount = parseInt(record[0], 10);
        let lossCount = parseInt(record[1], 10);
        if(win){
            winCount += 1;
        }
        else{
            lossCount += 1;
        }
        return `${winCount}-${lossCount}`;
    },

    removeWinLoss(winLossCount, win){
        const record = winLossCount.split("-");
        let winCount = parseInt(record[0], 10);
        let lossCount = parseInt(record[1], 10);
        if(win){
            winCount -= 1;
        }
        else{
            lossCount -= 1;
        }
        return `${winCount}-${lossCount}`;
    },

    updateWinToLoss(winLossCount){
        const record = winLossCount.split("-");
        let winCount = parseInt(record[0], 10);
        let lossCount = parseInt(record[1], 10);
        winCount -= 1;
        lossCount += 1;
        return `${winCount}-${lossCount}`;
    },

    updateLossToWin(winLossCount){
        const record = winLossCount.split("-");
        let winCount = parseInt(record[0], 10);
        let lossCount = parseInt(record[1], 10);
        winCount += 1;
        lossCount -= 1;
        return `${winCount}-${lossCount}`;
    }
    
};

export default exportedMethods;