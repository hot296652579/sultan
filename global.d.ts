import GlobalAt from "./assets/script/GlobalAt";

declare global {

    interface Window {
        G: GlobalAt;
    }

    declare let G: GlobalAt = window.G;
    
}