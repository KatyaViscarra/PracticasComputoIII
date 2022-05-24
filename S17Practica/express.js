var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send("Programación IV");
});

app.listen(8080, function(){
    console.log("Aplicacion ejemplo con express, ejecutandose en el puerto 8080")
});