// Incomplete

// https://libwebsockets.org/testserver/
window.WebSocket = new Proxy(window.WebSocket, {
    construct(target, args) {
        console.log("Intercepting Websocket connection");

        [url] = args;
        
        const rewrittenUrl = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/fetchWs?url=${url}`;

        console.log(`WS ${url} -> ${rewrittenUrl}`);

        args[0] = rewrittenUrl;
          
        return Reflect.construct(...arguments);
    }
})