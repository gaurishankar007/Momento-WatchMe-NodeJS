// Importing installed packages.....
const express = require("express");
const router = new express.Router();

// Importing self made js files....
const profile = require("../models/profileModel.js");
const user = require("../models/userModel.js");
const auth = require("../auth/auth.js");

router.post("/profile/add/:user_id", auth.verifyUser, (req, res)=> {
    const newProfile = new profile({
        user_id: req.params.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        hobbies: req.body.hobbies,
        biography: req.body.biography,
    });
    newProfile.save().
    then(function(){
        res.json({message: "Profile successfully added."})
    })
    .catch(function(e) {
        res.json(e);
    });
   
});

router.put("/profile/update/:profile_id", auth.verifyUser, (req, res)=> {
    profile.updateOne({_id: req.params.profile_id}, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        hobbies: req.body.hobbies,
        biography: req.body.biography,
        }
    )
    .then(function(){
        res.json({message: "Profile successfully updated."})
    }) 
    .catch(function(e) {
        res.json(e);
    });
});

module.exports = router;