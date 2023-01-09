//! About Blank Cloak!
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
//! End About Blank Cloak!
//! Title changer
function titleChanger(value) {
  document.title = value;
  setLocalStorage("title", value);
}
function titleSet() {
  let title = getLocalStorage("title");
  document.title = title;
  // set default value
  if (
    title === null ||
    title === "" ||
    title === "null" ||
    title === "undefined" ||
    title === undefined
  ) {
    document.title = "Ruby";
    titleChanger("Ruby");
  }
}
function titleValue() {
  //document.getElementById("title").value = getLocalStorage("title");
  //document.getElementById("title").value = "test";
  let l = document.getElementById("title");
  let ll = getLocalStorage("title");
  // set default value
  if (
    ll === null ||
    ll === "" ||
    ll === "null" ||
    ll === "undefined" ||
    ll === undefined
  ) {
    l.value = "Ruby";
    titleChanger("Ruby");
  }
}
if (
  window.location.pathname === "/settings" ||
  window.location.pathname === "/settings/"
) {
  titleValue();
}
titleSet();
//! End Title changer
//! Tab Icon
function tabIconChanger(value) {
  document.getElementById("tabIcon").href = value;
  setLocalStorage("tabIcon", value);
}
function tabIconSet() {
  document.getElementById("tabIcon").href = getLocalStorage("tabIcon");
  let tabIcon = getLocalStorage("tabIcon");
  // set default value
  if (
    tabIcon === null ||
    tabIcon === "" ||
    tabIcon === "null" ||
    tabIcon === "undefined" ||
    tabIcon === undefined
  ) {
    // get root url
    let url = window.location.protocol + "//" + window.location.host;
    //console.log(url);
    document.getElementById("tabIcon").href = `${url}/favicon.ico`;
    tabIconChanger(`${url}/favicon.ico`);
  }
}
async function tabIconValue() {
  //document.getElementById("tabIcon").value = getLocalStorage("tabIcon");
  //document.getElementById("tabIcon").value = "test";
  let l = document.getElementById("tabIconChanger");
  l.value = getLocalStorage("tabIcon");
  // set default value
  if (
    l.value === null ||
    l.value === "" ||
    l.value === "null" ||
    l.value === "undefined" ||
    l.value === undefined
  ) {
    // get root url
    let url = window.location.protocol + "//" + window.location.host;
    //console.log(url);
    l.value = `${url}/favicon.ico`;
    tabIconChanger(`${url}/favicon.ico`);
  }
}
if (
  window.location.pathname === "/settings" ||
  window.location.pathname === "/settings/"
) {
  tabIconValue();
}
tabIconSet();
//! End Tab Icon
//! Search Engine Change
function searchEngineChanger(value) {
  setLocalStorage("searchEngine", value);
  console.log(value);
}
function searchEngineSet() {
  let searchEngine = getLocalStorage("searchEngine");
  document.getElementById("select-browser").value = searchEngine;
  // set default value
  if (
    searchEngine === null ||
    searchEngine === "" ||
    searchEngine === "null" ||
    searchEngine === "undefined" ||
    searchEngine === undefined
  ) {
    document.getElementById("select-browser").value = "google";
    searchEngineChanger("google");
  }
}
function searchEngineValue() {
  let l = document.getElementById("select-browser");
  //set option from select to local storage
  l.value = getLocalStorage("searchEngine");
  // set default value
  if (
    l.value === null ||
    l.value === "" ||
    l.value === "null" ||
    l.value === "undefined" ||
    l.value === undefined
  ) {
    l.value = "google";
    searchEngineChanger("google");
  }
}
function indexSearch() {
  let searchEngine = getLocalStorage("searchEngine");
  let search = document.getElementById("uv-search-engine");
  // search.value = getLocalStorage("searchEngine");
  if (searchEngine === "google") {
    search.value = "https://www.google.com/search?q=%s";
  }
  if (searchEngine === "brave") {
    search.value = "https://search.brave.com/search?q=%s";
  }
  if (searchEngine === "qwant") {
    search.value = "https://www.qwant.com/?q=%s";
  }
  if (searchEngine === "duckduckgo") {
    search.value = "https://duckduckgo.com/?q=%s";
  }
  if (searchEngine === "yahoo") {
    search.value = "https://search.yahoo.com/search?p=%s";
  }
  if (searchEngine === "bing") {
    search.value = "https://www.bing.com/search?q=%s";
  }
  if (
    searchEngine === null ||
    searchEngine === "" ||
    searchEngine === "null" ||
    searchEngine === "undefined" ||
    searchEngine === undefined
  ) {
    search.value = "https://www.google.com/search?q=%s";
    setLocalStorage("searchEngine", "google");
    window.location.reload();
  }
}
if (
  window.location.pathname === "/settings" ||
  window.location.pathname === "/settings/"
) {
  searchEngineValue();
  searchEngineSet();
}
if (window.location.pathname === "/") {
  indexSearch();
}
//! End Search Engine Change
//! Proxy Changer
function proxyChanger(value) {
  setLocalStorage("proxy", value);
  console.log(value);
  // window.location.reload();
}
function proxySet() {
  let proxy = getLocalStorage("proxy");
  // document.getElementById("select-proxy").value = proxy;
  // set default value
  if (
    proxy === null ||
    proxy === "" ||
    proxy === "null" ||
    proxy === "undefined" ||
    proxy === undefined
  ) {
    // document.getElementById("select-proxy").value = "Ultraviolet";
    proxyChanger("Ultraviolet");
  }
}
function proxyValue() {
  let l = document.getElementById("select-proxy");
  //set option from select to local storage
  l.value = getLocalStorage("proxy");
  // set default value
  if (
    l.value === null ||
    l.value === "" ||
    l.value === "null" ||
    l.value === "undefined" ||
    l.value === undefined
  ) {
    l.value = "Ultraviolet";
    proxyChanger("Ultraviolet");
  }
}
if (
  window.location.pathname === "/settings" ||
  window.location.pathname === "/settings/"
) {
  proxyValue();
}
proxySet();
//! End Proxy Changer
function changeTheme(value) {
  //console.log(value);
  document.documentElement.className = value;
  localStorage.setItem('theme', value);
  //window.location.reload();
}
function setTheme() {
let theme = localStorage.getItem('theme');
if (theme) {
    document.documentElement.className = theme;
    document.getElementById('theme').value = theme;
  }
else {
  document.documentElement.className = 'default';
  // set value to the dropdown
  document.getElementById('theme').value = 'default';
}
}
function setThemeEverywhereElse () {
let theme = localStorage.getItem('theme');
if (theme) {
    document.documentElement.className = theme;
}
else {
  document.documentElement.className = 'default';
}
}
if (
  window.location.pathname === "/settings" ||
  window.location.pathname === "/settings/"
) { setTheme(); } 
else { setThemeEverywhereElse();  }
function changeBgEffect(value) {
  document.documentElement.className = value;
  localStorage.setItem('bgEffect', value);
  // remove class hidden from particles js
  if (value === 'particles') {
    document.getElementById('particles-js').classList.remove('hidden');
  }
  //document.getElementById('particles-js').classList.remove('hidden');
  window.location.reload();
}
function setBgEffect() {
let bgEffect = localStorage.getItem('bgEffect');
if (bgEffect) {
if (bgEffect !== 'none') {
    // document.documentElement.className = bgEffect;
    if (document.getElementById('particles-js').classList.contains('hidden')) {
      document.getElementById('particles-js').classList.remove('hidden');
    } 
    document.getElementById('bgEffect').value = bgEffect;
  }
else {
  //document.documentElement.className = 'none';
  // set value to the dropdown
  document.getElementById('bgEffect').value = 'none';
  if (!document.getElementById('particles-js').classList.contains('hidden')) {
    document.getElementById('particles-js').classList.add('hidden');
  }
}
}
else {
  //document.documentElement.className = 'none';
  // set value to the dropdown
  document.getElementById('bgEffect').value = 'none';
  if (!document.getElementById('particles-js').classList.contains('hidden')) {
    document.getElementById('particles-js').classList.add('hidden');
  }
}
}
function setBgEffectEverywhereElse () {
let bgEffect = localStorage.getItem('bgEffect');
if (bgEffect) {
if (bgEffect !== 'none') {
  // document.documentElement.className = bgEffect;
  if (document.getElementById('particles-js').classList.contains('hidden')) {
    document.getElementById('particles-js').classList.remove('hidden');
  }
}
else {
  //document.documentElement.className = 'none';
  if (!document.getElementById('particles-js').classList.contains('hidden')) {
    document.getElementById('particles-js').classList.add('hidden');
  }
}
}
else {
  //document.documentElement.className = 'none';
  // set value to the dropdown
  //document.getElementById('bgEffect').value = 'none';
  if (!document.getElementById('particles-js').classList.contains('hidden')) {
    document.getElementById('particles-js').classList.add('hidden');
  }
}
}

if (
  window.location.pathname === "/settings" ||
  window.location.pathname === "/settings/"
) { setBgEffect(); } else { setBgEffectEverywhereElse();  }
//! local storage
function setLocalStorage(key, value) {
  //set local storage
  localStorage.setItem(
    //key, value
    key,
    value
  );
} //get local storage
function getLocalStorage(key) {
  //get local storage
  console.log(localStorage.getItem(key));
  return localStorage.getItem(key);
}
//! End local storage
