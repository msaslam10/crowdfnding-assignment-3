document.addEventListener('DOMContentLoaded', async () => {
  // getting fundraiser Id from the url params
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const fundraiserId = urlParams.get('id');

  if (!fundraiserId) {
    alert('No fundraiser ID provided.');
    return;
  }
// Calling API
  try {
    const response = await fetch(
      `http://localhost:3000/api/fundraisers/${fundraiserId}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const fundraiserData = await response.json();

    // Populate the form with fundraiser data
    if (fundraiserData.length > 0) {
      const fundraiser = fundraiserData[0]; // Selecting first element of the fundraiser data that contains all details
      document.getElementById('organizer').value = fundraiser.ORGANIZER;
      document.getElementById('caption').value = fundraiser.CAPTION;
      document.getElementById('target_funding').value =
        fundraiser.TARGET_FUNDING;
      document.getElementById('current_funding').value =
        fundraiser.CURRENT_FUNDING;
      document.getElementById('city').value = fundraiser.CITY;
      document.getElementById('category_id').value = fundraiser.CATEGORY_ID;
      document.getElementById('active').checked = fundraiser.ACTIVE;

      // Call the function to display donations
      displayDonations(fundraiserData);
    } else {
      alert('No fundraiser found with the given ID.');
    }
  } catch (error) {
    console.error('Error fetching fundraiser:', error);
  }

  // Handle form submission to update the fundraiser
  document
    .getElementById('fundraiser-form')
    .addEventListener('submit', async (event) => {
      console.log("Starting submitting form...");
      event.preventDefault();

      const organizer = document.getElementById('organizer').value;
      const caption = document.getElementById('caption').value;
      const target_funding = parseFloat(document.getElementById('target_funding').value);
      const current_funding = parseFloat(document.getElementById('current_funding').value);
      const city = document.getElementById('city').value;
      const category_id = parseInt(document.getElementById('category_id').value);
      const active = document.getElementById("active").checked ? 1 : 0;


      // Form validation
      if (
        !organizer ||
        !caption ||
        !target_funding ||
        !current_funding ||
        !city ||
        !category_id
      ) {
        alert('Please fill in all fields.');
        return;
      }

      const updatedFundraiser = {
        organizer,
        caption,
        target_funding,
        current_funding,
        city,
        active,
        category_id,
      };

      try {
        const response = await fetch(
          `http://localhost:3000/api/fundraisers/${fundraiserId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFundraiser),
          }
        );

        if (response.ok) {
          alert('Fundraiser updated successfully!');
        } else {
          throw new Error('Error updating fundraiser');
        }
      } catch (error) {
        console.error('Error updating fundraiser:', error);
        alert('Failed to update fundraiser. Please try again.');
      }
    });
});

// Function to display the list of donations from fundraiser data
const displayDonations = (fundraiserData) => {
  const donationsContainer = document.createElement('div');
  donationsContainer.innerHTML = '<h3>Donations</h3>';
  document.body.appendChild(donationsContainer);

  // Filtering donations
  const donations = fundraiserData.filter(
    (fundraiser) => fundraiser.DONATION_ID !== null
  );

  // Checking if there are any donations
  if (donations.length > 0) {
    donations.forEach((donation) => {
      // Creating a donation div for each donation
      const donationDiv = document.createElement('div');
      donationDiv.innerHTML = `
        <p>Donor: ${donation.GIVER} - Amount: $${parseFloat(
        donation.AMOUNT
      ).toFixed(2)} on ${new Date(donation.DATE).toLocaleDateString()}</p>
      `;
      donationsContainer.appendChild(donationDiv);
    });
  } else {
    donationsContainer.innerHTML +=
      '<p>No donations found for this fundraiser.</p>';
  }
};
