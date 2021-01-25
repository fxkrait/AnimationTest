// returns a random integer between 0 and n-1
function randomInt(n) {
    return Math.floor(Math.random() * n);
};

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

// creates an alias for requestAnimationFrame for backwards compatibility (borrowed from Seth Lad)

/*
window.requestAnimFrame is a global reference

This is backwards compatabillity.
In JS, we evaluate an OR until it is true. If the first reference is defined, it returns the first operation. Then it goes to the second one, and checks that.
*/
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || // Mozilla
        window.oRequestAnimationFrame || // Oracle
        window.msRequestAnimationFrame || // Microsoft
        function (/* function */ callback, /* DOMElement */ element) { // If you don't have request Animation Frame, then default to a 1/60th of a second (60FPS)
            window.setTimeout(callback, 1000 / 60);
        };
})();

// add global parameters here

const PARAMS = {
    DEBUG: true,
    SCALE: 3,
    BITWIDTH: 16
};
