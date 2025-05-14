const url = require('url')
const fs = require('fs')
const http = require('http')

http.createServer(function (req, res) {
    const query = url.parse(req.url, true);

    if (query.pathname == "/") {
        var filename = "./index.html"
    } else {
        var filename = "." + query.pathname + ".html";
    }

    fs.readFile(filename, function(err, data) {
    if (err) {
        fs.readFile("./404.html", function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    }
    });
}).listen(8080);