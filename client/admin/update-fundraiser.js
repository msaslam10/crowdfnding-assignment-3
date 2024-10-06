document.addEventListener("DOMContentLoaded", async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const fundraiserId = urlParams.get('id');
  
    if (!fundraiserId) {
      alert("No fundraiser ID provided.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/fundraisers/${fundraiserId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const fundraiserData = await response.json();
  
      // Populate the form with fundraiser data
      if (fundraiserData.length > 0) {
        const fundraiser = fundraiserData[0];
        document.getElementById("organizer").value = fundraiser.ORGANIZER;
        document.getElementById("caption").value = fundraiser.CAPTION;
        document.getElementById("target_funding").value = fundraiser.TARGET_FUNDING;
        document.getElementById("current_funding").value = fundraiser.CURRENT_FUNDING;
        document.getElementById("city").value = fundraiser.CITY;
        document.getElementById("category_id").value = fundraiser.CATEGORY_ID;
      } else {
        alert("No fundraiser found with the given ID.");
      }
    } catch (error) {
      console.error("Error fetching fundraiser:", error);
    }
  });
  