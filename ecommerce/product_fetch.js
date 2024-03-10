const clothingData = [
    { 
      imgSrc: "img/elliptical_trainer.png", 
      name: "Elliptical Trainer", 
      price: "€ 50.99", 
      gender: "Unisex", 
      color: "rosybrown" 
    },
    { 
      imgSrc: "img/foam_roller.png", 
      name: "Foam Roller", 
      price: "€ 50.99", 
      gender: "Unisex", 
      color: "#e3e3ef" 
    },
    { 
      imgSrc: "img/dip_bar1.png", 
      name: "Dip Bar", 
      price: "€ 49.99", 
      gender: "Unisex", 
      color: "#000" 
    },
    { 
      imgSrc: "img/pants.jpg", 
      name: "Men's Pant", 
      price: "€ 30.49", 
      gender: "Male", 
      color: "darkgrey" 
    },
    { 
      imgSrc: "img/trouser-folded.jpg", 
      name: "Men's Pant", 
      price: "€ 35.99", 
      gender: "Male", 
      color: "sandybrown" 
    },
    { 
      imgSrc: "img/winter-dark.jpg", 
      name: "Winter Jacket", 
      price: "€ 65.49", 
      gender: "Unisex", 
      color: "powderblue" 
    },
    { 
      imgSrc: "img/winter-light.jpg", 
      name: "Winter Jacket", 
      price: "€ 65.49", 
      gender: "Unisex", 
      color: "#e3e3ef" 
    },
    { 
      imgSrc: "img/jean-hoodie.jpg", 
      name: "Hoodie (Jean)", 
      price: "€ 105.99", 
      gender: "Unisex", 
      color: "powderblue" 
    },
    { 
      imgSrc: "img/jean-light.jpg", 
      name: "Jean", 
      price: "€ 95.99", 
      gender: "Male", 
      color: "lightblue" 
    },
    { 
      imgSrc: "img/jean-blue.jpg", 
      name: "Jean", 
      price: "€ 95.99", 
      gender: "Male", 
      color: "blue" 
    },
    { 
      imgSrc: "img/dress-blue.jpg", 
      name: "Dress", 
      price: "€ 75.99", 
      gender: "Female", 
      color: "cyan" 
    },
    { 
      imgSrc: "img/dress-pink.jpg", 
      name: "Dress", 
      price: "€ 75.99", 
      gender: "Female", 
      color: "deeppink" 
    }
    // Add more clothing items as needed
  ];
  

// Function to generate clothing cards dynamically
function generateClothingCards() {
    const clothesSection = document.getElementById("clothes");
  
    // Loop through the clothing data and create cards
    clothingData.forEach(item => {
      const clothingCard = document.createElement("div");
      clothingCard.classList.add("clothing-card");
  
      clothingCard.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <span>Gender: ${item.gender}</span>
        <span>Color: <span class="color-circle" style="background-color: ${item.color};"></span></span><br />
        <a href="#" class="btn" onclick="addItemToCart(this)">Add to Cart</a>
      `;
  
      clothesSection.appendChild(clothingCard);
    });
  }
  
  // Call the function to generate clothing cards when the page loads
  window.onload = generateClothingCards;