var fireOnHashChangesToo = true
var pageURLCheckTimer = setInterval (
    function () {
        if (this.lastPathStr !== location.pathname
            || this.lastQueryStr !== location.search
            || (fireOnHashChangesToo && this.lastHashStr !== location.hash)) {
            this.lastPathStr = location.pathname;
            this.lastQueryStr = location.search;
            this.lastHashStr = location.hash;
            scroll();
        }
    }, 100);
  
function scroll() {
  var content;
  if(document.querySelector('.dashboard-content'))
    content = document.querySelector('.dashboard-content')

  content.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.querySelector('.dashboard-content').scrollTop > 80 || document.querySelector('.dashboard-content').scrollTop > 80) {
      document.getElementById("navbartop").style.padding = "40px 10px";
      document.getElementById("navbartop").style.background = "#131313";
      document.getElementsByClassName("dropdown")[0].style.fontSize = "15px";
    } else {
      document.getElementById("navbartop").style.padding = "80px 10px";
      document.getElementById("navbartop").style.background = "#00000000";
      document.getElementsByClassName("dropdown")[0].style.fontSize = "25px";
      
    }
  }
}