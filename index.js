
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const session = require('express-session');
const flash = require("express-flash");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser("qualquercoisa"))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(flash());

app.get("/", (req, res) => {

    var emailError = req.flash("emailError", emailError);
    var nomeError = req.flash("nomeError", nomeError);
    var pontosError = req.flash("pontosError", pontosError);

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;

    res.render("index.ejs", {emailError, pontosError, nomeError});  
});

app.post("/form", (req, res) => {
    const { email, nome, pontos} = req.body;

    var emailError;
    var nomeError;
    var pontosError;

    if(email == undefined || email == ""){
        emailError = "O EMAIL NÃO PODE SER VAZIO"
    }

    if(pontos == undefined || pontos < 20){
        pontosError = "PONTOS NÃO PODE SER MENOR QUE 20"
    }

    if(nome == undefined || nome == ""){
    nomeError = "NOME NÃO PODE SER VAZIO"
    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        req.flash("emailError", emailError);
        req.flash("nomeError", nomeError);
        req.flash("pontosError", pontosError);
        res.redirect("/");
    }else{
        res.send("Ocorreu tudo certo!")
    }

});

app.listen(3000, () =>{
    console.log("Rodando!")
});