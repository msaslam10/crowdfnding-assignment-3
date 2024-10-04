document.getElementById('search-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    // search params from inputs
    const organizerInput = document.getElementById('organizer').value;
    const cityInput = document.getElementById('city').value;
    const categoryInput = document.getElementById('category').value;
  
    if (organizerInput === '' && cityInput === '' && categoryInput === '') {
      alert('Please select any one of the filters');
    } else {
      // query string
      let queryStr = 'http://localhost:3000/api/fundraisers/search?';
      if (organizerInput)
        queryStr += `organizer=${encodeURIComponent(organizerInput)}&`;
      if (cityInput) queryStr += `city=${encodeURIComponent(cityInput)}&`;
      if (categoryInput)
        queryStr += `category=${encodeURIComponent(categoryInput)}&`;
  
      queryStr = queryStr.slice(0, -1);
  
      // API Function
      try {
        fetchSearch(queryStr);
      } catch (err) {
        console.error('Error fetching search results:', error);
        document.getElementById('search-results').innerHTML =
          '<p style="color: red; font-weight: bold;">An error occurred. Please try again later.</p>';
      }
    }
  });
  
  const fetchSearch = async (queryStr) => {
    const res = await fetch(queryStr);
    const data = await res.json();
  
    if (res.ok) {
      // Display results
      console.log(data);
      displayResults(data);
    } else {
      document.getElementById('search-results').innerHTML =
        '<p>An error occurred while searching.</p>';
    }
  };
  
  const displayResults = (results) => {
    const resultsContainer = document.getElementById('search-results');
    // clear result container
    resultsContainer.innerHTML = '';
  
    // handle 0 results case
    if (results.length === 0) {
      resultsContainer.innerHTML =
        '<p style="color: red; font-weight: bold;">No fundraisers found.</p>';
      return;
    }
  
    results.forEach((fundraiser) => {
      const div = document.createElement('div');
      // div.classList.add('results-container');
      div.innerHTML = `
            <h3>${fundraiser.CAPTION}</h3>
            <p>Organizer: ${fundraiser.ORGANIZER}</p>
            <p>Target Funding: ${fundraiser.TARGET_FUNDING}</p>
            <p>Current Funding: ${fundraiser.CURRENT_FUNDING}</p>
            <p>City: ${fundraiser.CITY}</p>
            <p>Category: ${fundraiser.CATEGORY}</p>
            <button onclick="window.location.href='/client/details.html?id=${fundraiser.FUNDRAISER_ID}'">View Details</button>
        `;
      resultsContainer.appendChild(div);
    });
  };
  
  const clearValues = () => {
    document.getElementById('organizer').value = '';
    document.getElementById('city').value = '';
    document.getElementById('category').value = '';
    document.getElementById('search-results').innerHTML = '';
  };
  
  const clearBtn = document
    .getElementById('clear-btn')
    .addEventListener('click', clearValues);
  