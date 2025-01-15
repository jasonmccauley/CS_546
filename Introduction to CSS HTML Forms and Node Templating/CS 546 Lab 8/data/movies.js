//import axios
import axios from "axios";
const API_KEY = "CS546";
import helpers from "../helpers.js";

export const searchMoviesByTitle = async (title) => {
  /*Function to make an axios call to search the api and return up to 50 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=CS546&s={title}
  */
  title = helpers.checkString(title);

  const movies = [];
  for(let page = 1; page <= 5; page++){
    const {data} = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&page=${page}`);
    if(data.Response === "True"){
      movies.push(...data.Search);
      if(movies.length >= 50) break;
    }
  }

  return movies;
};

export const getMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=CS546&i={id}
  */
  id = helpers.checkString(id);
  
  const {data} = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
  if(data.Response === "False") throw new Error("Movie not found");

  return data;
};
