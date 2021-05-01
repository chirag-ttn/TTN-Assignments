const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport  = require('passport')

const crypto = require('crypto')
const cors = require('cors')
const User = require('./models/user-model')
const fs = require('fs')
const cookie = require('cookie')
require('dotenv').config()
const app = express()
const router = require('./routes/user/user-routes')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
const db = require('./db');
const { pass } = require('./db');

// EXPRESS SESSION
const MongoStore = require('connect-mongo')
const sessionStore = new MongoStore({ mongoUrl: process.env.DB_STRING, collection: 'sessions' })

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 30
    } 
}));
// You can see session collection created in database
// ======EXPRESS SESSION CREATED==============

// ============PASSPORT===============

// WILL USE BCRYPT IN FUTURE



// ==========END PASSPORT============

// ==============JWT PASSPORT====================

// require('./passport/passport-jwt')(passport)

// ===============END JWT========================

// ==============PASSPORT LOCAL==================

// require('./passport/passport-local')(passport)

// ===============PASSPORT-LOCAL==================

// ===============PASSPORT FACEBOOK===============
require('./passport/passport-facebook')(passport)
// ===============PASSPORT FACEBOOK===============
app.use(passport.initialize())
app.use(passport.session())

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.get('/',(req,res)=>{    
    res.render('home.html')
})
app.get('/api/protected',
(req,res,next)=>{
    
        req.headers.authorization = cookie.parse(req.headers.cookie).name
    
        next()
    },
passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    res.render('auth.html')
})
app.get('/api/protectedlocal',passport.authenticate('local',{failureRedirect:'/api/protectedlocal/success',successRedirect:'/api/protectedlocal/failure'}),(err,req,res,next)=>{
    if(err) next(err)
})
app.get('/api/facebook',passport.authenticate('facebook',{ scope: ['email'] }),(req,res)=>{
    res.send('logged in')
})
app.get('/auth/facebook/callback',(req,res)=>{
    
    res.send('Authenticated by facebook')
})
app.get('/api/protectedlocal/success',(req,res)=>{
    res.send('You are allowed to acces this route and authenticated by local strategy')
})
app.get('/signup',(req,res)=>{
    res.render('signup.html')
})
app.get('/login',(req,res)=>{
    res.render('login.html')
})
app.get('/api/logout', (req, res, next) => {
    req.logout();
    res.redirect('/login');
});


app.use('/api',router)
app.listen(4444,()=>{
    console.log('server is running on port http://localhost:4444/')
})