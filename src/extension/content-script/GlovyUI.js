import $ from "jquery";

const UI_ID = '#glovy-ui';
const IFRAME_ID = '#ng-glovy-iframe';

class GlovyUI {

    async init () {
        const hasGlovyBeenInjected = $(UI_ID).length;
        if(!hasGlovyBeenInjected) {
            await this.inject();
            this.handleEvents();
            this.UI_SELECTOR = $(UI_ID);
            this.IFRAME_SELECTOR = $(IFRAME_ID);
        }
    }

    async inject() {
        const UI_TEMPLATE = await $.get(chrome.extension.getURL('web-accessible-resources/glovy-ui.html')).then();
        $('body').append(UI_TEMPLATE);
        const UI_CSS = await $.get(chrome.extension.getURL('web-accessible-resources/glovy-ui.css')).then();
        $('head').append(`<style> ${UI_CSS} </style>`);
        const iframeSrc = chrome.extension.getURL('web-accessible-resources/ng-glovy/index.html');
        $(IFRAME_ID).attr('src', iframeSrc);
    }

    handleEvents() {
        window.onmessage = (e) => {
            if (typeof e.data === 'object' && typeof e.data.action === 'string') {
                switch (e.data.action) {
                    case 'CLOSE':
                        this.close();
                        break;
                    case 'RESIZE':
                        const height = e.data.height;
                        this.setIframeHeight(height);
                        break;
                }
            }
        };
    }

    setIframeHeight(newHeight) {
        this.IFRAME_SELECTOR.attr({height: newHeight});
    }

    close() {
        this.UI_SELECTOR.remove();
    }
}

export { GlovyUI };
