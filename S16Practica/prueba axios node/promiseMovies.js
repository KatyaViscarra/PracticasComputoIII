const request = require('request'); 
const fs = require('fs'); 
 
request('https://api.coindesk.com/v1/bpi/currentprice.json', (error, response, body) => { 
    if (error) { 
        console.error(`Could not send request to API: ${error.message}`); 
        return; 
    } 
 
    if (response.statusCode != 200) { 
        console.error(`Expected status code 200 but received 
${response.statusCode}.`); 
        return; 
    } 
 
    console.log('Processing our list of movies'); 
    movies = JSON.parse(body); 
    let movieList = ''; 
    Array.from(movies).forEach(movie => { 
        movieList += `${movie['time']}, ${movie['bpi']}\n`; 
    }); 
 
    fs.writeFile('callbackMovies.csv', movieList, (error) => { 
        if (error) { 
            console.error(`Could not save the Ghibli movies to a file: ${error}`); 
            return; 
        } 
 
        console.log('Lista de películas guardad en callbackMovies.csv');; 
    }); 
}); 
 