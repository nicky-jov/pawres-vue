var fireOnHashChangesToo = true
var pageURLCheckTimer = setInterval (
    function () {
        if (this.lastPathStr !== location.pathname
            || this.lastQueryStr !== location.search
            || (fireOnHashChangesToo && this.lastHashStr !== location.hash)) {
            this.lastPathStr = location.pathname;
            this.lastQueryStr = location.search;
            this.lastHashStr = location.hash;
            load();
        }
    }, 100);

function load() {
    setTimeout(function() {
        document.getElementsByClassName('titleform')[0].setAttribute('style', `
            animation: fadeIn 1s ease-in both; 
            display: block; 
            z-index: -1000;
            height: fit-content;
            padding-top: -20px;`);
        setTimeout(function() {
            document.getElementsByClassName('textform')[0].setAttribute('style', 'animation: fadeIn 0.6s ease-in both;');
            document.getElementsByClassName('titleform')[0].setAttribute('style', '');
            setTimeout(function() {
                if(document.getElementsByClassName('signup')[0])
                    document.getElementsByClassName('signup')[0].setAttribute('style', 'animation: fadeInBottom 1s ease-in both;');
                else   
                    document.getElementsByClassName('login')[0].setAttribute('style', 'animation: fadeInBottom 1s ease-in both;');
            }, 600);
        }, 1000);
    }, 0);
}