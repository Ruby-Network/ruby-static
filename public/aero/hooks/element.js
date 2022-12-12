// To hide href and integrity changes
/*
HTMLAnchorElement.prototype.href = new Proxy(HTMLAnchorElement.prototype.href, {
    get(target, prop) {
        target[prop] = target._href;
    }
});
*/