//import mongo collections, bcrypt and implement the following data functions
import {users} from "../config/mongoCollections.js";
import helpers from "../helpers.js";
import bcrypt from "bcryptjs";

export const signUpUser = async (firstName, lastName, userId, password, favoriteQuote, themePreference, role) => {
  firstName = helpers.checkName(firstName);
  lastName = helpers.checkName(lastName);
  userId = helpers.checkUserId(userId);
  const userCollection = await users();
  const existingUser = await userCollection.findOne({userId: userId});
  if(existingUser) throw "Error: There is already a user with that userId";
  password = helpers.checkPassword(password);
  favoriteQuote = helpers.checkFavoriteQuote(favoriteQuote);
  themePreference = helpers.checkThemePreference(themePreference);
  role = role.trim().toLowerCase();
  if(role !== "admin" && role !== "user") throw "Error: The only two valid roles are admin and user";

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  const newUser = {firstName: firstName, lastName: lastName, userId: userId, password: hash, favoriteQuote: favoriteQuote, themePreference: themePreference, role: role};
  const insertInfo = await userCollection.insertOne(newUser);
  if(!insertInfo.acknowledged || !insertInfo.insertedId) throw "Error: Could not add user";

  return {registrationCompleted: true};
};

export const signInUser = async (userId, password) => {
  userId = helpers.checkUserId(userId);
  password = helpers.checkPassword(password);

  const userCollection = await users();
  const user = await userCollection.findOne({userId: userId});
  if(user === null) throw "Either the userId or password is invalid";
  let compare = await bcrypt.compare(password, user.password);
  if(compare){
    const obj = {firstName: user.firstName, lastName: user.lastName, userId: user.userId, favoriteQuote: user.favoriteQuote, themePreference: user.themePreference, role: user.role};
    return obj;
  }
  else throw "Either the userId or password is invalid";
};
