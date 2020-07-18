const http = require("http");
const fs = require("fs");

const localhost = "12.0.0.1";
const port = 28;

const home = fs.readFileSync(__dirname + "/index.html");
const about = fs.readFileSync(__dirname + "/about.html");
const contact = fs.readFileSync(__dirname + "/contact.html");

const server = http.createServer((req, res) => {
    const url = req.url;
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    if(url == "/" || url == "/home") {
        res.end(home);
    }
    else if(url == "/about") {
        res.end(about);
    }
    else if(url == "/contact") {
        res.end(contact);
    }
    else {
        res.end("<h1><String>404</strong> Page not found!!!</h1>");
    }

});

server.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});

