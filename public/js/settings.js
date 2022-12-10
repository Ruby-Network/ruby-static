function browserChange() {
  var inputVal = document.getElementById("select-browser").value;
  console.log(inputVal);

  // Use a switch statement to handle the different browser options
  switch (inputVal) {
    case "google":
      localStorage.setItem("urlstart", "https://google.com/search?q=");
      break;
    case "duckduckGo":
      localStorage.setItem("urlstart", "https://duckduckgo.com/?q=");
      break;
    case "brave":
      localStorage.setItem("urlstart", "https://search.brave.com/search?q=");
      break;
    case "qwant":
      localStorage.setItem("urlstart", "https://www.qwant.com/?q=");
      break;
    case "yahoo":
      localStorage.setItem("urlstart", "https://search.yahoo.com/search?q=");
      break;
    default:
      // Set the urlstart to an empty string if the inputVal is not recognized
      localStorage.setItem("urlstart", "");
  }

  console.log(localStorage.getItem("urlstart"));
}
