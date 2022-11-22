if ("cookieStore" in window) {
	Object.defineProperties(this, "locationUpToProxyOrigin", {
		get: () => location.origin + location.pathname.split("/").slice(0, 5)
	});
	
	cookieStore.set  = new Proxy(cookieStore.set, {
		apply(target, that, args) {
			[cookie] = args;

			cookie.domain = location.domain;
			cookie.path = locationUpToProxyOrigin + cookie.path;

			args[0] = cookie;

			return Reflect.apply(...arguments)
		}
	})

	function getOriginalCookie(cookie) {
		return cookie;
	}

	cookieStore.get = new Proxy(cookieStore.set, {
		apply(target, that, args) {
			[null, url] = args;
	
			url = locationUpToProxyOrigin + cookie.path;
				
			args[1] = url;
	
			return getOriginalCookie(Reflect.apply(...arguments))
		}
	})
	cookieStore.get = new Proxy(cookieStore.set, {
		apply(target, that, args) {
			[null, url] = args;
	
			url = locationUpToProxyOrigin + cookie.path;
				
			args[1] = url;
	
			return Reflect.apply(...arguments).map(cookie => getOriginalCookie(cookie));
		}
	})
	
	CookieChangeEvent.changed
}

Object.defineProperty(document, "cookie", {
	get() {
		return $aero.rewriteGetCookie(document.cookie, "");
	},
	set(value) {
		return $aero.rewriteSetCookie(value, "");
	}
});