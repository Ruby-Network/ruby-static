import headersToObject from "./headersToObject.js";

class ProxyFetch {
    constructor(api) {
        this.api = api; 
    }
    fetch(url, options) {
        let ret = {
            method: options && "method" in options ? options.method : "GET",
            headers: {
                "x-url": url,
                "x-headers": "{}"
            }
        };

        if (typeof options !== "undefined") {
            if ("headers" in options)
                ret.headers["x-headers"] = JSON.stringify(headersToObject(options.headers));
        }

        return fetch(this.api, ret);
    }
}

export default ProxyFetch;