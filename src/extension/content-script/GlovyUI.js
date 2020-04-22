import $ from "jquery";

const STYLES_ID = '#glovy-styles';
const UI_ID = '#glovy-ui';
const IFRAME_ID = '#ng-glovy-iframe';
const STORAGE_KEY_IFRAME_HEIGHT = 'iframe-height';

class GlovyUI {

    async init () {
        const hasGlovyBeenInjected = $(UI_ID).length;
        if(!hasGlovyBeenInjected) {
            await this.inject();
            this.handleEvents();
            this.selectors = {
                STYLES: $(STYLES_ID),
                UI: $(UI_ID),
                IFRAME: $(IFRAME_ID),
            };
        }
    }

    async inject() {
        const UI_TEMPLATE = await $.get(chrome.extension.getURL('web-accessible-resources/glovy-ui.html')).then();
        $('body').append(UI_TEMPLATE);
        const UI_CSS = await $.get(chrome.extension.getURL('web-accessible-resources/glovy-ui.css')).then();
        $('head').append(`<style id="${STYLES_ID}"> ${UI_CSS} </style>`);
        const iframeSrc = chrome.extension.getURL('web-accessible-resources/ng-glovy/index.html');
        $(IFRAME_ID).attr('src', iframeSrc);
    }

    close() {
        this.selectors.STYLES.remove();
        this.selectors.UI.remove();
    }

    handleEvents() {
        window.onmessage = (e) => {
            if (typeof e.data === 'object' && typeof e.data.action === 'string') {
                switch (e.data.action) {
                    case 'VERTICAL_RESIZE':
                        const {movementY} = e.data;
                        this.verticalResize(movementY);
                        break;
                    case 'MINIMIZE':
                        const {height} = e.data;
                        this.minimize(height);
                        break;
                    case 'MAXIMIZE':
                        this.maximize();
                        break;
                    case 'CLOSE':
                        this.close();
                        break;
                }
            }
        };
    }

    verticalResize(movementY) {
        const oldHeight = this.selectors.IFRAME.height();
        const newHeight = oldHeight + movementY;
        this.selectors.IFRAME.attr({height: newHeight});
        chrome.storage.local.set({[STORAGE_KEY_IFRAME_HEIGHT]: newHeight});
    }

    minimize(height) {
        this.selectors.IFRAME.attr({height});
    }

    maximize() {
        chrome.storage.local.get([STORAGE_KEY_IFRAME_HEIGHT], (result) => {
            this.selectors.IFRAME.attr({height: result[STORAGE_KEY_IFRAME_HEIGHT]});
        });
    }

}

export { GlovyUI };
