const edad = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

edad.question("¿Cual es su edad? ", edad => {
    console.log(`Su edad es ${edad} años`)
})