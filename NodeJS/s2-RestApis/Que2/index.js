
const http = require('http');
const url = require('url');
const port = 4000 || process.env.PORT;
const students = [
    { username: 'chirag', lastname: 'gandhi', branch:'IT'},
    { username: 'nikhil', lastname: 'sarin' , branch:'CSE'},
    { username: 'saksham', lastname: 'gandhi' , branch:'CSE'},
    { username: 'aman', lastname: 'kalra' , branch:'ECE'}
]

const server = http.createServer((req, res) => {
    
    const new_url = url.parse(req.url, true)
    const [path, query] = [new_url.pathname, new_url.query]
    console.log(new_url,path,query)
    res.writeHead(200, 'ok', { 'Content-Type': 'text/html' })
    if (query===null && path === '/') {
        res.write('<h1>Students Home Page</h1>')
        res.end()
    }
    else if (query===null && path === '/students') {
        res.write(JSON.stringify(students))
        res.end()
    }
    else if(query!==null && path === '/students'){
        
        const branch = new_url.query.branch
        console.log(branch)
        let ans = {}
        ans = students.filter((s)=>{
            return s.branch===branch
        })
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.write(JSON.stringify(ans))

        res.end()
    }



})
server.listen(port, () => {
    console.log('listening',port)
});