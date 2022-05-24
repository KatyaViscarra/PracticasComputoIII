//referenciar al modulo creado
/*const modulo = require("./firstModule");

console.log(modulo.propiedad);
modulo.saludar();

//modulos core
var data = [
    {
        a: 25,
        b: 32
    },
    {
        a: 72,
        b: 50
    }
];

console.log(data);
console.table(data);

//console group
console.group('Bloque');
console.log("Hola");
console.log("Hola");
console.log("Hola");
console.groupEnd('Bloque');*/

/*var fs = require('fs');
var parse = require('csv-parse');
var parser = parse.parse({columns: true}, function(err, records){
    console.log(records);
})
//fs.createReadStream(__dirname+'/lista.csv').pipe(parser);*/

var stringify = require('csv-stringify');
var someData = [
    {
        "Country": "El Salvador",
        "Official Language": "Spanish"
    },
    {
        "Country": "Nigeria",
        "Official Language": "English"
    },
    {
        "Country": "India",
        "Official Language": "Hindi, English"
    }
]

stringify.stringify(someData, {
    header: true
}, function (err, output) {
    fs.writeFileSync('./data.csv', output);
})