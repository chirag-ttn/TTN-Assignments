const user = require('./ItemService')

module.exports.create = async (req,res)=>{
    console.log('POST REQUEST TO /',req.body)
    const response = await user.create(req.body)//Request will go to Service
    res.send(response)
}

module.exports.getAll = async (req,res)=>{
    const response = await user.getAll();
    res.send(response)
}

module.exports.update = async (req,res)=>{
    console.log("PATCH REQUEST",req.query,req.params)
    const response = await user.update(req.params,req.query);
    res.send(response)
}
module.exports.delete = async (req,res)=>{
    const response = await user.delete(req.params);
    res.send(response)
}
