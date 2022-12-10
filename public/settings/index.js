function AboutBlankCloak() {
  const page = new ABC({
    type: "blank",
    url: window.location.href,
  });

  page.open();
  window.location.replace("https://google.com");
}
class ABC {
  constructor(config = {}) {
    this.type = config.type || "blank";
    this.url = config.url || "about:blank";
  }

  setType(type) {
    this.type = type;
  }

  setUrl(url) {
    this.url = url;
  }

  open() {
    if (this.type === "blank") {
      try {
        const page = window.open();
        page.document.body.innerHTML = this.getCode();
      } catch (error) {
        // Handle error
      }
    } else if (this.type === "blob") {
      try {
        const page = new Blob([this.getCode()], { type: "text/html" });
        window.open(URL.createObjectURL(page));
      } catch (error) {
        // Handle error
      }
    } else if (this.type === "overwrite") {
      try {
        document.body.innerHTML = this.getCode();
      } catch (error) {
        // Handle error
      }
    }
  }

  getCode() {
    return `
        <iframe 
          style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none"
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
          src="${this.url}"
        ></iframe>
      `;
  }
}
