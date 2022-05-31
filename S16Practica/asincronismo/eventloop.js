function fFirst(){
    console.log("Primera funcion");
}

function sSecond(callback){
    setTimeout(() => {//funcion anonima
        console.log("Segunda funcion");
        callback();
    }, 5)
}

function sThird(){
    console.log("Tercera funcion");
}

//llamado a las funciones
fFirst();
sSecond(sThird);
//sThird();