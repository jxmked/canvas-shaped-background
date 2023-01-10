
/**
 * Analytics
 * */
 
// https://github.com/vercel/next.js/discussions/20784#discussioncomment-4101864
type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;


function onClickEvent(element:HTMLElement) {
    let url = element.getAttribute("href");
    let text = element.innerText;

    element.addEventListener("click", function() {
        gtag("event", "url_clicked", {
            "addr": url,
            "text": text
        });
    });
}

// Google tag (gtag.js)
(function(id:string) {
    if (!window.location.protocol.toString().startsWith("https"))
        return;

    const scr = document.createElement("script");
    scr.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=" + id);
    scr.async = true;
    scr.setAttribute("type", "application/javascript");

    document.getElementsByTagName('head')[0].appendChild(scr);

    window.dataLayer = window.dataLayer || [];
    gtag = gtag || function() {
        window.dataLayer.push(arguments);
    };

    gtag('js', new Date());
    gtag('config', id);
    
    document.addEventListener("DOMContentLoaded", function() {
        Array.prototype.forEach.call(document.getElementsByClassName("gtag-on-click"), function(element) {
            onClickEvent(element);
        });
    });
    // This should be on .env file but
    // It can be publicly available so...
}("G-JPJZGW7PW6"));

export const RecordEvent = (attr:object) => {
  window.dataLayer.push(attr);
};

export default (url:string):void => {
    window.dataLayer.push({
        event: 'pageview',
        url: url
    })
}
