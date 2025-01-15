/*
Require express and express router as shown in lecture code and worked in previous labs.

Your server this week should not do any of the processing or calculations.  Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the Fibonacci & prime number checking page.

you just need one route to send the static homepage.html file
*/
import express from "express";
import path from "path";
const router = express.Router();

router.route("/").get((req, res) => {
    res.sendFile(path.resolve("static/homepage.html"));
});

export default router;
