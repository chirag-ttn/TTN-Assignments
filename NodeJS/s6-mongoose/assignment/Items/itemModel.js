const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const itemSchema = new Schema({
    name:{
        type:String,
        required:[true,'Please enter the name']
    },
    quantity:{type:Number,required:[true,'Please enter the quantity']},
    isSanitized:{type:Boolean},
    unit:{type:String,required:[true,"Please enter the units"]},
    expiryDate:{type:Date}, 
    createdDate:{type:Date,default:Date.now()},
    updatedDate:{type:Date,default:Date.now()},
    category:[String],
    location:[String]
})

const ItemModel = mongoose.model('Items',itemSchema)

module.exports = {
ItemModel
}