//Here is where you'll set up your server as shown in lecture code
import express from "express";
const app = express();
import configRoutes from "./routes/index.js";
import exphbs from "express-handlebars";

app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const handlebarsInstance = exphbs.create({defaultLayout: "main", helpers: {eq: function(a, b){return a === b}}});
app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
