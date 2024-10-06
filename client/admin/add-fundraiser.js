// To make sure that our function runs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const addFundraiser = async () => {
      const form = document.getElementById('fundraiser-form');
  
      form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form from reloading the page
  
        // Collect form data
        const formData = {
          organizer: document.getElementById('organizer').value,
          caption: document.getElementById('caption').value,
          target_funding: document.getElementById('target_funding').value,
          current_funding: document.getElementById('current_funding').value,
          city: document.getElementById('city').value,
          category_id: document.getElementById('category_id').value
        };
  
        try {
          const response = await fetch('http://localhost:3000/api/fundraisers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
  
          const result = await response.json();
  
          if (response.ok) {
            // Show success message
            alert(result.message);
            // Redirect after 2 seconds to admin panel
            setTimeout(() => {
                window.location.href = '/client/admin/admin.html';
            }, 1000)
            
          } else {
            // Show error message
            alert(result.error || 'An error occurred. Please try again.');
          }
        } catch (error) {
          console.error('Error adding fundraiser:', error);
          alert('An error occurred while adding the fundraiser.');
        }
      });
    };
  
    addFundraiser(); // Calling the function
  });