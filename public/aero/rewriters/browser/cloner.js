// In the case of CORS attributes present the original is deleted and a new clone is made because it isn't possible to modify the CORS properties internally
$aero.Cloner = class {
    constructor(element) {
        const clone = document.createElement(element.tagName);

        this.element = element;
        this._clone = clone;

        clone.observed = true;

        for (const name of element.getAttributeNames()) {
            if (name !== "integrity") {
                const value = element.getAttribute(name);
                clone[name] = value;
            }
        }
        if ("innerHTML" in element && element.innerHTML !== "")
            clone.innerHTML = element.innerHTML;
    }
	clone() {
        console.log(this._clone);
		// Insert
		this.element.after(this._clone);
	}
    cleanup() {
		if (this.element instanceof HTMLScriptElement)
			// Disable old script by breaking the type so it doesn't run
			this.element.type = "_";
		
		this.element.remove();
    }
}