const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  window.navigator.serviceWorker
    .register("./uv-sw.js", {
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
  return (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  );
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");

// Listen for changes to the search input
searchInput.addEventListener("input", async (event) => {
  // Get the search query from the input field
  const query = event.target.value;

  // Make a request to the Brave search suggestion API
  const response = await fetch(
    `https://suggestions.brave.com/suggestions?q=${encodeURIComponent(query)}`
  );

  // Parse the response as JSON
  const suggestions = await response.json();

  // Update the search form with the suggestions
  searchForm.innerHTML = suggestions
    .map((suggestion) => `<option value="${suggestion}">`)
    .join("");
});
