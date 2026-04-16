fetch("https://multi-restaurant-menu.onrender.com/restaurants")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("restaurants");

    data.forEach(restaurant => {
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <h2>${restaurant.name}</h2>
        <p>${restaurant.type}</p>
        <p>${restaurant.location}</p>
        <button onclick="viewMenu(${restaurant.id})">View Menu</button>
      `;

      container.appendChild(div);
    });

    window.allRestaurants = data;
  })
  .catch(error => {
    console.error("Error:", error);
  });

function viewMenu(id) {
  localStorage.setItem("selectedRestaurantId", id);
  window.location.href = "menu.html";
}