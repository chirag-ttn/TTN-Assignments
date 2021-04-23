const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema

const User = new Schema(
    {
        username: { type: String, required: true },
        hash: {type:String},
        salt: {type:String}
        
    },
    { timestamps: true },
)


module.exports = mongoose.model('users', User)