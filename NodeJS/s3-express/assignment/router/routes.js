const handleData = (data,value)=>{
    const date = new Date().getTime()
    value['date'] = date
    data.push(value)
}
module.exports = (app,data)=>{
    
    app.get('/',(req,res)=>{
        res.redirect('/home')
    })
    app.get('/home',(req,res)=>{
        res.sendFile('/home/ttn/Desktop/TTN-Assignments/NodeJS/s3-express/assignment/views/home.html')
    })
    app.get('/form',(req,res)=>{
        res.sendFile('/home/ttn/Desktop/TTN-Assignments/NodeJS/s3-express/assignment/views/form.html')
    })
    app.post('/form',(req,res)=>{
        handleData(data,req.body)
        res.redirect('/home')
    })
    app.get('/data',(req,res)=>{
        res.send(data)
    })
    app.delete('/data',(req,res)=>{
        
        const date = req.body.key;
        // console.log(typeof date,typeof data[0].date)
        data = data.filter((d)=>d.date!=date)
        
        
    },()=>{
        res.redirect('/data')
    })
    app.get('/about',(req,res)=>{
        res.sendFile('/home/ttn/Desktop/TTN-Assignments/NodeJS/s3-express/assignment/views/About.html')
    })
}