//Browser Change

function browserChange() {
  var inputVal = document.getElementById("select-browser").value;
  console.log(inputVal);
  if (inputVal == "google") {
    localStorage.setItem("urlstart", "https://google.com/search?q=");
    console.log(localStorage.getItem("urlstart"));
  }
  if (inputVal == "duckduckGo") {
    localStorage.setItem("urlstart", "https://duckduckgo.com/?q=");
    console.log(localStorage.getItem("urlstart"));
  }
  if (inputVal == "brave") {
    localStorage.setItem("urlstart", "https://search.brave.com/search?q=");
    console.log(localStorage.getItem("urlstart"));
  }
  if (inputVal == "qwant") {
    localStorage.setItem("urlstart", "https://www.qwant.com/?q=");
    console.log(localStorage.getItem("urlstart"));
  }
  if (inputVal == "yahoo") {
    localStorage.setItem("urlstart", "https://search.yahoo.com/search?q=");
    console.log(localStorage.getItem("urlstart"));
  }
}

//Proxy Change
//Not Ready Yet
