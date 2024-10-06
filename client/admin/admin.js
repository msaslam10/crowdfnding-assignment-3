const fetchFundraisers = async () => {
    await fetch(`http://localhost:3000/api/fundraisers`)
      .then((resposne) => resposne.json())
      .then((fundraisersData) => {
        const fundraiserList = document.getElementById('fundraiser-list');
        fundraisersData.forEach((fundraiser) => {
          const div = document.createElement('div');
          div.innerHTML = `
            <h2>${fundraiser.CAPTION}</h2>
            <p>Organizer: ${fundraiser.ORGANIZER}</p>
            <p><strong>${fundraiser.CURRENT_FUNDING}</strong> off <strong>${fundraiser.TARGET_FUNDING}</strong> done</p>
            <p>City: ${fundraiser.CITY}</p>
            <button class="details-btn" data-id="${fundraiser.FUNDRAISER_ID}">View Details</button>
          `;
          fundraiserList.appendChild(div);
        });
        document.querySelectorAll('.details-btn').forEach((detailBtn) => {
          detailBtn.addEventListener('click', (event) => {
            const fundraiserId = event.target.getAttribute('data-id');
            console.log(fundraiserId);
            window.location.href = `/client/details.html?id=${fundraiserId}`;
          });
        });
      });
  };
  
  // Navigate to add fundraiser page
  const addBtn = document.getElementById('add-fundraiser-btn');
  addBtn.addEventListener('click', (event) => {
    window.location.href = 'add-fundraiser.html';
  });
  
  fetchFundraisers();
  