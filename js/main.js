var stretch = require('stretch-canvas').stretch;

var canvas = document.getElementById('fractalfun');
var ctx = canvas.getContext('2d');

canvas.height = 200;
canvas.width = 200;

stretch(canvas);

var starting_lines = [
    [0, 0, 200, 200]
];
var lines = starting_lines;

drawLines();

function rotate90(line) {
    return [line[0], line[3], line[2], line[1]];
}

function halfs(line) {
    var mid_x = (line[0] + line[2]) / 2;
    var mid_y = (line[1] + line[3]) / 2;
    return [
        [line[0], line[1], mid_x, mid_y],
        [mid_x, mid_y, line[2], line[3]]
    ];
}

function downTheRabbitHole() {
    var updated_lines = [];
    lines.forEach(function(line) {
        var rotated = rotate90(line);
        updated_lines = updated_lines.concat(halfs(rotated));
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

window.setInterval(function() {
    downTheRabbitHole();
    if (lines.length > 10000) {
        lines = starting_lines;
    }
    drawLines();
}, 600);