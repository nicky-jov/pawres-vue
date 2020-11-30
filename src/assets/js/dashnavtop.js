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
  if(document.querySelector('.dashboard-content'))
    document.querySelector('.dashboard-content').onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.querySelector('.dashboard-content').scrollTop > 80 || document.querySelector('.dashboard-content').scrollTop > 80) {
      document.getElementById("navbartop").style.padding = "30px 10px";
      document.getElementById("navbartop").style.background = "#131313";
      document.getElementById("avatar").style.width = "30px";
      document.getElementsByClassName("dropdown")[0].style.fontSize = "15px";
    } else {
      document.getElementById("navbartop").style.padding = "80px 10px";
      document.getElementById("navbartop").style.background = "#00000000";
      document.getElementById("avatar").style.width = "40px";
      document.getElementsByClassName("dropdown")[0].style.fontSize = "25px";
      
    }
  }
}