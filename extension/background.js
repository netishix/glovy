// chrome.browserAction.onClicked.addListener(function() {
//     console.log('clicked!');
//     chrome.windows.create({'url': 'index.html', 'type': 'popup'}, function(window) {
//     });
// });

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        file: "content_script.js"
    });
});
