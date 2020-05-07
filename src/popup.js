let resetButon = document.getElementById('RESET');


resetButon.onclick = function(element) {
  chrome.storage.sync.clear();
};