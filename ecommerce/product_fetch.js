const clothingData = [
  { 
    imgSrc: "img/elliptical_trainer.png", 
    name: "Elliptical Trainer", 
    price: "$299.99", 
    category: "Medium Weight", 
    color: "rosybrown" 
  },
  { 
    imgSrc: "img/threadmill.png", 
    name: "Threadmill", 
    price: "$359.99", 
    category: "Medium Weight", 
    color: "#e3e3ef" 
  },
  { 
    imgSrc: "img/dip_bar1.png", 
    name: "Dip Bar", 
    price: "$49.99", 
    category: "Medium Weight", 
    color: "#000" 
  },
  { 
    imgSrc: "img/kettlebell.png", 
    name: "Kettlebell Weight", 
    price: "$30.49", 
    category: "Light Weight", 
    color: "darkgrey" 
  },
  { 
    imgSrc: "img/elliptical_trainer2.png", 
    name: "Elliptical Trainer", 
    price: "$239.99", 
    category: "Medium Weight", 
    color: "sandybrown" 
  },
  { 
    imgSrc: "img/stabilityball2.png", 
    name: "Stability Ball", 
    price: "$65.49", 
    category: "Light Weight", 
    color: "powderblue" 
  },
  { 
    imgSrc: "img/foam_roller.png", 
    name: "Foam Roller", 
    price: "$65.49", 
    category: "Light Weight", 
    color: "#e3e3ef" 
  },
  { 
    imgSrc: "img/kettlebell2.png", 
    name: "Kettlebell", 
    price: "$105.99", 
    category: "Medium Weight", 
    color: "powderblue" 
  },
  { 
    imgSrc: "img/multifunction2.png", 
    name: "Multifunctional Gym Machine", 
    price: "$375.99", 
    category: "Heavy Weight", 
    color: "deeppink" 
  },
  { 
    imgSrc: "img/stabilityball.png", 
    name: "Stability Ball", 
    price: "$95.99", 
    category: "Light Weight", 
    color: "lightblue" 
  },
  { 
    imgSrc: "img/dip_bar2.png", 
    name: "Dip Bar", 
    price: "$154.99", 
    category: "Heavy Weight", 
    color: "blue" 
  },
  { 
    imgSrc: "img/weightbench.png", 
    name: "Foldable Bench Press", 
    price: "$75.99", 
    category: "Medium Weight", 
    color: "cyan" 
  },
  { 
    imgSrc: "img/pushup_bar.png", 
    name: "Push-up Bar", 
    price: "$75.99", 
    category: "Medium Weight", 
    color: "deeppink" 
  },
  { 
    imgSrc: "img/dumbbell.png", 
    name: "Dumbbell", 
    price: "$154.99", 
    category: "Light Weight", 
    color: "blue" 
  },
  { 
    imgSrc: "img/multifunctional.png", 
    name: "Multifunctional Smith Machine", 
    price: "$375.99", 
    category: "Heavy Weight", 
    color: "cyan" 
  }
];

function generateClothingCards(filteredData = clothingData) {
  const clothesSection = document.getElementById("clothes");
  clothesSection.innerHTML = ''; // Clear previous content

  // Loop through the clothing data and create cards
  filteredData.forEach(item => {
    const clothingCard = document.createElement("div");
    clothingCard.classList.add("clothing-card");

    clothingCard.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <p>${item.category}</p>
      <span>Color: <span class="color-circle" style="background-color: ${item.color};"></span></span><br />
      <a href="#" class="btn" onclick="addItemToCart(this)">Add to Cart</a>
    `;

    clothesSection.appendChild(clothingCard);
  });
}

// Call the function to generate clothing cards when the page loads
window.onload = () => {
  generateClothingCards();
  filterProducts();
};

function filterProducts() {
  // Get filter values
  const search = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('category').value;
  const priceRange = parseFloat(document.getElementById('priceRange').value.replace('$', ''));
  const colors = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

  // Filter logic
  const filteredProducts = clothingData.filter(product => {
    const productPrice = parseFloat(product.price.replace('$', ''));
    const matchesSearch = product.name.toLowerCase().includes(search);
    const matchesCategory = category === 'all' || product.category === category;
    const matchesPrice = isNaN(priceRange) || productPrice <= priceRange;
    const matchesColor = colors.length === 0 || colors.includes(product.color);

    return matchesSearch && matchesCategory && matchesPrice && matchesColor;
  });

  // Update product display
  generateClothingCards(filteredProducts);
}

function updatePriceLabel(value) {
  document.getElementById('priceLabel').textContent = `Up to $${value}`;
}
