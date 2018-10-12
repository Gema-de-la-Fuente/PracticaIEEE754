//fichero hikerTest.js
'use strict';

const hiker = require('./hiker.js');

describe('Pruebas sencillas', () => {
  it('Prueba entero', () => {
    hiker.ieee754aBinario("123").should.equal("01000010111101100000000000000000");
  });
    it('Prueba entero cadena', () => {
    hiker.ieee754aBinario(123).should.equal("01000010111101100000000000000000");
  });
});

describe('Pruebas números pequeños', () => {
  it('Prueba precisión', () => {
    hiker.ieee754aBinario(4.000015).substring(0,23-5).should.equal("01000000100000000000000000011111".substring(0,23-5));
  });
    it('Prueba centesimas ', () => {
    hiker.ieee754aBinario("0.008544921875").substring(0,23-5).should.equal("00111100000011000000000000000000".substring(0,23-5));
  });
    it('Prueba negativo', () => {
    hiker.ieee754aBinario("-0.006").substring(0,23-5).should.equal("10111011110001001001101110100110".substring(0,23-5));
  });  
      it('Prueba 0', () => {
    hiker.ieee754aBinario("0").should.equal("00000000000000000000000000000000");
  });
     it('Prueba -0', () => {
    hiker.ieee754aBinario("-0").should.equal("10000000000000000000000000000000");
  });
       it('Prueba -5.3333282', () => {
    hiker.ieee754aBinario("-5.3333282470703125").should.equal("11000000101010101010101010100000");
  });

});

describe('Pruebas codewars', () => {
    it('Prueba -666.01', () => {
    hiker.ieee754aBinario("-666.01").substring(0,23-5).should.equal("11000100001001101000000010100100".substring(0,23-5));
  });
    it('Prueba 1', () => {
    hiker.ieee754aBinario(1).substring(0,23-5).should.equal("00111111100000000000000000000000".substring(0,23-5));
  });
      it('Prueba 0.0001', () => {
    hiker.ieee754aBinario(0.0001).substring(0,23-5).should.equal("00111000110100011011011100010111".substring(0,23-5));
  });
       it('Prueba 0.606', () => {
    hiker.ieee754aBinario(0.606).substring(0,23-5).should.equal("00111111000110110010001011010001".substring(0,23-5));
  });
        it('Prueba 12345678 ', () => {
    hiker.ieee754aBinario(12345678).substring(0,23-5).should.equal("01001011001111000110000101001110".substring(0,23-5));
  }); 


});



describe('Pruebas notación exponencial', () => {
  it('Exponencial', () => {
    hiker.ieee754aBinario(2.861023E-6).should.equal("00110110010000000000000000000000");
  });
    it('Número más grande', () => {
    hiker.ieee754aBinario(3.4028172E38).substring(0,23-5).should.equal("01111111011111111111111111100000".substring(0,23-5));
  });
    it('Número más pequeño', () => {
    hiker.ieee754aBinario(1.17549435E-38).substring(0,23-5).should.equal("00000000100000000000000000000000".substring(0,23-5));
  });
});



