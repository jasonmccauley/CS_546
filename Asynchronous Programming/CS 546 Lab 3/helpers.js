//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.
import axios from "axios";
export const getAuthors = async () => {
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json")
    return data; // this will be the array of author objects
}

export const getBooks = async () => {
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json")
    return data; // this will be the array of book objects
}

export const sortByLastName = (fullName1, fullName2) => {
    let lastName1 = fullName1.split(/(?<=^\S+)\s/)[1]; // I referenced georg's response to this Stack Overflow post for splitting a string at the first white space occurrence using Regex lookbehinds https://stackoverflow.com/questions/10272773/split-string-on-the-first-white-space-occurrence
    let lastName2 = fullName2.split(/(?<=^\S+)\s/)[1];
    let specialCharsRegex = /[`']/g // I referred to noinput's answer on the following Stack Overflow page to help format regex of special characters to be removed: https://stackoverflow.com/questions/4374822/remove-all-special-characters-with-regexp
    lastName1 = lastName1.replace(specialCharsRegex, "").toLowerCase()
    lastName2 = lastName2.replace(specialCharsRegex, "").toLowerCase();

    if(lastName1 < lastName2){ // I referenced RiaD's response to this Stack Overflow post to create a comparison function for names https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
        return -1;
    }
    if(lastName1 > lastName2){
        return 1
    }
    return 0;
}

export const calculateAge = (dob) => {
    let dob_list = dob.split("/");
    let dob_month = Number(dob_list[0]);
    let dob_day = Number(dob_list[1]);
    let dob_year = Number(dob_list[2]);
    
    const current_date = new Date(); // I referenced Aelios's answer to this Stack Overflow post for creating a Date object and extracting the current month, day, and year from it https://stackoverflow.com/questions/12409299/how-to-get-current-formatted-date-dd-mm-yyyy-in-javascript-and-append-it-to-an-i
    const current_month = current_date.getMonth() + 1; // January is considered month 0, add 1
    const current_day = current_date.getDate();
    const current_year = current_date.getFullYear();

    let age = current_year - dob_year;
    if(current_month < dob_month){
        age -= 1;
    }
    else if(current_month === dob_month && current_day < dob_day){
        age -= 1;
    }

    return age;
}