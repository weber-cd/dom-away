let bodyElement = document.querySelector('body')
let buttonElement = null;
let moveToDeleteButton = false;
let lastMoveoutElement = null;
// const  chromeLocalStorage = chrome.storage.local
function getElementLeft(element){
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;

　while (current !== null){
　　actualLeft += current.offsetLeft;
　　current = current.offsetParent;
　}

　　return actualLeft;
}

function getElementTop(element){
　var actualTop = element.offsetTop;
  var current = element.offsetParent;

　while (current !== null){
　　　actualTop += current.offsetTop;
　　　current = current.offsetParent;
　　}
　　return actualTop;
　}

function getButtonElement(){
  if(buttonElement) return buttonElement
  buttonElement = document.createElement("button")
  buttonElement.innerHTML = 'delete'
  buttonElement.style.position = "absolute";
  buttonElement.style.width = '40px';
  buttonElement.style.height = '30px';
  buttonElement.style.zIndex = Number.MAX_SAFE_INTEGER;
  buttonElement.style.fontSize = '12px';
  buttonElement.style.padding = '0px';
  buttonElement.addEventListener('click', function(event){
    const host = window.location.origin
    const cssPath = getCssPath(lastMoveoutElement)
    chrome.storage.local.set({
      [host]: [cssPath],
    }, function(){
      console.log('save success!');
    })
      
    lastMoveoutElement.style.display = 'none'
  })
  bodyElement.append(buttonElement)
  return buttonElement
}


bodyElement && bodyElement.addEventListener("mouseover", function(event){
  const buttonElement = getButtonElement();
  if(event.target === buttonElement) {
    lastMoveoutElement.style.border = "1px solid rgba(255, 154, 0, 1)";
    return;
  };
  event.target.style.border = "1px solid rgba(255, 154, 0, 1)";
  buttonElement.style.display = 'block';
  // buttonElement.style.left = event.clientX + 'px';
  // buttonElement.style.top = event.clientY + 'px';
  // console.log(event)
  buttonElement.style.left =  getElementLeft(event.target) + event.target.clientWidth - 30 + 'px'
  buttonElement.style.top =  getElementTop(event.target) + event.target.clientHeight - 20 + 'px'
}, false)

bodyElement && bodyElement.addEventListener('mouseout', function(event){
  // console.log("event:", cssPath(event.target))
  if(event.target === buttonElement){
    lastMoveoutElement.style.border = null;
  }
  event.target.style.border = null;
  lastMoveoutElement = event.target;
}, false)

function getCssPath(el) {
  if (!(el instanceof Element)) return;
  var path = [];
  while (el.nodeType === Node.ELEMENT_NODE && el.nodeName !== 'HTML') {
      var selector = el.nodeName.toLowerCase();
      if (el.id) {
          selector += '#' + el.id;
      } else {
          var sib = el, nth = 1;
          while (sib.nodeType === Node.ELEMENT_NODE && el.nodeName !== 'HTML' && (sib = sib.previousSibling) && nth++);
          selector += ":nth-child("+nth+")";
      }
      path.unshift(selector);
      el = el.parentNode;
  }
  return path.join(" > ");
}