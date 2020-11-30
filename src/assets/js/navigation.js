
// Setting up the Variables
var container;
var cards;
var isVisibleContainer = false;

//setting up the listener
window.onload=function(){
    // Setting up the Variables
    var container = document.querySelector(".nav-body");
    var cards = document.querySelector(".container");
    document.getElementById("nav-action").addEventListener("click", barClicked, false);
    document.querySelector(".nav-body").addEventListener("click", barClicked, false);
}

//setting up the clicked Effect
function barClicked() {
    document.querySelector(".nav-body").classList.toggle('is-active');
    navbarToggle();
}

function navbarToggle() {
    conAni();
    cardAni();
    if(isVisibleContainer===false) {
        isVisibleContainer = true;
    }
    else {
        setTimeout(function() {
            hide(document.querySelector(".nav-body"));
        }, 270);
        isVisibleContainer = false;
    }
}

function hide(node) { node.setAttribute("style","display: none; opacity: 0; animation: fade-out 2s;"); }

function conAni() {
    document.querySelector(".container").setAttribute("style","animation: none; opacity: 0;");
    if(!isVisibleContainer)
        setTimeout(function() {
            document.querySelector(".nav-body").setAttribute("style", "animation: intro_box 1s; animation-iteration-count: 1;");
        }, 20);
    else
        setTimeout(function() {
            document.querySelector(".nav-body").setAttribute("style", "animation: outro_box 1s; animation-iteration-count: 1;");
        }, 20);
}

function cardAni() {
    document.querySelector(".container").setAttribute("style","animation: none; opacity: 0;");
    if(!isVisibleContainer) {
        setTimeout(function() {
            document.querySelector(".container").setAttribute("style", "animation: intro_box_cards 1s; animation-iteration-count: 1; translate(-100vw, 0px);");
        }, 20);
    }
    else {
        setTimeout(function() {
            document.querySelector(".container").setAttribute("style", "animation: outro_box_cards 1s; animation-iteration-count: 1;");
        }, 20);
    }
}