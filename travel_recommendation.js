document.getElementById('searchBtn').addEventListener('click', function() {
    // Get the value of the search input and convert it to lowercase
    const searchKeyword = document.getElementById('searchInput').value.toLowerCase();

    // Fetch data from the JSON file
    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Filter the data based on the search keyword
            const filteredData = data.filter(item => {
                // Convert item name to lowercase for case-insensitive comparison
                const itemNameLower = item.name.toLowerCase();
                // Check if the item name contains the search keyword
                return itemNameLower.includes(searchKeyword);
            });

            // Display results
            displayResults(filteredData);
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
        });
});

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (data.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
        data.forEach(item => {
            const resultElement = document.createElement('div');
            resultElement.textContent = item.name; // Adjust this to display relevant data
            resultsContainer.appendChild(resultElement);
        });
    }
}

function clearResults() {
    document.getElementById('results').innerHTML = '';
}

// Add an event listener to the Clear button
document.getElementById('resetBtn').addEventListener('click', clearResults);