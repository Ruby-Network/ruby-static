$aero.check = value => value instanceof Location ? $aero.location : value;

$aero.eval = new Proxy(eval, {
    apply: (target, thisArg, args) => {
        args[0] = $aero.scope(args[0]);

        return Reflect.apply(...arguments)
    }
})

window.Function = new Proxy(Function, {
	construct(target, args) {
        [func] = args;
        
        if (typeof func === "string")
		    func = $aero.scope(func);
        else if (typeof func === "function" && !func.toString() !== `function ${func.name}() { [native code] }"`);
            func = $aero.scope(func.toString());

        args[0] = func;

		return Reflect.construct(...arguments);
	}
});
// TODO: Rewrite Function.prototype.toString()

Reflect.get = new Proxy(Reflect.get, {
    apply: (target, that, args) => {
        [_target, prop] = args;
        (_target instanceof Window && prop === location) ? $aero.location : target(...args);
    }
});

Reflect.set = new Proxy(Reflect.set, {
    apply: (target, that, args) => {
        [_target, prop, value] = args;
        (_target instanceof Location && _target !== $aero.location) ? $aero.location[prop] = value : target(...args);
    }
});