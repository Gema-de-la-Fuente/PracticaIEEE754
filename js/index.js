"use strict";

document.getElementById("enviar").addEventListener("click",function(e){
    var numero = document.getElementById("numero").value;

    var solucion = ieee754aBinario(numero);

    document.getElementById("solucion").innerHTML = solucion;
});

var resultado; /* signo + exponente + mantisa */
var indicePuntoBinario; /* posicion de la coma en el numero binario */
var numBinario=''; /* parte entera . parte decimal */
var numBinarioNormalizado;

//funcion que pasa a binario el signo del número
function signo(numero){
    resultado = (numero.charAt(0) === '-') ? '1' : '0';
}

function separarNumero(numero){
    numBinario="";
    /* separamos parte entera y parte decimal, y pasamos cada parte a binario */
    var parteEntera = Math.trunc(numero);
    var parteDecimal = numero - parteEntera;

    decimal_binario_ent(parteEntera);
    decimal_binario_dec(parteDecimal);
}

/* Para pasar la parte entera a binario, concatenamos el resto (0 o 1), y dividimos entre 2 */
/* Como no se nos permite usar funciones de array, para dar la vuelta 
 al numero concatenamos el binario en orden inverso.
 Otra forma seria concatenar en orden normal y usar las funciones:
 contenedor.split("").reverse().join("");
*/
function decimal_binario_ent(numero){
    numBinario="";
    var contenedorGirado ='';
    
console.log("-----ParteEntera 1 - " + numero);

    while(numero/2>0){
        contenedorGirado = numero%2 + contenedorGirado;
        numero = Math.floor(parseFloat(numero/2)); 
    }
    
    /* Guarda en la variable numBinario la parte entera, 
     para luego concatenarle la decimal si la hubiera*/
    numBinario = contenedorGirado;

    /* Como tambien se llama desde la funcion de exponente, 
     devolvemos el valor */
    return contenedorGirado;
}

/* Para pasar la parte decimal la multiplicamos x2 y 
 concatenamos la parte entera (en orden normal) */
function decimal_binario_dec(numero){
    var contenedorDecimal ='';
    
    while(numero>0){
        numero = (numero*2);
        contenedorDecimal += Math.trunc(numero);
        numero -= Math.trunc(numero);
    }

    /* una vez calculado se lo concatenamos al numBinario, 
     enlazado con la coma */
    numBinario = numBinario + "." + contenedorDecimal;
}

//guarda indice del punto y lo borra reemplaza el punto por nada
function normalizarBinario(){

    if(typeof (numBinario.indexOf(".")) === 'number'){
        indicePuntoBinario = numBinario.indexOf(".")+1;
        numBinarioNormalizado = numBinario.replace(".", "");
    }
    
    numBinarioNormalizado = numBinarioNormalizado.replace("1", "1.");
    //return numBinarioNormalizado;
}

function exponente(){
    
    var indicePuntoNormalizado = numBinarioNormalizado.indexOf(".")+1;
    
    var numPosicion = indicePuntoBinario-indicePuntoNormalizado;
    var estandarPrecision = numPosicion + 127;
    var exponenteBinario = decimal_binario_ent(estandarPrecision);

    if(exponenteBinario.length<8){
        var numCeros = 8 - exponenteBinario.length;
        for(var i=0; i<numCeros; i++){
            exponenteBinario = 0+exponenteBinario;
        }
    }
    resultado += exponenteBinario;
    return resultado;
}

function mantisa(){
    // para casos con numeros muy pequeños (p.e. 0.0001) el binario queda del tipo
    // 0000000000000 1101000110110111000101110101100011100010000110010
    // para colocarnos en el 1 y eliminar los ceros de sobra reemplazamos todos* los 0s(puede haber o no) y el 1.
    // antes: replace("1.","");
    // ayuda de regexp: https://regexr.com/ 
    numBinarioNormalizado = numBinarioNormalizado.replace(/0*?1\./,"");
    if(numBinarioNormalizado.length<23){
        var numCeros = 23 - numBinarioNormalizado.length;
        for(var i=0; i<numCeros; i++){
            numBinarioNormalizado += 0;
        }

        resultado += numBinarioNormalizado;
    }else if(numBinarioNormalizado.length>23){
        resultado += numBinarioNormalizado.substring(0,23);

    }else{
        resultado += numBinarioNormalizado;
    }

    return resultado;
}

function ieee754aBinario(numero) {
    //para poder comprobar el -0
    if (typeof(numero) !== "string"){
        numero = numero.toString();
    }
    signo(numero);
    var num = parseFloat(numero);
    // casos especiales: No es un numero o es el 0
    if(isNaN(num)){
        resultado = "Error: debe insertar un número";
    }
    else if(num===0){
        resultado += "0000000000000000000000000000000";
    }
    else{
        num=Math.abs(num);
        separarNumero(num);
        normalizarBinario();
        exponente();
        mantisa();    
    }

    return resultado;
}