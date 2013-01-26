var container;
var viewport;
var listNodes;
var containerLeft = 0;
var activeIndex = 2;
var newActiveIndex = 0;
var updating = false;
var rightClass = "rightSide";
var leftClass = "leftSide";
var activeClass = "activeItem";
var coverflowOptions = {

};

document.addEventListener("DOMContentLoaded", function () {
    viewport = document.getElementById("viewport");
    container = document.getElementById("container");
    listNodes = container.querySelectorAll(".listItem");
    viewport.addEventListener("mousewheel", onwheelscroll, false);
    viewport.addEventListener("keypress", onkeypress, false);
    //window.addEventListener("DOMMouseScroll", onffwheelscroll, true);
}, false);

function onwheelscroll(event) {
    var change = event.wheelDelta / 120;
    updateActiveItem(change);
    containerLeft += change;
    event.preventDefault();
    requestUpdate();
}

function onkeypress(event) {
    if (event.keyCode === 37) {
        // left arrow 
        updateActiveItem(-1);
    } else if (event.keyCode === 39) {
        // right arrow 
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
    var targetIndex = newActiveIndex;
    var oldIndex = activeIndex;
    activeIndex = newActiveIndex;
    updating = false;
    var targetNode = listNodes[targetIndex];
    var oldNode = listNodes[oldIndex];

    if (targetIndex > oldIndex) {
        targetNode.classList.remove(rightClass);
        oldNode.classList.add(leftClass);
    } else if (targetIndex < oldIndex) {
        targetNode.classList.remove(leftClass);
        oldNode.classList.add(rightClass);
    }
    oldNode.classList.remove(activeClass);
    targetNode.classList.add(activeClass);
    var length = listNodes.length;
    for (var i = 0; i < length; i++) {
        var node = listNodes[i];
        var distance = i - targetIndex;
        if (distance === 0) {
            // it is the focused node
            node.removeAttribute("style");
            node.style.zIndex = length;
        } else {
            var norm = Math.abs(distance);
            var factor = .9 - (norm * .1);
            node.style.opacity = factor;
            var blah = "rotateY(-55deg)";
            if (norm !== distance) {
                blah = "rotateY(55deg)";
            }
            node.style.webkitTransform = blah + " scale(" + factor + ")";
            node.style.zIndex = length - norm;
        }
    }
    container.style.left = 180 - (targetIndex * 80) + "px";
}

function updateActiveItem(change) {
    newActiveIndex = activeIndex + change;
    if (newActiveIndex < 0) {
        newActiveIndex = 0;
    } else if (newActiveIndex >= listNodes.length) {
        newActiveIndex = listNodes.length - 1;
    }
}
