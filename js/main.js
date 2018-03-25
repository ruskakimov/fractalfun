var stretch = require('stretch-canvas').stretch;

var canvas = document.getElementById('fractalfun');
var ctx = canvas.getContext('2d');

canvas.height = 200;
canvas.width = 200;

stretch(canvas);

var lines = [
    [0, 100, 200, 100]
];

drawLines();

window.addEventListener('click', downTheRabbitHole);

function rotate90(line) {
    return [line[1], line[0], line[3], line[2]];
}

function halfs(line) {
    var mid_x = Math.abs(line[0] - line[2]) / 2;
    var mid_y = Math.abs(line[1] - line[3]) / 2;
    return [
        [line[0], line[1], mid_x, mid_y],
        [mid_x, mid_y, line[2], line[3]]
    ];
}

function downTheRabbitHole() {
    var updated_lines = [];
    lines.forEach(function(line) {
        var rotated = rotate90(line);
        updated_lines = updated_lines.concat(halfs(line));
        updated_lines = updated_lines.concat(halfs(rotated));
    });
    lines = updated_lines;

    drawLines();
}

function drawLines() {
    ctx.beginPath;
    lines.forEach(function(line) {
        ctx.moveTo(line[0], line[1]);
        ctx.lineTo(line[2], line[3]);
    });
    ctx.stroke();
}