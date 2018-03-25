var stretch = require('stretch-canvas').stretch;

var canvas = document.getElementById('fractalfun');
var ctx = canvas.getContext('2d');

canvas.height = 200;
canvas.width = 200;

stretch(canvas);

ctx.fillRect(50, 50, 100, 100);