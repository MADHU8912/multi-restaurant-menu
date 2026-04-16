fetch("https://multi-restaurant-menu.onrender.com/restaurants")
  .then(response => response.json())
  .then(data => {
    console.log(data);

    const container = document.getElementById("restaurants");

    data.forEach(restaurant => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h2>${restaurant.name}</h2>
        <p>${restaurant.type}</p>
        <p>${restaurant.location}</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error("Error:", error);
  });