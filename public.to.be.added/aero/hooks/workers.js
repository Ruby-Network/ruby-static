// Incomplete

// The api is only exposed in secure contexts
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register = new Proxy(navigator.serviceWorker.register, {
		apply(target, that, args) {
			alert("Registering a nested service worker");
			
			args[0] = $aero.rewriteSrc(args[0]);
			console.log(args);

			return Reflect.apply(...args);
		}
	});
}

/*
worker = new Proxy(worker, {
	construct(target, args) {
		return Reflect.construct(target, args);
	}
});
*/

// Chrome exclusive
// https://html.spec.whatwg.org/multipage/worklets.html

//worklet.addModule = null;