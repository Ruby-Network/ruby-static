// Config
import { aeroPrefix, proxyPrefix, prefix, debug } from "./config.js";

// Utility
import ProxyFetch from "./utility/ProxyFetch.js";
import getRequestUrl from "./utility/getRequestUrl.js";
import headersToObject from "./utility/headersToObject.js";
import unwrapImports from "./utility/unwrapImports.js";

// Cors Emulation
import block from "./corsTest.js";

// Rewriters
import headersRewriter from "./rewriters/worker/headers.js";
import rewriteManifest from "./rewriters/worker/manifest.js";
import scope from "./rewriters/shared/scope.js";

// Separate the prefix from the url to get the proxy url isolated
const getPath = new RegExp(`^(${prefix})`, "g");

/**
 * Handles the requests
 * @param {FetchEvent} event The event
 * @param {Location} location The window location
 * @returns {Response} The proxified response 
 */
async function handle(event) {
	const location = self.location;

	// Construct proxy fetch instance
	const api = self.location.origin + proxyPrefix;
	const proxyFetch = new ProxyFetch(api);

	const requestUrl = new URL(event.request.url);
	const path = requestUrl.pathname + requestUrl.search;

	// Remove the module components
	if (path.startsWith(aeroPrefix + "rewriters/shared/") && path.endsWith(".js")) {
		const response = await fetch(event.request.url);

		if (!response.headers.get("content-type").startsWith("application/javascript"))
			return response;

		const body = await response.text();

		// Remove the last line
		return new Response(body.split('\n').filter(line => !(line.startsWith("import") || line.startsWith("export"))).join("\n"), {
			status: response.status,
			headers: headersToObject(response.headers)
		});
	}
	// Don't rewrite requests for aero library files
	else if (path.startsWith(aeroPrefix))
		// Proceed with the request like normal
		return await fetch(event.request.url);

	var origin;
	var windowUrl;
	// Get the origin from the user's window
    if (event.clientId !== "") {
        // Get the current window
        const window = await clients.get(event.clientId);
		
		windowUrl = new URL(window.url);

		origin = new URL(windowUrl.pathname.replace(getPath, "")).origin;	
	}

	// Determine if the request was made to load an html file; this is needed so that the proxy will know when to rewrite the html files (for example, you wouldn"t want it to rewrite a fetch request)
	const isFirstRequest = event.request.mode === "navigate" && event.request.destination === "document";
	const isIframe = event.request.destination === "iframe";

	// Parse the request url to get the url to proxy
	const url = getRequestUrl(windowUrl, path, origin, requestUrl.origin, location.origin, isFirstRequest, isIframe);

	// Ensure the request isn"t blocked by CORS
	if (await block(url.href)) {
		// Abort request
		// TODO: Convert CORS Test to a class and respond with the accurate cors error
		return new Response("Blocked by CORS", { status: 500 });
	}

	if (debug.url)
		console.log(`Proxifying ${url} a ${event.request.destination}`);

	// Make the request to the proxy
	const response = await proxyFetch.fetch(url, {
		method: event.request.method,
		// TODO: Rewrite requestHeaders
		headers: event.request.headers,
		body: event.request.body,
	});

	// Rewrite the headers
	const headers = headersToObject(response.headers);

	const type = headers["content-type"];

	const rewrittenHeaders = headersRewriter(headers);
 
	const isHtml = 
		// Not all sites respond with a type	
		typeof type === "undefined"
		|| type.startsWith("text/html");

	const rewriteHtml = (isFirstRequest || isIframe) && isHtml;

	// Rewrite the body
	let body;
	if (rewriteHtml) {
		body = await response.text();
		if (body !== "") {
			body = `
			<!DOCTYPE html>
			<head>
				<!-- Fix encoding issue -->
				<meta charset="utf-8">
				
				<!-- Favicon -->
				<!--
				Delete favicon if /favicon.ico isn't found
				This is needed because the browser will cache the favicon from the previous site
				-->
				<link href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=" rel="icon" type="image/x-icon">
				<!-- If not defined already manually set the favicon -->
				<link href="${prefix + url.origin}/favicon.ico" rel="icon" type="image/x-icon">
				
				<script>
					// Update the service worker
					navigator.serviceWorker.register("/sw.js", {
						scope: ${prefix},
						// Don't cache http requests
						updateViaCache: "none",
						type: "module",
					}).then(registration => {
						// Update service worker
						registration.update();
					}).catch(error => {
						console.error(error.message);
					});

					// Aero's global namespace
					window.$aero = {
						config: {
							prefix: ${prefix},
							debug: ${JSON.stringify(debug)}
						}
					};
				</script>

				<!-- Aero -->
				${unwrapImports(
					{
						"utility/browser": ["location"],
						"rewriters/shared": ["cookie", "scope", "src"],
						"rewriters/browser": ["cloner", "html"],
						// Hook into JS apis
						hooks: ["cookie", "element", "history", "http", "location", "messages", "navigator", "popup", "scoping", "wasm", "workers", "ws"]
					},
					// HTML interception
					["dom"]
				)}
			</head>

			${body}

			<head>
			</head>
			`;
		}
	}
	else if (event.request.destination === "script") {
		// Scope the scripts
		body = scope(await response.text());
	}
	else if (event.request.destination === "serviceworker")
		// SW nesting by proxifying internal apis
		body = `
if (typeof module === "undefined") {
	importScripts("./nest/worker.js");
	importScripts("./nest/sw.js");
}
// sw.js doesn't need any module imports as importScripts isn't a thing in module scripts
0&&await/2//2; import { onevent, Clients.get, self.addEventListener } from "./worker.js";

${body}
		`;
	else if (event.request.destination === "manifest")
		body = rewriteManifest(await response.text())
	else
		// No rewrites are needed; proceed as normal
		body = response.body;

	// Return the response
	return new Response(body, {
		status: response.status,
		headers: rewrittenHeaders
	});
}

export default handle;