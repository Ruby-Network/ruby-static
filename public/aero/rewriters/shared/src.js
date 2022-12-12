if (typeof $aero === "undefined")
    var $aero = {};

$aero.rewriteSrc = url => {
	if (/^(about:|data:|javascript:)/g.test(url))
		return url;

	if (url === null) {
		console.error("Nullish value passed to the src rewriter");
		
		return url;
	}

	let proxyUrl = new URL(location.pathname.replace(new RegExp(`^(${$aero.prefix})`), "") + location.search);
	
	let rewrittenUrl = url
		 // /
		.replace(/^(\/)/g, $aero.prefix + proxyUrl.origin + "/")
		// ./
		.replace(/^(\.\/)/g, proxyUrl.hostname.origin);

	// Protocol
	if (/^(https?:\/\/)/g.test(rewrittenUrl))
		rewrittenUrl = $aero.prefix + rewrittenUrl;

	if ($aero.debug.src)
		console.info(`${url} -> ${rewrittenUrl}`)

	return rewrittenUrl;
}

export default $aero.rewriteSrc;