var basePath = __dirname;

var http = require('http');
var fs = require('fs');
var url = require('url')
var path = require('path');

http.createServer(function(req, res) {
    var new_url = url.parse(req.url)
    console.log(new_url)
    var {pathname, query} = new_url
    let fileName = ''
    if(pathname==='/')
    {
        fileName = '/index.html'
    }
    else if(pathname==='/home')
    {
        //render home.html
        fileName = '/home.html'
    }

    else if(pathname==='/about')
    {
        //render home.html
        fileName = '/about.html'
    }

    else if(pathname==='/contact')
    {
        //render home.html
        fileName = '/contact.html'
    }
    else{
        // res.writeHead(404,'notFound')
        res.writeHead(404,'notok')
        res.end()
    }
    var stream = fs.createReadStream(path.join(basePath, fileName));
    stream.on('error', function() {
        res.writeHead(404);
        res.end();
    });
    stream.pipe(res);
}).listen(9999);