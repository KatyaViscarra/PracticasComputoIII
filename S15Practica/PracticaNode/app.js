/*process.argv.forEach((index, val) => {
    console.log(`${index}: ${val}`);
});*/

//console.log("PROCESS: ", process);
//console.log('titulo del proceso', process.title);
//console.log('so', process.platform);
//console.log('version node', process.version);

const name = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

name.question("Cual es su nombre? ", name => {
    console.log(`Bienvenido ${name}`)
})