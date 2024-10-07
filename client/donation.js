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
          'fundraiser-city'
        ).innerHTML = `<p>${fundraiser[0].CITY}</p>`;

        // progress bar
        const progressElement = document.querySelector('progress');
        progressElement.value = parseFloat(fundraiser[0].CURRENT_FUNDING);
        progressElement.max = parseFloat(fundraiser[0].TARGET_FUNDING);
      });
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Add donation to fundraiser
  const donationForm = document.getElementById('search-form');

  // add event listener to donation form
  donationForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    // collect form data
    const amount = document.getElementById('amount').value;
    const giver = document.getElementById('giver').value;

    // Form validation
    if (!amount || !giver) {
      alert('Please fill in all fields');
      return;
    }

    // donation data to object

    const donationData = {
      amount,
      giver,
      fundraiserId,
    };

    // Try sending donation details via donation API
    try {
      const response = await fetch('http://localhost:3000/api/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();
      if (response.ok) {
        // Show success message
        alert(result.message);
        // Redirect after 2 seconds to admin panel
        setTimeout(() => {
          window.location.href = `/client/details.html?id=${fundraiserId}`; // redirect to fundraiser page
        }, 2000);
      } else {
        alert(result.error || 'An error occurred, Please try again');
      }
    } catch (error) {
      console.error('Error adding donation:', error);
      alert('Failed to add donation. Please try again.');
    }
  });

  if (fundraiserId) {
    fetchDetails(fundraiserId);
  }
});
