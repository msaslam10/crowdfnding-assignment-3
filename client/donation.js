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

if (fundraiserId) {
    fetchDetails(fundraiserId);
}
