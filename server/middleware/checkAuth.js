const { rawListeners } = require("../models/User");

//This middleware checks if the user is logged in. If he is, then dashboard is valid, and if not, he cannot access the dashboard by putting the endpoint on the browser.
exports.isLoggedIn = (req,res,next)=>{
    if(req.user) {
        next();
    } else {
        return res.status(401).send('Access Denied');
    }
}