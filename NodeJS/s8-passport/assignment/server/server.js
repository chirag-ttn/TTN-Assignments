const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport  = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto')
const cors = require('cors')
const User = require('./models/user-model')
const fs = require('fs')
require('dotenv').config()
const app = express()


const router = require('./routes/user/user-routes')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
const db = require('./db');
const { pass } = require('./db');

// EXPRESS SESSION
// const MongoStore = require('connect-mongo')
// const sessionStore = new MongoStore({ mongoUrl: process.env.DB_STRING, collection: 'sessions' })

// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie: {
//         maxAge: 1000 * 30
//     } 
// }));
// You can see session collection created in database
// ======EXPRESS SESSION CREATED==============

// ============PASSPORT===============

// WILL USE BCRYPT IN FUTURE
// function validPassword(password, hash, salt) {
//     var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
//     return hash === hashVerify;
// }


// passport.use(new LocalStrategy(
    
//     function(username, password, cb) {
        
//         User.findOne({ username: username })
//             .then((user) => {

//                 if (!user) { return cb(null, false) }
                
//                 // Function defined at bottom of app.js
//                 console.log(user)
//                 const isValid = validPassword(password, user.hash, user.salt);
                
//                 if (isValid) {
//                     return cb(null, user);
//                 } else {
//                     return cb(null, false);
//                 }
//             })
//             .catch((err) => {   
//                 cb(err);
//             });
// }));

// passport.serializeUser(function(user, cb) {
//     cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//     User.findById(id, function (err, user) {
//         if (err) { return cb(err); }
//         cb(null, user);
//     });
// });


// app.use(passport.session());
// ==========END PASSPORT============

// ==============JWT PASSPORT====================

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const PUB_KEY = fs.readFileSync('../id_rsa_pub.pem', 'utf8');

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
passport.use(strategy);
app.use(passport.initialize())
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
// ===============END JWT========================
app.get('/',(req,res)=>{    
    res.render('home.html')
})
app.get('/signup',(req,res)=>{
    res.render('signup.html')
})
app.get('/login',(req,res)=>{
    res.render('login.html')
})
app.get('/api/logout', (req, res, next) => {
    req.logout();
    res.redirect('/api/logout-success');
});
app.get('/api/logout-success', (req, res, next) => {
    console.log(req.session)
    res.send('Succesfully logged out')
});

app.get('/api/login-success', (req, res, next) => {
    console.log(req.session);
    res.send('You successfully logged in.');
});

app.get('/api/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});


app.use('/api',router)
app.listen(4444,()=>{
    console.log('server is running on port http://localhost:4444/')
})