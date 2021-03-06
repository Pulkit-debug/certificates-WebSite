const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactFromCert', {useNewUrlParser: true});

const localhost = "127.0.0.1";
const port = 80;

// Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
  });

  const contact = mongoose.model('contact', contactSchema);



//express related stuff
const app = express();
app.use("/static", express.static("static"));
app.use(bodyParser.urlencoded({extended: true}));  // this is to bring the data collected by html forms 


//pug related stuff
app.set("view engine", "pug");  // setting up the view engine for pug
app.set("views", path.join(__dirname, "views"));    // setting up the views directory


// creating server for serving up index.html

// const home = fs.readFileSync(__dirname + "/index.html");

// const server = http.createServer((req,res) => {
//     const url = req.url;
//     if(url == "/" || url == "/home") {
//         res.end(home);
//     }
//     else {
        
//     }
// });
//other get/post stuff
app.get("/", (req, res)=> {
    const details = "This is some content";
    // This is how we can pass varibles 
    const params = {"title": "We are using Pug", "content": details};
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/college_cert.html", (req, res) => {
    // res.status(200).render("college_cert.pug");
    res.sendFile(path.join(__dirname + "/college_cert.html"));
});

app.get("/other_cert.html", (req, res) => {
    // res.status(200).render("other_cert.pug");
    res.sendFile(path.join(__dirname + "/other_cert.html"));
});

app.get("/instagram.html", (req, res) => {
    // res.status(200).render("instagram.pug");
    res.sendFile(path.join(__dirname + "/instagram.html"));
});

app.post("/", (req, res) => {
    var contactData = new contact(req.body);
    // .save() functions returns a promise so we have to use .then after that
    // and if some error occurs then in that case we can use .catch
    contactData.save().then(() => {
        res.send("Your contact details has been saved to my database!!");
    }).catch(() => {
        res.status(400).send("Your details are not submitted kindly mail me explicitly!!");
    })
    // const params = {};
    // res.sendFile(path.join(__dirname + "/index.html"), params);
})

let name;
let email;
let message;
app.post("/", (req, res)=> {
     name = req.body.name;
     email = req.body.email;
     message = req.body.message;

    let details = `name: ${name},      email: ${email},     message: ${message}`
    fs.writeFileSync("contacter-details.txt", details);
    const param = {"message": "Your Details have been submitted successfully!!"};
    res.status(200).render("index.pug", param);

});


// start the server
app.listen(port, ()=> {
console.log(`Server has started on port ${port}`);
});