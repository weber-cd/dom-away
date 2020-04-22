let bodyElement = document.querySelector('body')
let lastElemnt = null;
bodyElement && bodyElement.addEventListener("mouseover", function(event){
  event.target.style.border = "1px solid rgba(255, 154, 0, 1)";
}, false)

bodyElement && bodyElement.addEventListener("mouseout", function(event){
  event.target.style.border = null;
}, false)