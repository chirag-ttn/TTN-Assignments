const express = require('express')

const cors = require('cors')
const router = express.Router()
const utils = require('../../utils')
const User = require('../../controllers/user-controller')
//================ SETTING UP HEADERS MANUALLY==================
// function middle(req,res,next){
//     console.log('Middleware ran')
//     res.header({"Access-Control-Allow-Origin":"*"
//     ,'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'})
//     next()
// }


var passport = require('passport');

router.use(cors())
router.post('/signup', User.createUser)
// router.post('/login',passport.authenticate('local',{successRedirect:'/login-success',failureRedirect:'/login-failure'}),(err,req,res,next)=>{
//     if(err) next(err)
// })
router.post('/login', User.findUser);
// router.get('/protected', passport.authenticate('jwt',{session:false}), (err, req, res, next) => {
//     res.status(200).send('You are authenticated via jwt')
//     if (err) next(err)
// })
router.get('/protected',(req,res,next)=>{
    console.log(req.headers.authorization)

    next()
},passport.authenticate('jwt',{session:false}))
module.exports = router;