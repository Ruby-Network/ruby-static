// Private scope
(function() {
	// Dynamically update location using a function getters
	Object.defineProperty(this, "fakeLocation", {
		get: () => new URL(location.href.match(new RegExp(`(?<=${$aero.prefix}).*`, "g"))[0])
	});
	
	// Prevent detection by instanceof
	let inheritedObject = {};
	Reflect.setPrototypeOf(inheritedObject, Location.prototype);
	
	const locationProxy = new Proxy(inheritedObject, {
		get(target, prop) {
			function wrap(url) {
				return $aero.prefix + url;
			}
	
			if (typeof target[prop] === "function") {
				const props = {
					toString: url => fakeLocation.toString(),
					assign: url => location.assign(wrap(url)),
					replace: url => location.assign(wrap(url))
				};

				return prop in props ? props[prop] : target[prop];
			}
	
			const fakeUrl = fakeLocation;
	
			const customProps = {
				ancestorOrigins: location.ancestorOrigins,
			}
	
			if (prop in customProps)
				return customProps[prop];
		
			if (prop in fakeUrl)
				return fakeUrl[prop];
	
			return location[prop];
		},
		set(target, prop, value) {
			location[prop] = prop === "href" ? $aero.prefix + fakeLocation.origin + "/" + value : value;
		}
	});
	
	$aero.location = locationProxy;
	$aero.location = locationProxy;
	
	$aero.document = {}; 
	
	Object.defineProperty($aero.document, "domain", {
		get() {
			return fakeLocation.hostname;
		},
		set(value) {
			return value;
		}
	});
	
	Object.defineProperty($aero.document, "URL", {
		get() {
			return fakeLocation.href;
		},
		set(value) {
			return value;
		}
	});
})();