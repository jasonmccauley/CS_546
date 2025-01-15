//import express, express router as shown in lecture code
import {Router} from "express";
const router = Router();
import {signUpUser, signInUser} from "../data/users.js";

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/signupuser')
  .get(async (req, res) => {
    //code here for GET
    return res.render("signupuser");
  })
  .post(async (req, res) => {
    //code here for POST
    const {firstName, lastName, userId, password, confirmPassword, favoriteQuote, backgroundColor, fontColor, role} = req.body;
    let errors = {};
    if(!firstName) errors.firstName = "Error: You must enter a first name";
    if(!lastName) errors.lastName = "Error: You must enter a last name";
    if(!userId) errors.userId = "Error: You must enter a userId";
    if(!password) errors.password = "Error: You must enter a password";
    if(!confirmPassword) errors.confirmPassword = "Error: You enter a confirm password";
    if(!favoriteQuote) errors.favoriteQuote = "Error: You must enter a favoriteQuote";
    if(!backgroundColor) errors.backgroundColor = "Error: You must enter a background color";
    if(!fontColor) errors.fontColor = "Error: You must enter a font color";
    if(!role) errors.role = "Error: You must enter a role";
    if(password !== confirmPassword) errors.confirmPassword = "Error: Password must match confirm password";
    if(Object.keys(errors).length > 0){
      return res.status(400).render("signupuser", {errors: errors, formData: req.body});
    }
    
    const themePreference = {backgroundColor: backgroundColor, fontColor: fontColor};
    let signup = null;
    try{
      signup = await signUpUser(firstName, lastName, userId, password, favoriteQuote, themePreference, role);
    }
    catch(e){
      return res.status(400).render("signupuser", {errors: {error: e.toString()}, formData: req.body});
    }

    if(signup.registrationCompleted === true){
      return res.redirect("/signinuser");
    }
    else{
      return res.status(500).render("signupuser", {errors: {error: "Internal Server Error"}, formData: req.body});
    } 
  });

router
  .route('/signinuser')
  .get(async (req, res) => {
    //code here for GET
    return res.render("signinuser");
  })
  .post(async (req, res) => {
    //code here for POST
    const {userId, password} = req.body;
    let errors = {};
    if(!userId) errors.userId = "Error: You must enter a userId"
    if(!password) errors.password = "Error: You must enter a password";
    if(Object.keys(errors).length > 0){
      return res.status(400).render("signinuser", {errors: errors, formData: req.body});
    }

    let signin = null;
    try{
      signin = await signInUser(userId, password);
    }
    catch(e){
      return res.status(400).render("signinuser", {errors: {error: "The userId or password was invalid"}, formData: req.body});
    }
    
    req.session.user = {firstName: signin.firstName, lastName: signin.lastName, userId: signin.userId, favoriteQuote: signin.favoriteQuote, themePreference: signin.themePreference, role: signin.role};
    req.session.user.isAdmin = (req.session.user.role === "admin");
    if(signin.role === "admin"){
      return res.redirect("/administrator");
    }
    else{
      return res.redirect("/user");
    }
  });

router.route('/user').get(async (req, res) => {
  //code here for GET
  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();
  return res.render("user", {user: req.session.user, currentTime, currentDate});
});

router.route('/administrator').get(async (req, res) => {
  //code here for GET
  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();
  return res.render("administrator", {user: req.session.user, currentTime, currentDate});
});

router.route('/signoutuser').get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  return res.render("signoutuser");
});

export default router;