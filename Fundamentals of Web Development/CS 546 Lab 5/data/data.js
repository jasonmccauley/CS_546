/*Here, you can export the data functions
to get the authors, books, getAuthorByID, getBookById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/
import axios from "axios";
export const getAuthors = async () => {
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json")
    return data; // this will be the array of author objects
};

export const getBooks = async () => {
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json")
    return data; // this will be the array of book objects
};

export const getAuthorById = async (id) => {
    if(typeof id !== "string"){
        throw "Please enter a string for author ID"
    }
    id = id.trim();
    if(id.length === 0){
        throw "Please enter a non-empty string for author ID"
    }
    
    const authors = await getAuthors();
    let list_IDs = [];
    for(let obj of authors){
        list_IDs.push(obj["id"]);
    }

    if(list_IDs.includes(id)){
        for(let obj of authors){
            if(id === obj["id"]){
                return obj;
            }
        }
    }
    else{
        throw "Author not found"
    }
};

export const getBookById = async (id) => {
    if(typeof id !== "string"){
        throw "Please enter a string for book ID"
    }
    id = id.trim();
    if(id.length === 0){
        throw "Please enter a non-empty string for book ID"
    }

    const books = await getBooks();
    for(let obj of books){
        if(id === obj["id"]){
            return obj;
        }
    }
    throw "Book not found"
};
