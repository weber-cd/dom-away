let resetButon = document.getElementById('RESET');

const reloadCurrentPage = () => {
  chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
    chrome.tabs.reload(arrayOfTabs[0].id);
 });
}

resetButon.onclick = function(element) {
  // todo: just clear this domain
  // chrome.storage.sync.clear();
  const theHost = window.location.origin;
  chrome.storage.sync.get(theHost, function(res){
    if(res && res[theHost]){
      chrome.storage.sync.set({
        [theHost]: null
      }, function(res){
        reloadCurrentPage()
      })
    }else{
      reloadCurrentPage()
      // chrome.runtime.reload ()
    }
  })
};