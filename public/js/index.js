/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");
const iframe = document.getElementById("uv-iframe");
let proxytype = localStorage.getItem("proxy");
let currenturl = window.location.href;
if (proxytype === "Ultraviolet") {
  document
    .getElementById("uv-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const address = document.getElementById("uv-address");
      try {
        await registerSW();
        console.log("Registered SW");
      } catch (err) {
        error.textContent = "Failed to register service worker.";
        errorCode.textContent = err.toString();
        throw err;
      }

      const url = search(address.value, searchEngine.value);
      const addr = address.value
      const toup = url.toUpperCase();
      if (addr.includes('roblox') || addr.includes('ROBLOX') || addr.includes('Roblox') || addr.includes('nowgg') || addr.includes('now.gg') || addr.includes('NOWGG') || addr.includes('NOW.GG') || addr.includes('NOW GG') || addr.includes('NOW.GG') || addr.includes('now gg')) {
        iframe.classList.remove("dnone");
        iframe.src = __uv$config.prefix + __uv$config.encodeUrl('https://kxd.fm/roblox');
      }
      else {
        iframe.classList.remove("dnone");
        iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
      }
    });
}
if (proxytype === "DIP") {
  document
    .querySelector(".dipform")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      worker().then((event) => {
        var val = document.querySelector(".dipinput").value;
        let se = document.getElementById("uv-search-engine").value;
        // remove %s from the search engine url
        se = se.replace("%s", "");
        // add the search query to the end of the search engine url
        se = se + val;
        console.log(se);
        if (se.includes("roblox") || se.includes("ROBLOX") || se.includes("Roblox") || se.includes("nowgg") || se.includes("now.gg")) {
          window.location = '/errors/nowgg-error.html'
        }
        iframe.classList.remove("dnone");
        iframe.src = window.__DIP.config.prefix + window.__DIP.encodeURL(se);
        if (val.includes("https://") || val.includes("http://")) {
          if (val === 'https://now.gg' || val === 'https://www.now.gg' || val === 'https://roblox.com') {
            window.location = '/errors/nowgg-error.html'
          }
          iframe.classList.remove("dnone");
          iframe.src = window.__DIP.config.prefix + window.__DIP.encodeURL(val);
        }
      });
    });
  async function worker() {
    var a = await navigator.serviceWorker.register("/dip-sw.js", {
      scope: "/service",
    });
    return a;
  }
}
if (proxytype === "Osana") {
  document
    .getElementById("uv-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      worker().then((event) => {
        var val = document.querySelector(".dipinput").value;
        let se = document.getElementById("uv-search-engine").value;
        // remove %s from the search engine url
        se = se.replace("%s", "");
        // add the search query to the end of the search engine url
        se = se + val;
        console.log(se);
        if (se === 'https://www.google.com/search?q=roblox' || se === 'https://www.google.com/search?q=ROBLOX' ) {
          window.location = '/errors/nowgg-error.html'
        }
        iframe.classList.remove("dnone");
        iframe.src = __osana$config.prefix + __osana$config.codec.encode(se);
        if (val.includes("https://") || val.includes("http://")) {
          if (val === 'https://now.gg' || val === 'https://www.now.gg' || val === 'https://roblox.com') {
            window.location = '/errors/nowgg-error.html'
          }
          iframe.classList.remove("dnone");
          iframe.src = __osana$config.prefix + __osana$config.codec.encode(val);
        }
      });
    });
  async function worker() {
    var a = await navigator.serviceWorker.register("/dip-sw.js", {
      scope: "/service/",
    });
    return a;
  }
}
