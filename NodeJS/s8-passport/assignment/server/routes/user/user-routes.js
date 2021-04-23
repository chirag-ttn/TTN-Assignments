const express = require('express')

const cors = require('cors')
const router = express.Router()

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
router.post('/login',passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: 'login-success' }),(err,req,res,next)=>{
    if(err) next(err)
})
module.exports = router;