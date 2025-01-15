/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/
import session from "express-session";
export const consoleLogMiddleware = (req, res, next) =>{
    if(req.session.user){
        const timestamp = new Date().toUTCString();
        const authenticated = req.session.user ? "Authenticated" : "Non-Authenticated";
        const status = req.session.user.role ? req.session.user.role : "User";
        console.log(`[${timestamp}]: ${req.method} ${req.originalUrl} (${authenticated} ${status})`);
    }
    next();
};

export const rootMiddleware = (req, res, next) =>{
    if(req.path === "/"){
        if(req.session.user){
            if(req.session.user.role === "admin"){
                return res.redirect("/administrator");
            }
            else if(req.session.user.role === "user"){
                return res.redirect("/user");
            }
        }
        else{
            return res.redirect("/signinuser");
        }
    }
    next();
};

export const signinMiddleware = (req, res, next) =>{
    if(req.session.user){
        if(req.session.user.role === "admin"){
            return res.redirect("/administrator");
        }
        else if(req.session.user.role === "user"){
            return res.redirect("/user");
        }
    }
    next();
};

export const signupMiddleware = (req, res, next) =>{
    if(req.session.user){
        if(req.session.user.role === "admin"){
            return res.redirect("/administrator");
        }
        else if(req.session.user.role === "user"){
            return res.redirect("/user");
        }
    }
    next();
};

export const userMiddleware = (req, res, next) =>{
    if(!req.session.user){
        return res.redirect("/signinuser");
    }
    next();
};

export const adminMiddleware = (req, res, next) =>{
    if(!req.session.user){
        return res.redirect("/signinuser");
    }
    if(req.session.user.role !== "admin"){
        return res.status(403).render("error", {error: "You do not have permission to view this page", redirect: "/user"});
    }
    next();
};

export const signoutMiddleware = (req, res, next) => {
    if(!req.session.user){
        return res.redirect("/signinuser");
    }
    next();
};