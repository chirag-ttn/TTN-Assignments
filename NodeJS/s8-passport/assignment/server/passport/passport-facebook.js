const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (passport) => {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:4444/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
        function (accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                return cb(err, user);
            });
        }
    ))
    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });
    
    passport.deserializeUser(function(id, cb) {
        User.findById(id, function (err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });
}