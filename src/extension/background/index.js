chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        file: "content-script/index.js"
    });
});

// chrome.runtime.onMessage.addListener((request, sender) => {
//     alert('received');
//     switch(request.action) {
//         case 'changeIcon':
//             chrome.browserAction.setIcon({path: request.newIconPath});
//             break;
//     }
// });
