//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data
import * as helpers from "./helpers.js";
import * as books from "./books.js";

export const getAuthorById = async (id) => {
    if(typeof id !== "string"){
        throw TypeError("Please enter a string for author ID");
    }
    let trimmed_id = id.trim();
    if(trimmed_id.length === 0){
        throw RangeError("Please enter a non-empty string for author ID");
    }
    
    const authors = await helpers.getAuthors();
    let list_IDs = [];
    for(let obj of authors){
        list_IDs.push(obj["id"]);
    }

    if(list_IDs.includes(trimmed_id)){
        for(let obj of authors){
            if(trimmed_id === obj["id"]){
                return obj;
            }
        }
    }
    else{
        throw RangeError("Author not found");
    }
};

export const authorsMultipleGenres = async () => {
    const authors = await helpers.getAuthors();
    let author_names = [];

    for(let obj of authors){
        let author_name = obj["first_name"] + " " + obj["last_name"];
        if(author_names.includes(author_name)){
        }
        else{
            let author_genres = [];
            for(let bookID of obj["books"]){
                let bookObj = await books.getBookById(bookID);
                for(let genre of bookObj["genres"]){
                    if(!(author_genres.includes(genre))){
                        author_genres.push(genre);
                    }
                }
            }
            if(author_genres.length > 1){
                author_names.push(author_name);
            }
        }
    }

    let sorted_author_names = author_names.sort(helpers.sortByLastName);
    return sorted_author_names;
};

export const averagePageCount = async (firstName, lastName) => {
    if(typeof firstName !== "string"){
        throw TypeError("Please enter a string for firstName");
    }
    if(typeof lastName !== "string"){
        throw TypeError("Please enter a string for lastName");
    }
    let trimmed_firstName = firstName.trim();
    let trimmed_lastName = lastName.trim();
    if(trimmed_firstName.length === 0){
        throw RangeError("Please enter a non-empty string for firstName");
    }
    if(trimmed_lastName.length === 0){
        throw RangeError("Please enter a non-empty string for lastName");
    }

    let lowercase_firstName = trimmed_firstName.toLowerCase();
    let lowercase_lastName = trimmed_lastName.toLowerCase();
    const authors = await helpers.getAuthors();
    let totalPageCount = 0;
    let bookCount = 0;

    for(let obj of authors){
        if(lowercase_firstName === obj["first_name"].toLowerCase() && lowercase_lastName === obj["last_name"].toLowerCase()){
            for(let id of obj["books"]){
                let bookObj = await books.getBookById(id);
                totalPageCount += bookObj["pageCount"];
                bookCount += 1;
            }
        }
    }
    if(bookCount > 0){
        let avgPageCount = totalPageCount / bookCount;
        let roundedAvgPageCount = Math.round(avgPageCount * 100) / 100;
        return roundedAvgPageCount;
    }
    else{
        throw RangeError("Author not found");
    }
};

export const getAuthorsByAgeRange = async (minAge, maxAge) => {
    if(!(Number.isInteger(minAge))){
        throw TypeError("Please enter an integer for minAge");
    }
    if(!(Number.isInteger(maxAge))){
        throw TypeError("Please enter an integer for maxAge");
    }
    if(minAge < 1){
        throw RangeError("Please ensure that minAge is greater than or equal to 1");
    }
    if(minAge > maxAge){
        throw RangeError("Please ensure that minAge is less than or equal to maxAge");
    }

    const authors = await helpers.getAuthors();
    let list_author_objs = [];    
    for(let obj of authors){
        let date_of_birth = obj["date_of_birth"];
        let age = helpers.calculateAge(date_of_birth);
        if(age >= minAge && age <= maxAge){
            list_author_objs.push(obj);
        }
    }

    if(list_author_objs.length === 0){
        throw RangeError("No authors found for the given age range");
    }
    else{
        return list_author_objs;
    }
};

export const authorsByGenre = async (genre) => {
    if(typeof genre !== "string"){
        throw TypeError("Please enter a string for genre");
    }
    let trimmed_genre = genre.trim();
    if(trimmed_genre.length === 0){
        throw RangeError("Please enter a non-empty string for genre");
    }

    let lowercase_genre = trimmed_genre.toLowerCase();
    let authors_list = [];
    const authors = await helpers.getAuthors();
    for(let obj of authors){
        for(let bookID of obj["books"]){
            let bookObj = await books.getBookById(bookID);
            for(let bookGenre of bookObj["genres"]){
                if(lowercase_genre === bookGenre.toLowerCase()){
                    let author_name = obj["first_name"] + " " + obj["last_name"];
                    if(!(authors_list.includes(author_name))){
                        authors_list.push(author_name);
                    }
                }
            }
        }
    }    

    if(authors_list.length > 0){
        let sorted_authors_list = authors_list.sort(helpers.sortByLastName);
        return sorted_authors_list;    
    }
    else{
        throw RangeError("No authors found for the given genre");
    }
};
