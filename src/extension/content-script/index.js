import $ from "jquery";

function injectGlovy() {
    const wrapper = $('<div/>', {id: 'glovy-iframe-wrapper'});
    wrapper.css({
        position : 'fixed',
        bottom: 0,
        right: 0,
        left: 0,
        height: '50vh',
        zIndex: 1001,
    });
    const iframeSrc = chrome.extension.getURL('web-accessible-resources/ng-glovy/index.html');
    const iframe = $('<iframe/>', {src: iframeSrc, width: '100%', height: '100%'});
    wrapper.append(iframe);
    $('body').append(wrapper);
}

injectGlovy();



