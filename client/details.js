const urlParams = new URLSearchParams(window.location.search);
const fundraiserId = urlParams.get('id');

console.log(fundraiserId);

const fetchDetails = async (id) => {
  try {
    await fetch(`http://localhost:3000/api/fundraisers/${id}`)
      .then((res) => res.json())
      .then((fundraiser) => {
        document.getElementById('fundraiser-caption').textContent =
          fundraiser.CAPTION;
        document.getElementById(
          'fundraiser-organizer'
        ).innerHTML = `<p>${fundraiser.ORGANIZER}</p>`;
        document.getElementById(
          'fundraiser-target'
        ).innerHTML = `<p style="font-size:20px"><strong>Target Funding:</strong> ${fundraiser.TARGET_FUNDING}</p>`;
        document.getElementById(
          'fundraiser-current'
        ).innerHTML = `<p style="font-size:20px"><strong>Current Funding:</strong> ${fundraiser.CURRENT_FUNDING}</p>`;
        document.getElementById(
          'fundraiser-city'
        ).innerHTML = `<p>${fundraiser.CITY}</p>`;
        document.getElementById(
          'fundraiser-category'
        ).innerHTML = `<p style="font-size: 20px"><strong>Category:</strong> ${fundraiser.CATEGORY}`;

        // progress bar
        const progressElement = document.querySelector("progress");
        progressElement.value = parseFloat(fundraiser.CURRENT_FUNDING);
        progressElement.max = parseFloat(fundraiser.TARGET_FUNDING);
      });



  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

if (fundraiserId) {
  fetchDetails(fundraiserId);
}

const donateButton = document.getElementById("donate").addEventListener("click", () => {
  alert("Function under construction")
})