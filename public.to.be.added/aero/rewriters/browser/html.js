$aero.rewrite = element => {
	if (typeof element.observed !== "undefined")
		return;

	const tag = element.tagName.toLowerCase();

	if (tag === "script") {
		// https://wicg.github.io/import-maps/
		if (element.type === "importmap")
			console.error("Import maps not supported yet")

		const rewrite = typeof element.innerHTML === "string" && !element.rewritten;

		if (rewrite) {
			const hasContent = element.innerHTML !== "";
			if (hasContent)
				element.innerHTML = $aero.scope(element.innerText);
		}
	}
	else if (tag === "a" && element.href) {
		// Backup
		const href = element.getAttribute("href");

		element._href = href;

		element.setAttribute("href", $aero.rewriteSrc(href));
	} else if (tag === "form" && /*Don'st rewrite again*/ !element._action) {
		const action = element.getAttribute("action");

		// In form elements actions are automatically created, instead so check if it is null
		const actionExists = action !== null;

		if (actionExists) {
			// Backup
			element._action = action;

			element.setAttribute("action", $aero.rewriteSrc(action));
		}
	} else if (tag === "iframe" ) {
		if (element.src != null && element.src != "") {
			const src = element.getAttribute("src");

			element._src = src;

			element.setAttribute("src", $aero.rewriteSrc(src));
		}
	} else if (tag === "meta") {
		switch (element.httpEquiv) {
			case "content-security-policy":
				// Rewrite
				element.content = $aero.rewriteCSP(element.content);
			case "refresh":
				element.content = element.content.replace(/[0-9]+;url=(.*)/g, `${$aero.prefix}/$1`)
		}
	}

	const hasIntegrity = "integrity" in element && element.integrity !== "";
	if (hasIntegrity) {
		const cloner = new $aero.Cloner(element);

		cloner.clone();
		cloner.cleanup();
	}

	element.observed = true;
}