var float2bin = function(input) {
  return ieee754aBinario(input);
}

var resultado;
var indicePuntoBinario;
var numBinario='';
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


function decimal_binario_ent(numero){
    numBinario="";
    var contenedorGirado ='';
    
console.log("-----ParteEntera 1 - " + numero);

    while(numero/2>0){
        contenedorGirado = numero%2 + contenedorGirado;
        numero = Math.floor(parseFloat(numero/2)); 
    }
    
    numBinario = contenedorGirado;

    return contenedorGirado;
}

function decimal_binario_dec(numero){
    var contenedorDecimal ='';
    
    while(numero>0){
        numero = (numero*2);
        contenedorDecimal += Math.trunc(numero);
        numero -= Math.trunc(numero);
    }

    numBinario = numBinario + "." + contenedorDecimal;
}

//guarda indice del punto y lo borra reemplaza el punto por nada
function normalizarBinario(){

    if(typeof (numBinario.indexOf(".")) === 'number'){
        indicePuntoBinario = numBinario.indexOf(".")+1;
        numBinarioNormalizado = numBinario.replace(".", "");
    }
    
    numBinarioNormalizado = numBinarioNormalizado.replace("1", "1.");
    
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
        //signo(num);
        resultado += "0000000000000000000000000000000";
    }
    else{
        //signo(num);
        num=Math.abs(num);
        separarNumero(num);
        normalizarBinario();
        exponente();
        mantisa();    
    }

    return resultado;
}