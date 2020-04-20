chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        file: "content-script/index.js"
    });
    // chrome.browserAction.setBadgeBackgroundColor({color: '#FF0000' });
});
