// write your code here
document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.querySelector('#ramen-menu');
    const ramenDetail = document.querySelector('#ramen-detail');
    const newRamenForm = document.querySelector('#new-ramen');
  
    // Function to create an img element for a ramen
    function createRamenImage(ramen) {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
  
      img.addEventListener('click', () => {
        showRamenDetails(ramen);
      });
  
      return img;
    }
  
    // Function to display the details of a ramen
    function showRamenDetails(ramen) {
      ramenDetail.innerHTML = `
        <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">${ramen.restaurant}</h3>
      `;
      document.querySelector('#rating-display').textContent = ramen.rating;
      document.querySelector('#comment-display').textContent = ramen.comment;
    }
  
    // Fetch all ramens and display their images
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramens => {
        ramens.forEach(ramen => {
          const ramenImage = createRamenImage(ramen);
          ramenMenu.appendChild(ramenImage);
        });
      });
  
    // Handle submission of the new ramen form
    newRamenForm.addEventListener('submit', event => {
      event.preventDefault();
  
      const nameInput = document.querySelector('#new-name');
      const restaurantInput = document.querySelector('#new-restaurant');
      const imageInput = document.querySelector('#new-image');
      const ratingInput = document.querySelector('#new-rating');
      const commentInput = document.querySelector('#new-comment');
  
      const newRamen = {
        name: nameInput.value,
        restaurant: restaurantInput.value,
        image: imageInput.value,
        rating: parseFloat(ratingInput.value),
        comment: commentInput.value,
      };
  
      const ramenImage = createRamenImage(newRamen);
      ramenMenu.appendChild(ramenImage);
  
      nameInput.value = '';
      restaurantInput.value = '';
      imageInput.value = '';
      ratingInput.value = '';
      commentInput.value = '';
    });
  });
  