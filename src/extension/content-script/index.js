import { GlovyUI } from "./GlovyUI";

const glovyUI = new GlovyUI();
glovyUI.init()
    .catch((e) => {
        console.log('An error occurred while initializing Glovy. See below:');
        console.error(e);
    });



