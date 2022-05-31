const {nombres, edades} = require("./functions.js");

console.log("Listado de nombres:")
nombres.forEach((nombres) => {
    console.log("- ", nombres);
});

console.log("Listado de edades:")
edades.forEach((edades) => {
    console.log("- ", edades);
});