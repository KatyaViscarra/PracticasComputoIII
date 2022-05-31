const {empresas} = require("./functions.js");

console.log("Empresas que utilizan Node.js:")
empresas.forEach((empresas) => {
    console.log("- ", empresas);
});
