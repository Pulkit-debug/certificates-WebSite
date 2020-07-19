const http = require("http");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const exphb = require("express-handlebars");
const nodemailer = require("nodemailer");
// const express = require("express");

const app  = express();

// view engine setup
app.engine("handlebars", exphb());
app.set("view engine", "handlebars");


// static folder
app.use("/public", express.static(path.join(__dirname, "public")));

//body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const host = "127.0.0.1";
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
        console.log("js is working");
    }
    else if(url == "/contact") {
        res.end(contact);
    }
    else {
        res.end("<h1><String>404</strong> Page not found!!!</h1>");
    }

});

function details() {
    var name = document.getElementById("input-name").value;
    console.log(name);
}

server.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});

