// Incomplete
// https://html.spec.whatwg.org/multipage/web-messaging.html#dom-window-postmessage

window.postMessage = new Proxy(window.postMessage, {
    apply: (target, that, args) => {
        // TODO: Rewrite
        console.log(args);
        
        return Reflect.apply(target, that, args);
    }
});