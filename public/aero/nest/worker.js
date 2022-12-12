// Worker nests

onevent = new Proxy(onevent, {
    set(target, prop, value) {
        return Reflect.apply(...arguments)
    }
});

var oldClientsGet = Clients.get;
Clients.get = async function(id) {
    const client = await oldClientsGet(id);
    
    client.url = client.url.match(new RegExp(`^(${$aero.prefix})/*`, "g"))[0];

    return client;
};

self.addEventListener = new Proxy(self.addEventListener, {
    apply(target, that, args) {
        [type, listener] = args;

        Reflect.apply(...arguments);
    }
});

if(0)typeof await/2//2; export { onevent, Clients.get, self.addEventListener }