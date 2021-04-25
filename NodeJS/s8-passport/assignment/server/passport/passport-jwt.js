
const fs = require('fs');
const User = require('../models/user-model')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const PUB_KEY = fs.readFileSync('/home/ttn/Desktop/TTN-Assignments/NodeJS/s8-passport/assignment/id_rsa_pub.pem', 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};
const strategy = new JwtStrategy(options, function(jwt_payload,done) {
    console.log('HERE')    
    console.log(jwt_payload);
    
    // We will assign the `sub` property on the JWT to the database ID of user
    User.findOne({_id: jwt_payload.sub}, function(err, user) {
        
        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        if (err) {
            return done(err, false);
        }
        if (user) {
            
            return done(null, user);
        } else {
            return done(null, false);
        }
        
    });
    
})
module.exports = (passport)=>{
    passport.use(strategy)
}


// app.js will pass the global passport object here, and this function will configure it
