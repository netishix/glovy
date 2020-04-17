import $ from "jquery";

const a = $('div');
console.log(a);
const div = document.createElement('div');
div.id = 'interceptor-iframe-wrapper';
div.style.position = 'fixed';
div.style.bottom = '0';
div.style.right = '0';
div.style.left = '0';
div.style.height = '50vh';
div.style.zIndex = '1001';
const iframe = document.createElement('iframe');
iframe.width = '100%';
iframe.height = '100%';
iframe.src = chrome.extension.getURL('web-accessible-resources/ng-glovy/index.html');
div.appendChild(iframe);
document.body.appendChild(div);

