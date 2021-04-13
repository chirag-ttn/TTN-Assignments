
const http = require('http');
const url = require('url');
const person = [
    { username: 'chirag', lastname: 'gandhi' },
    { username: 'nikhil', lastname: 'sarin' },
    { username: 'saksham', lastname: 'gandhi' },
    { username: 'aman', lastname: 'kalra' }
]

const server = http.createServer((req, res) => {
    const baseURL = req.url;
    res.writeHead(200, 'ok', { 'Content-Type': 'text/html' })
    if (baseURL === '/') {
        res.write('<h1>Home Page</h1>')
        res.end()
    }
    else if (baseURL === '/users') {
        res.writeHead(200,'ok',{
        'Content-Type':'application/json'
        })
        res.write(JSON.stringify(person))
        res.end()
    }
    else{
        const path = url.parse(req.url, true)
        const username = path.query.username
        console.log(username)
        let ans = {}
        for (let p in person) {
            if (person[p].username == username) {
                ans = person[p]
            }

        }
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.write(JSON.stringify(ans))

        res.end()
    }



})
server.listen(8000, () => {
    console.log('listening')
});