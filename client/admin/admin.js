const fetchFundraisers = async () => {
  const response = await fetch(`http://localhost:3000/api/fundraisers`);
  const fundraisersData = await response.json();
  const fundraiserList = document.getElementById('fundraiser-list');
  fundraiserList.innerHTML = ''; // Clear previous entries

  fundraisersData.forEach((fundraiser) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h2>${fundraiser.CAPTION}</h2>
      <p>Organizer: ${fundraiser.ORGANIZER}</p>
      <p><strong>${fundraiser.CURRENT_FUNDING}</strong> off <strong>${fundraiser.TARGET_FUNDING}</strong> done</p>
      <p>City: ${fundraiser.CITY}</p>
      <div class="button-container-admin">
        <button class="details-btn" data-id="${fundraiser.FUNDRAISER_ID}">View Details</button>
        <button class="update-btn" data-id="${fundraiser.FUNDRAISER_ID}">Update</button>
        <button class="delete-btn" data-id="${fundraiser.FUNDRAISER_ID}">
          <i class="fas fa-trash-alt"></i></button>
      </div>
    `;
    fundraiserList.appendChild(div);
  });

  // Event delegation for delete buttons
  fundraiserList.addEventListener('click', async (event) => {
    if (event.target.closest('.delete-btn')) {
      const deleteBtn = event.target.closest('.delete-btn');
      const fundraiserId = deleteBtn.getAttribute('data-id');

      // Confirmation dialog
      const confirmDelete = confirm('Are you sure you want to delete?');
      if (confirmDelete) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/fundraisers/${fundraiserId}`,
            {
              method: 'DELETE',
            }
          );

          if (response.ok) {
            alert('Fundraiser deleted successfully!');
            fetchFundraisers(); // Refresh the list after deletion
          } else {
            const errorData = await response.json();
            alert(
              errorData.error ||
                'Failed to delete fundraiser. Please try again.'
            );
          }
        } catch (error) {
          console.error('Error deleting fundraiser:', error);
          alert('Failed to delete fundraiser. Please try again.');
        }
      }
    }
  });

  // Event listeners for detail buttons
  document.querySelectorAll('.details-btn').forEach((detailBtn) => {
    detailBtn.addEventListener('click', (event) => {
      const fundraiserId = event.target.getAttribute('data-id');
      console.log(fundraiserId);
      window.location.href = `/client/details.html?id=${fundraiserId}`;
    });
  });

  // Event listeners for update buttons
  document.querySelectorAll('.update-btn').forEach((updateBtn) => {
    updateBtn.addEventListener('click', (event) => {
      const fundraiserId = event.target.getAttribute('data-id');
      console.log(fundraiserId);
      window.location.href = `/client/admin/update-fundraiser.html?id=${fundraiserId}`;
    });
  });
};

// Navigate to add fundraiser page
const addBtn = document.getElementById('add-fundraiser-btn');
addBtn.addEventListener('click', (event) => {
  window.location.href = 'add-fundraiser.html';
});

fetchFundraisers();
