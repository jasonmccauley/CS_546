//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import * as helpers from "./helpers.js";

export const getBookById = async (id) => {
    if(typeof id !== "string"){
        throw TypeError("Please enter a string for book ID");
    }
    let trimmed_id = id.trim();
    if(trimmed_id.length === 0){
        throw RangeError("Please enter a non-empty string for book ID");
    }

    const books = await helpers.getBooks();
    for(let obj of books){
        if(trimmed_id === obj["id"]){
            return obj;
        }
    }
    throw RangeError("Book not found");
};

export const booksByFormat = async () => {
    const books = await helpers.getBooks();
    let formatObj = {};

    for(let obj of books){
        for(let format of obj["format"]){
            if(!(format in formatObj)){
                formatObj[format] = 1;
            }
            else{
                formatObj[format] += 1;
            }
        }
    }

    return formatObj;
};

export const mostPopularGenre = async () => {
    const books = await helpers.getBooks();
    let genreObj = {};

    for(let obj of books){
        for(let genre of obj["genres"]){
            if(!(genre in genreObj)){
                genreObj[genre] = 1;
            }
            else{
                genreObj[genre] += 1;
            }
        }
    }

    let genreMax = 0;
    for(let genre in genreObj){
        if(genreObj[genre] > genreMax){
            genreMax = genreObj[genre];
        }
    }
    for(let genre in genreObj){
        if(genreMax === genreObj[genre]){
            return genre;
        }
    }
};

export const booksByPublisher = async (publisher) => {
    if(typeof publisher !== "string"){
        throw TypeError("Please enter a string for the publisher");
    }
    let trimmed_publisher = publisher.trim();
    if(trimmed_publisher.length === 0){
        throw RangeError("Please enter a non-empty string for the publisher");
    }

    let lowercase_publisher = trimmed_publisher.toLowerCase();
    let publisherBooks = [];
    const books = await helpers.getBooks();

    for(let obj of books){
        if(lowercase_publisher === obj["publisher"].toLowerCase()){
            publisherBooks.push(obj);
        }
    }
    if(publisherBooks.length === 0){
        throw RangeError("No publisher found");
    }
    else{
        return publisherBooks;
    }
};

export const averagePriceByGenre = async (genre) => {
    if(typeof genre !== "string"){
        throw TypeError("Please enter a string for genre");
    }
    let trimmed_genre = genre.trim();
    if(trimmed_genre.length === 0){
        throw RangeError("Please enter a non-empty string for genre");
    }

    let lowercase_genre = trimmed_genre.toLowerCase();
    const books = await helpers.getBooks();
    let bookObjsByGenre = [];
    
    for(let obj of books){
        for(let obj_genre of obj["genres"]){
            if(lowercase_genre === obj_genre.toLowerCase()){
                bookObjsByGenre.push(obj);
            }
        }
    }
    if(bookObjsByGenre.length === 0){
        throw RangeError("No books of that genre found");
    }

    let totalPrice = 0;
    for(let obj of bookObjsByGenre){
        totalPrice += obj["price"];
    }

    let averagePrice = totalPrice / (bookObjsByGenre.length)
    let roundedAveragePrice = Math.round(averagePrice * 100) / 100
    return roundedAveragePrice
};
