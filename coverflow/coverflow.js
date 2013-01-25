var container;
var viewport;
var containerLeft = 0;
var activeItem = 2;
var newActiveItem = 0;
var numItems;
var updating = false;
var coverflowOptions = {

};

document.addEventListener("DOMContentLoaded", function () {
    viewport = document.getElementById("viewport");
    container = document.getElementById("container");
    numItems = container.childNodes.length;
    viewport.addEventListener("mousewheel", onwheelscroll, false);
    viewport.addEventListener("keypress", onkeypress, false);
    //window.addEventListener("DOMMouseScroll", onffwheelscroll, true);
}, false);

function onwheelscroll(event) {
    var change = event.wheelDelta / 120;
    activeItem += change;
    containerLeft += change;
    event.preventDefault();
    requestUpdate();
}

function onkeypress(event) {
    if (event.keyCode === 37) // left arrow {
        updateActiveItem(-1);
    } else if (event.keyCode === 39) // right arrow {
        updateActiveItem(1);
    }
    event.preventDefault();
    requestUpdate();
}

function requestUpdate() {
    if (!updating) {
        requestAnimationFrame(updateUI);
        updating = true;
    }
}

function updateUI() {
    var targetItem = newActiveItem;
    var oldItem = activeItem
    updating = false;
    if (targetItem !== oldItem) {

        //container.style.left = containerLeft  + "px";
    }
}

function updateActiveItem(change) {
    newActiveItem = activeItem + change;
    if (newActiveItem < 0) {
        newActiveItem = 0;
    } else if (newActiveItem >= numItems) {
        newActiveItem = numItems - 1;
    }
}