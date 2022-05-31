const fetch = require('axios');
const fs = require('fs');


fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then((response) => {
        console.log('Api usada y documento creado');

        var data = response.data.bpi
        var currencyList = [
                    `Currency: ${data.USD.code} | `+ `Rate: ${data.USD.rate} | `+ `Description: ${data.EUR.description}`+"\n",
                    `Currency: ${data.GBP.code} | `+ `Rate: ${data.GBP.rate} | `+ `Description: ${data.GBP.description}`+"\n",
                    `Currency: ${data.EUR.code} | `+ `Rate: ${data.EUR.rate} | `+ `Description: ${data.EUR.description}`+"\n",      
                ]      

       fs.writeFile('bitcoinCurrency.docx', currencyList.toString(), (error) =>{
        if (error){
            console.log(error);
            return;
        }
    })
 
    })

    