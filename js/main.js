var stretch = require('stretch-canvas').stretch;

var canvas = document.getElementById('fractalfun');
var ctx = canvas.getContext('2d');

canvas.height = 200;
canvas.width = 200;

stretch(canvas);

var ITERATION_COUNT = 5;
var starting_lines = [
    [0, 100, 200, 100]
];

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

function downTheRabbitHole(lines) {
    var updated_lines = [];
    lines.forEach(function(line) {
        updated_lines = updated_lines.concat(koch(line));
    });
    return updated_lines;
}

function drawLines(lines) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    lines.forEach(function(line) {
        ctx.moveTo(line[0], line[1]);
        ctx.lineTo(line[2], line[3]);
    });
    ctx.stroke();
}

var iterations = [starting_lines];
for (var i = 1; i < ITERATION_COUNT; i++) {
    var iter_lines = downTheRabbitHole(iterations[i - 1]);
    iterations.push(iter_lines);
}

var current = 0;
var forward = true;

window.setInterval(function() {
    drawLines(iterations[current]);
    current += forward ? 1 : -1;
    if (current < 0 || current >= iterations.length) {
        forward = !forward;
        current = forward ? 0 : iterations.length - 1;
    }
}, 400);