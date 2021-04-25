const User = require('../models/user-model')
const crypto = require('crypto')
const utils = require('../utils')
const cookie = require('cookie')

createUser = (req, res) => {
    console.log('Req',req.body)
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        name:req.body.name,
        username: req.body.email,
        hash: hash,
        salt: salt
    });
    console.log(newUser)
    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/login');



}


findUser = (req, res,next) => {
    User.findOne({ username: req.body.email })
        .then((user) => {

            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }

            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

            if (isValid) {

                const tokenObject = utils.issueJWT(user);
                
                res.setHeader('Set-cookie', cookie.parse( tokenObject.token, {
                    decode:decodeURIComponent,
                    maxAge: 1000*60*30 //30 min
                  }));
                // res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
                
                res.redirect('/api/protected')
                

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    createUser,
    findUser
}