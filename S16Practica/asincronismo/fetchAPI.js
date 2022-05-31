const fetch = require('node-fetch');
const fs = require('fs');

/*fetch('https://restcountries.com/v2/all')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
    });*/

    /*async function getCountries() {
        const response = await fetch('https://restcountries.com/v2/all');
        const data = await response.json();
        console.log(data)
    }*/

    async function getCountries() {
        try {        
            const response = await fetch('https://restcountries.com/v2/all');
            const data = await response.json();
            let countriesList = "";
            data.forEach(country => {
                countriesList+= `${country['name']}`;
            });

            //crear archivo
            fs.writeFile('countries.csv', countriesList, (error) => {
                if(error){
                    console.log(error);
                    return;
                }
                console.log('Se ha creado el archivo')
            })

            //console.log(data)
        }catch(error){
            console.log(error)
        }
    }

    //ejecutamos la funcion asincrona
    getCountries();