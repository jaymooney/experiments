var container;
var rotate = 0;
var updating = false;

document.addEventListener("DOMContentLoaded", function () {
    container = document.getElementById("container");
    window.addEventListener("mousewheel", onwheelscroll, true);
    //window.addEventListener("DOMMouseScroll", onffwheelscroll, true);
}, false);


function onwheelscroll(event) {
    var change = Math.floor(event.wheelDelta / 60);
    rotate += change;
    requestUpdate();
}

function onffwheelscroll(event) {
    var change = event.deltaX;
    rotate += change;
    container.style.mozTransform = "rotate(" + rotate  + "deg)";
}

function requestUpdate() {
    if (!updating) {
        requestAnimationFrame(updateContainer);
        updating = true;
    }
}

function updateContainer() {
    updating = false;
    container.style.webkitTransform = "rotateY(" + rotate  + "deg)";
}
