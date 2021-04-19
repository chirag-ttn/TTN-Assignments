const {ItemModel} = require('./itemModel.js')//Service will go to model

module.exports.create = async ({
    name,
    quantity,
    isSanitized,
    unit,
    expiryDate,
    createdDate,
    updatedDate,
    category,
    location
    
}) => {
    // console.log(req.body)
    const user = await ItemModel.create({
        name: name,
        quantity: quantity,
        isSanitized: isSanitized,
        unit: unit,
        expiryDate: expiryDate,
        createdDate: createdDate,
        updatedDate: updatedDate,
        category: category,
        location: location
    })
    return user;
}
module.exports.getAll = async ()=>{
    const users = await ItemModel.find()
    return users
}

module.exports.update = async ({id},{firstName})=>{
    const users = await ItemModel.updateOne({_id:id},{name:firstName})
    return users;
}
module.exports.delete = async ({id})=>{
    const users = await ItemModel.deleteOne({_id:id})
    return users;
}
