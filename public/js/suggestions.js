const searchInput = document.getElementById("uv-form");
const searchForm = document.getElementById("uv-address");

// Get the search form and suggestions container elements
const suggestionsData = document.getElementById("sDD");
const suggestionsContainer = document.getElementById("uv-suggestions");

// Listen for changes to the search input
searchInput.addEventListener("input", async (event) => {
  // Get the search query from the input field
  const query = event.target.value;

  try {
    // Make a request to the /search endpoint on your server
    const response = await fetch(`/suggest?q=${encodeURIComponent(query)}`);

    // Parse the response data as JSON
    const data = await response.json();
    console.log(data[1]);
    // Check if the "Results" property is defined
    if (data[1]) {
      // Get the suggestions from the response data
      let suggestions = data[1];

      // Clear the search form
      suggestionsData.innerHTML = "";

      // Add the suggestions to the search form
      suggestions.forEach((suggestions) => {
        // Create a new <li> element
        const li = document.createElement("li", { id: "li-sDD" });
        // Set the text content of the <li> element to the suggestion
        li.textContent = suggestions;
        // add value to the <li> element
        li.setAttribute("data-value", suggestions);
        // Append the <li> element to the suggestionsData element
        suggestionsData.appendChild(li);
      });
      // Allow a user click to edit the search query
      // remove the display none class
      suggestionsContainer.classList.remove("dnone");
      // add the display flex class
      suggestionsContainer.classList.add("dflex");
      suggestionsData.addEventListener("click", (event) => {
        // clear the search input
        searchForm.value = "";
        // Get the clicked suggestion
        const suggestion = event.target.textContent;
        searchForm.value = suggestion;
        // hit enter on the form to submit the search
      });
      if (suggestions.length === 0) {
        suggestionsContainer.classList.remove("dflex");
        suggestionsContainer.classList.add("dnone");
      }
    }
  } catch (error) {
    // Handle the error
    console.error(error);
  }
});
