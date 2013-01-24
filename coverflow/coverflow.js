var container;
var containerLeft = 0;
var updating = false;

document.addEventListener("DOMContentLoaded", function () {
    container = document.getElementById("container");
    window.addEventListener("mousewheel", onwheelscroll, true);
    //window.addEventListener("DOMMouseScroll", onffwheelscroll, true);
}, false);


function onwheelscroll(event) {
    var change = Math.floor(event.wheelDelta / 20);
    containerLeft += change;
    requestUpdate();
}

function requestUpdate() {
    if (!updating) {
        requestAnimationFrame(updatecontainer);
        updating = true;
    }
}

function updatecontainer() {
    updating = false;
    container.style.left = containerLeft  + "px";
}
