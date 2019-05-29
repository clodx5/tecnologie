// moduli utilizzati dal progetto
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var MongoClient = require('mongodb').MongoClient;
app.set('views', './views');
app.set('view engine', 'pug');
var fs = require('fs');
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'JL7r7Alzj1',
    password: '9JRi16NSDO',
    database: 'JL7r7Alzj1'
});



//gestione registrazione
app.post('/registrazione', function (req, res) {
    
    var nome = req.body.nome; 
    var cognome = req.body.cognome; 
    var dataN = req.body.dataN; 
    var email = req.body.email;
    var user = req.body.user; 
    var pw = req.body.pw; 
    var cc = req.body.cc;
    
        
    //inserimento nel db 
    conn.connect( function(err){
        if(err) throw err;
        conn.query('INSERT INTO Noleggio_utenti (nome, cognome, data_nascita, email, username, password, carta_credito) VALUES ("'+nome+'","'+cognome+'","'+dataN+'","'+email+'","'+user+'","'+pw+'","'+cc+'");', function(err, resu, fields){
            if(err) throw err;
            if (resu.length>0) {
                console.log("Utente "+user+" inserito.");
                res.send(1);
            } else {
                console.log("Errore nell'inserimento di: "+user);
                res.send(0);
            }
        });    
    });
    
});


//gestione login
app.post('/login', function (req, res) {
    var user = req.body.user;
    var pw = req.body.pw;
    
    conn.connect( function(err){
        if(err) throw err;
        conn.query('SELECT * FROM Noleggio_utenti WHERE username="'+user+'" AND password="'+pw+'";', function(err, resu, fields){
            if(err) throw err;
            if (resu.length>0) {
                console.log("Login eseguito");
                res.send(1);
            } else {
                console.log("Credenziali errate");
                res.send(0);
            }
        });    
    });
    
});


app.listen(3000, function () {
  console.log('Server attivo');
});


