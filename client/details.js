const urlParams = new URLSearchParams(window.location.search);
const fundraiserId = urlParams.get('id');

const fetchDetails = async (id) => {
  try {
    await fetch(`http://localhost:3000/api/fundraisers/${id}`)
      .then((res) => res.json())
      .then((fundraiser) => {
        document.getElementById('fundraiser-caption').textContent =
          fundraiser[0].CAPTION;
        document.getElementById(
          'fundraiser-organizer'
        ).innerHTML = `<p>${fundraiser[0].ORGANIZER}</p>`;
        document.getElementById(
          'fundraiser-target'
        ).innerHTML = `<p style="font-size:20px"><strong>Target Funding:</strong> ${fundraiser[0].TARGET_FUNDING}</p>`;
        document.getElementById(
          'fundraiser-current'
        ).innerHTML = `<p style="font-size:20px"><strong>Current Funding:</strong> ${fundraiser[0].CURRENT_FUNDING}</p>`;
        document.getElementById(
          'fundraiser-city'
        ).innerHTML = `<p>${fundraiser[0].CITY}</p>`;
        document.getElementById(
          'fundraiser-category'
        ).innerHTML = `<p style="font-size: 20px"><strong>Category:</strong> ${fundraiser[0].CATEGORY}`;

        // progress bar
        const progressElement = document.querySelector('progress');
        progressElement.value = parseFloat(fundraiser[0].CURRENT_FUNDING);
        progressElement.max = parseFloat(fundraiser[0].TARGET_FUNDING);
        displayDonations(fundraiser);
      });
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

if (fundraiserId) {
  fetchDetails(fundraiserId);
}

const displayDonations = (fundraiserData) => {
  const donationsContainer = document.getElementById('donation-list');

  // Clear previous donations
  donationsContainer.innerHTML = '';

  const donations = fundraiserData.filter(
    (fundraiser) => fundraiser.DONATION_ID !== null
  );

  // Checking if there are any donations
  if (donations.length > 0) {
    donations.forEach((donation) => {
      const donationDiv = document.createElement('div');
      // <p style="font-size:20px"><strong>Current Funding:</strong> ${fundraiser[0].CURRENT_FUNDING}</p>`;
      donationDiv.innerHTML = `
          <p style="font-size:20px"><strong>Donor:</strong> ${donation.GIVER} - <strong>Amount:</strong> $${parseFloat(
        donation.AMOUNT
      ).toFixed(2)} on <strong>${new Date(donation.DATE).toLocaleDateString()}</strong></p>
        `;
      donationsContainer.appendChild(donationDiv);
    });
  } else {
    donationsContainer.innerHTML =
      '<p>No donations found for this fundraiser.</p>';
  }
};

const donateButton = document
  .getElementById('donate')
  .addEventListener('click', () => {
    alert('Function under construction');
  });
