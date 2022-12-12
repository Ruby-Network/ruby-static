"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
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
if (proxytype === "Ultraviolet") {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  // window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  // open in iframe
  // remove the display none class
  iframe.classList.remove("dnone");
  iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
});
// Add PWA support
async function registerSW() {
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.register("/sw.js");
  }
}
}
if (proxytype === "DIP") {
  document.querySelector('.dipform').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    worker().then(event=>{
      var val = document.querySelector('.dipinput').value;
      let se = document.getElementById('uv-search-engine').value;
      // remove %s from the search engine url
      se = se.replace('%s', '');
      // add the search query to the end of the search engine url
      se = se + val;
      console.log(se);
      iframe.classList.remove("dnone");
      iframe.src = window.__DIP.config.prefix + window.__DIP.encodeURL(se);
      if (val.includes('https://') || val.includes('http://')) {
        iframe.classList.remove("dnone");
        iframe.src = window.__DIP.config.prefix + window.__DIP.encodeURL(val);
      }
    });
  });
  async function worker() {
    var a = await navigator.serviceWorker.register('/dip-sw.js', {scope: '/service'});
    return a;
  }
}