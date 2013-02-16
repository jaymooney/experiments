var container;
var viewport;
var listNodes;
var containerLeft = 0;
var activeIndex = 27;
var newActiveIndex = activeIndex;
var updating = false;
var listItemClass = "listItem";
var activeClass = "activeItem";
var draggingMF = false;
var lastX;
var coverflowOptions = {

};
var spacer = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

function createTeamDiv(team) {
    var teamDiv = document.createElement("div");
    teamDiv.classList.add(listItemClass);
    teamDiv.style.color = "#" + team.color;
    teamDiv.style.borderColor = "#" + team.color;
    teamDiv.appendChild(document.createTextNode(team.city + " " + team.name));
    teamDiv.appendChild(document.createElement("br"));
    var logo = document.createElement("img");
    logo.src = "logos/" + team.key + ".gif";
    teamDiv.appendChild(logo);
    var conference = document.createElement("img");
    conference.src = spacer;
    conference.classList.add(team.conference.toLowerCase());
    teamDiv.appendChild(conference);
    return teamDiv;
}

document.addEventListener("DOMContentLoaded", function () {
    viewport = document.getElementById("viewport");
    container = document.getElementById("container");
    listNodes = [];
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < allteams.length; i++) {
        var teamDiv = createTeamDiv(allteams[i]);
        listNodes[i] = teamDiv;
        fragment.appendChild(teamDiv);
    }
    container.appendChild(fragment);
    viewport.addEventListener("mousewheel", onwheelscroll, false);
    viewport.addEventListener("mousedown", startdrag, false);
    viewport.addEventListener("mousemove", dragmove, false);
    document.addEventListener("mouseup", enddrag, false);
    //document.addEventListener("mouseout", enddrag, false);
    document.addEventListener("keydown", onkeydown, false);
    requestUpdate();
    //window.addEventListener("DOMMouseScroll", onffwheelscroll, true);
}, false);

function startdrag(event) {
    draggingMF = true;
    lastX = event.screenX;
    event.preventDefault();
}

function enddrag(event) {
    draggingMF = false;
}

function dragmove(event) {
    if (draggingMF) {
        var newX = event.screenX;
        var change = Math.round((newX - lastX) / -40);
        console.log("raw change: " + (newX - lastX) + ", change: " + change);
        lastX = newX;
        updateActiveItem(change);
        requestUpdate();
    }
}

function onwheelscroll(event) {
    var change = Math.round(event.wheelDelta / -120);
    console.log("wheelDelta: " + event.wheelDelta + ", change: " + change);
    updateActiveItem(change);
    containerLeft += change;
    event.preventDefault();
    requestUpdate();
}

function onkeydown(event) {
    switch (event.keyCode) {
        case 37:
            // left arrow 
            updateActiveItem(-1);
            break;
        case 39:
            // right arrow 
            updateActiveItem(1);
            break;
        case 38:
        // up
        case 40:
        // down
    }
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

    oldNode.classList.remove(activeClass);
    targetNode.classList.add(activeClass);
    var length = listNodes.length;
    for (var i = 0; i < length; i++) {
        var node = listNodes[i];
        var distance = i - targetIndex;
        if (distance === 0) {
            // it is the focused node
            node.style.removeProperty("-webkit-transform");
            node.style.removeProperty("opacity");
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
