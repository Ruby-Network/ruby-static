if ('serviceWorker' in navigator) {
  window.navigator.serviceWorker.register("/sw.js").then(registration =>  {
    console.log("SW Registered!");
    console.log(registration);

  }).catch(error =>  {
    console.log("SW Registration Failed!");
    console.log(error);
  })
  }






const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  window.navigator.serviceWorker
    .register("./sw.js", {
      scope: __uv$config.prefix,
    })
    .then(() => {
      let url = input.value.trim();
      if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
      else if (!(url.startsWith("https://") || url.startsWith("http://")))
        url = "http://" + url;

      window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

function isUrl(val = "") {
  return (/^http(s?):\/\//.test(val) || val.includes(".") && val.substr(0, 1) !== " ")
}
