// script.js

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const results = document.getElementById("results");
const errorMessage = document.getElementById("error-message");

// Function to search for movies/shows
async function searchShows() {
  const query = searchInput.value;
  if (!query) {
    showError("Please enter a search term.");
    return;
  }

  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const data = await response.json();

    if (data.length === 0) {
      showError("No results found.");
    } else {
      displayResults(data);
    }
  } catch (error) {
    console.error(error);
    showError("An error occurred while fetching data.");
  }
}

// Function to display the search results
function displayResults(shows) {
  errorMessage.textContent = "";
  results.innerHTML = shows
    .map(
      (item) => `
    <div class="card">
      <img src="${item.show.image ? item.show.image.medium : 'https://via.placeholder.com/210x295'}" alt="${item.show.name}" />
      <h3>${item.show.name}</h3>
      <p><strong>Genres:</strong> ${item.show.genres.join(", ") || "N/A"}</p>
      <p><strong>Language:</strong> ${item.show.language || "N/A"}</p>
      <p>${item.show.summary ? item.show.summary + "..." : "No description available."}</p>
    </div>
  `
    )
    .join("");
}

// Function to show error messages
function showError(message) {
  errorMessage.textContent = message;
  results.innerHTML = "";
}

// Event listener for search button
searchButton.addEventListener("click", searchShows);

// Optional: Add "Enter" key support
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchShows();
  }
});
