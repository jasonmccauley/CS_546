//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import express from "express";
import {searchMoviesByTitle, getMovieById} from "../data/movies.js";
const router = express.Router();

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try{
    res.render("home", {title: "Movie Search"});
  }
  catch(e){
    res.status(500).render("error", {title: "Error", errorClass: "error", error: "Internal Server Error"});
  }
});

router.route('/moviesearch').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchByTitle and then call your data function passing in the searchByTitle and then rendering the search results of up to 50 Movies.
  try{
    const searchByTitle = req.body.searchMoviesByTitle;
    if(!searchByTitle || searchByTitle.trim().length === 0){
      return res.status(400).render("error", {title: "Error", errorClass: "error", error: "You must enter a search term!"});
    }

    const movies = await searchMoviesByTitle(searchByTitle);
    if(movies.length === 0){
      return res.status(404).render("error", {title: "Error", errorClass: "movie-not-found", error: `We're sorry, but no results were found for ${searchByTitle}.`});
    }

    res.render("searchResults", {title: "Movies Found", searchByTitle: searchByTitle, movies: movies});
  }
  catch(e){
    res.status(500).render("error", {title: "Error", errorClass: "error", error: e.message});
  }
});

router.route('/getmovie/:id').get(async (req, res) => {
  //code here for GET a single movie
  try{
    const movie = await getMovieById(req.params.id);
    res.render("getmovie", {title: movie.Title, movie: movie});
  }
  catch(e){
    if(e.message === "Movie not found"){
      res.status(404).render("error", {title: "Error", errorClass: "error", error: "No movie found with that id!"})
    }
    else{
      res.status(500).render("error", {title: "Error", errorClass: "error", error: e.message});
    }
  }
});

//export router
export default router;