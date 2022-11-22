open = new Proxy(open, {
	apply(target, that, args) {
		[url] = args;
		if (url)
			args[0] = wrap(url);

		return Reflect.apply(...args);
	}
});