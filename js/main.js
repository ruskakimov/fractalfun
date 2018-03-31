var stretch = require('stretch-canvas').stretch;

var canvas = document.getElementById('fractalfun');
var ctx = canvas.getContext('2d');

canvas.height = 200;
canvas.width = 200;

stretch(canvas);

var starting_lines = [
    [0, 100, 200, 100]
];
var lines = starting_lines;

function koch(line) {
    const xd = line[2] - line[0];
    const x1 = line[0] + xd / 3;
    const x3 = x1      + xd / 3;
    const yd = line[3] - line[1];
    const y1 = line[1] + yd / 3;
    const y3 = y1      + yd / 3;

    const midx = line[0] + xd / 2;
    const midy = line[1] + yd / 2;

    const k = Math.sqrt(3) / 2;

    const x2 = midx + k * yd / 3;
    const y2 = midy - k * xd / 3;

    return [
        [line[0], line[1], x1,      y1],
        [x1,      y1,      x2,      y2],
        [x2,      y2,      x3,      y3],
        [x3,      y3,      line[2], line[3]],
    ];
}

function downTheRabbitHole() {
    var updated_lines = [];
    lines.forEach(function(line) {
        updated_lines = updated_lines.concat(koch(line));
    });
    lines = updated_lines;
}

function drawLines() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    lines.forEach(function(line) {
        ctx.moveTo(line[0], line[1]);
        ctx.lineTo(line[2], line[3]);
    });
    ctx.stroke();
}

drawLines();

var count = 0;

window.setInterval(function() {
    if (count >= 5) {
        lines = starting_lines;
        count = 0;
    }
    downTheRabbitHole();
    drawLines();
    count++;
}, 600);