"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bodyElement = document.querySelector('body');
var buttonElement = null;
var moveToDeleteButton = false;
var lastMoveoutElement = null;
var theHost = window.location.origin; // TODO: just run in dev mode
// chrome.storage.sync.clear();
// const  chromeLocalStorage = chrome.storage.local

/* chrome.storage.local.get(theHost, function(res){
  if(res && res[theHost]){
    document.querySelector(res[theHost]).style.display = 'none'
  }
}) */

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var storageCssPaths;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getStorageSync();

        case 2:
          storageCssPaths = _context.sent;
          storageCssPaths.forEach(function (path) {
            document.querySelector(path).style.display = 'none';
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

function getStorageSync() {
  return _getStorageSync.apply(this, arguments);
}
/* function getStorageSync(){
  
  chrome.storage.sync.get(theHost, function(res){
    if(res && res[theHost]){
      storageCache = res[theHost]
    }
  })
  return storageCache || []
} */


function _getStorageSync() {
  _getStorageSync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              chrome.storage.sync.get(theHost, function (res) {
                if (res && res[theHost]) {
                  resolve(res[theHost]);
                }
              });
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getStorageSync.apply(this, arguments);
}

function getElementLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}

function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}

function getButtonElement() {
  if (buttonElement) return buttonElement;
  buttonElement = document.createElement("button");
  buttonElement.innerHTML = 'delete';
  buttonElement.style.position = "absolute";
  buttonElement.style.width = '40px';
  buttonElement.style.height = '30px';
  buttonElement.style.zIndex = Number.MAX_SAFE_INTEGER;
  buttonElement.style.fontSize = '12px';
  buttonElement.style.padding = '0px';
  buttonElement.addEventListener('click', function (event) {
    var cssPath = getCssPath(lastMoveoutElement);
    var cssPathStoraged = getStorageSync();
    cssPathStoraged.push(cssPath);
    chrome.storage.sync.set(_defineProperty({}, theHost, cssPathStoraged), function (res) {
      console.log('save success:', res);
    });
    lastMoveoutElement.style.display = 'none';
  });
  bodyElement.append(buttonElement);
  return buttonElement;
}

bodyElement && bodyElement.addEventListener("mouseover", function (event) {
  var buttonElement = getButtonElement();

  if (event.target === buttonElement) {
    lastMoveoutElement.style.border = "1px solid rgba(255, 154, 0, 1)";
    return;
  }

  ;
  event.target.style.border = "1px solid rgba(255, 154, 0, 1)";
  buttonElement.style.display = 'block'; // buttonElement.style.left = event.clientX + 'px';
  // buttonElement.style.top = event.clientY + 'px';
  // console.log(event)

  buttonElement.style.left = getElementLeft(event.target) + event.target.clientWidth - 30 + 'px';
  buttonElement.style.top = getElementTop(event.target) + event.target.clientHeight - 20 + 'px';
}, false);
bodyElement && bodyElement.addEventListener('mouseout', function (event) {
  // console.log("event:", cssPath(event.target))
  if (event.target === buttonElement) {
    lastMoveoutElement.style.border = null;
  }

  event.target.style.border = null;
  lastMoveoutElement = event.target;
}, false);

function getCssPath(el) {
  if (!(el instanceof Element)) return;
  var path = [];

  while (el.nodeType === Node.ELEMENT_NODE && el.nodeName !== 'HTML') {
    var selector = el.nodeName.toLowerCase();

    if (el.id) {
      selector += '#' + el.id;
    } else {
      var sib = el,
          nth = 1;

      while (sib.nodeType === Node.ELEMENT_NODE && el.nodeName !== 'HTML' && (sib = sib.previousSibling) && nth++) {
        ;
      }

      selector += ":nth-child(" + nth + ")";
    }

    path.unshift(selector);
    el = el.parentNode;
  }

  return path.join(" > ");
}