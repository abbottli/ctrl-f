"use strict";

// four width variations. used to draw out letters, easier than rewriting the arrays a bunch of times
var ____ = [false, false, false, false],
    o___ = [true, false, false, false],
    oo__ = [true, true, false, false],
    ooo_ = [true, true, true, false],
    oooo = [true, true, true, true],
    _oo_ = [false, true, true, false],
    o__o = [true, false, false, true],
    o_oo = [true, false, true, true],
    __o_ = [false, false, true, false],
    o_o_ = [true, false, true, false],
    oo_o = [true, true, false, true],
    ___o = [false, false, false, true],
    // five width 
    o___o = [true, false, false, false, true],
    oo_oo = [true, true, false, true, true],
    o_o_o = [true, false, true, false, true],
    _o_o_ = [false, true, false, true, false],
    __o__ = [false, false, true, false, false],
    // three width
    ooo = [true, true, true],
    _o_ = [false, true, false],
    __o = [false, false, true],
    o__ = [true, false, false],
    ___ = [false, false, false];
var PIXEL = {
  'A' : [ 
    _oo_,
    o__o,
    o__o,
    oooo,
    o__o 
  ],
  'B' : [ 
    oooo,
    o__o,
    ooo_,
    o__o,
    oooo
  ],
  'C' : [ 
    oooo,
    o___,
    o___,
    o___,
    oooo
  ],
  'D' : [ 
    ooo_,
    o__o,
    o__o,
    o__o,
    ooo_
  ],
  'E' : [ 
    oooo,
    o___,
    oooo,
    o___,
    oooo
  ],
  'F' : [ 
    oooo,
    o___,
    oooo,
    o___,
    o___
  ],
  'G' : [ 
    oooo,
    o___,
    o_oo,
    o__o,
    oooo
  ],
  'H' : [ 
    o__o,
    o__o,
    oooo,
    o__o,
    o__o
  ],
  'I' : [ 
    ooo,
    _o_,
    _o_,
    _o_,
    ooo
  ],
  'J' : [ 
    oooo,
    __o_,
    __o_,
    __o_,
    ooo_
  ],
  'K' : [ 
    o__o,
    o_o_,
    oo__,
    o_o_,
    o__o
  ],
  'L' : [ 
    o___,
    o___,
    o___,
    o___,
    oooo
  ],
  'M' : [ 
    o___o,
    oo_oo,
    o_o_o,
    o___o,
    o___o
  ],
  'N' : [ 
    o__o,
    oo_o,
    o_oo,
    o__o,
    o__o
  ],
  'O' : [ 
    _oo_,
    o__o,
    o__o,
    o__o,
    _oo_
  ],
  'P' : [ 
    ooo_,
    o__o,
    o__o,
    ooo_,
    o___
  ],
  'Q' : [ 
    _oo_,
    o__o,
    o__o,
    _oo_,
    ___o
  ],
  'R' : [ 
    ooo_,
    o__o,
    o__o,
    ooo_,
    o__o
  ],
  'S' : [ 
    oooo,
    o___,
    oooo,
    ___o,
    oooo
  ],
  'T' : [
    ooo,
    _o_,
    _o_,
    _o_,
    _o_
  ],
  'U' : [ 
    o__o,
    o__o,
    o__o,
    o__o,
    _oo_
  ],
  'V' : [ 
    o___o,
    o___o,
    o___o,
    _o_o_,
    __o__
  ],
  'W' : [ 
    o___o,
    o___o,
    o___o,
    o_o_o,
    _o_o_
  ],
  'X' : [ 
    o___o,
    _o_o_,
    __o__,
    _o_o_,
    o___o
  ],
  'Y' : [ 
    o___o,
    _o_o_,
    __o__,
    __o__,
    __o__
  ],
  'Z' : [
    ooo,
    __o,
    _o_,
    o__,
    ooo
  ],
  ' ' : [ 
    ____,
    ____,
    ____,
    ____,
    ____,
  ],
  '1' : [
    _o_,
    _o_,
    _o_,
    _o_,
    _o_
  ],
  '2' : [
    oooo,
    ___o,
    oooo,
    o___,
    oooo
  ],
  '3' : [
    oooo,
    ___o,
    oooo,
    ___o,
    oooo
  ],
  '4' : [
    o__o,
    o__o,
    oooo,
    ___o,
    ___o
  ],
  '5' : [
    oooo,
    o___,
    oooo,
    ___o,
    oooo
  ],
  '6' : [
    oooo,
    o___,
    oooo,
    o__o,
    oooo
  ],
  '7' : [
    oooo,
    ___o,
    ___o,
    ___o,
    ___o
  ],
  '8' : [
    oooo,
    o__o,
    oooo,
    o__o,
    oooo
  ],
  '9' : [
    oooo,
    o__o,
    oooo,
    ___o,
    ___o
  ],
  '0' : [
    oooo,
    o__o,
    o__o,
    o__o,
    oooo
  ],
};

function convert() {
  var text = document.getElementById('text').value.toUpperCase();
  var bitmap = [[],[],[],[],[]];
  var length = 0;

  for(let i = 0, c; c = text.charAt(i); i++) {
    for(let j = 0, x; x = PIXEL[c][j]; j++) {
      bitmap[j].push.apply(bitmap[j], x); // bitmap of char
      bitmap[j].push(false); // space in between each char
    }
  }

  draw(bitmap);
}

function draw(bitmap) {
  var char = document.getElementById('char').value;

  document.getElementById('ctrlf').innerHTML = "<br>Ctrl + f then put in " + char + "<br><br>";

  for(let i = 0, x; x = bitmap[i]; i++) {
    var line = '';

    for(let j = 0, length = x.length; j < length; j++) {
      //var random = Math.random().toString(36).charAt(2);
      var random = Math.random().toString().charAt(2);

      if (random === char) {
        random = (random === '9') ? 
          '0' : String.fromCharCode(random.charCodeAt() + 1);
      }

      line += x[j] ? char : random;
    }
    document.getElementById('ctrlf').innerHTML += line + '<br>';
  }
}