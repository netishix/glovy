import $ from "jquery";

const UI_ID = '#glovy-ui';
const UI_MINIMIZE_BTN_ID = '#glovy-minimize-btn';
const UI_MAXIMIZE_BTN_ID = '#glovy-maximize-btn';
const UI_CLOSE_BTN_ID = '#glovy-close-btn';
const IFRAME_ID = '#ng-glovy-iframe';

class GlovyUI {

    async init () {
        await this.inject();
        this.handleEvents();
        this.UI_ELEMENT = $(UI_ID);
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
        $(UI_MINIMIZE_BTN_ID).on( 'click', () => {
            this.minimize();
        });
        $(UI_MAXIMIZE_BTN_ID).on( 'click', () => {
            this.maximize();
        });
        $(UI_CLOSE_BTN_ID).on( 'click', () => {
            this.close();
        });

    }

    minimize() {
        this.UI_ELEMENT
            .removeClass('glovy-ui-maximized')
            .addClass('glovy-ui-minimized');
    }

    maximize() {
        this.UI_ELEMENT
            .removeClass('glovy-ui-minimized')
            .addClass('glovy-ui-maximized');
    }

    close() {
        this.UI_ELEMENT.remove();
    }


}

export { GlovyUI };
