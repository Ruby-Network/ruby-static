const form = document.querySelector(".form");
const input = document.querySelector(".form input");
const proxy = localStorage.getItem("type") || "Ultraviolet";
const hasSW = "serviceWorker" in navigator;

const loadSW = async (sw, opt) =>
  hasSW && (await window.navigator.serviceWorker.register(`./${sw}`, opt));

loadSW("uv-sw.js", {
  scope: __uv$config.prefix,
});

input.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  // event.preventDefault();
  let url = input.value.trim();
  //  ADDED let urlstart = localStorage.getItem("urlstart");
  // if (urlstart == null) {
  //   urlstart = "https://google.com/search?q=";
  // }
  // if (!isUrl(url)) url = /*'https://www.google.com/search?q='*/ urlstart + url;
  // else if (!(url.startsWith("https://") || url.startsWith("http://")))
  // END ADDED   url = "http://" + url;

  switch (proxy) {
    case "Stomp":
      location.href = "." + Stomp.html(url);
    case "DIP":
      location.href = "." + __DIP.config.prefix + __uv$config.encodeUrl(url);
    case "Osana":
      location.href =
        "." + __osana$config.prefix + __osana$config.codec.encode(url);
    case "Aero":
      location.href = "." + "/go/" + url;
    default:
      location.href = "." + __uv$config.prefix + __uv$config.encodeUrl(url);
  }
});

function isUrl(val = "") {
  if (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  )
    return true;
  return false;
}

if (localStorage.getItem("type")) {
  document
    .querySelector(
      "#select-proxy option[value=" + localStorage.getItem("type") + "]"
    )
    .setAttribute("selected", "");
}
