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
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});

const searchInput = document.getElementById("uv-form");
const searchForm = document.getElementById("uv-address");

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
    .map((suggestion) => `<option value="${suggestion}">${suggestion}</option>`)
    .join("");

  // If there are no suggestions, show a message
  if (suggestions.length === 0) {
    searchForm.innerHTML = `<option>No suggestions</option>`;
  }

  // Show the search form
  searchForm.style.display = "block";
});

// Listen for a click outside of the search form
document.addEventListener("click", (event) => {
  // If the click was outside the search form, hide it
  if (event.target !== searchForm) {
    searchForm.style.display = "none";
  }
});
