// Function to add an item to the cart
function addItemToCart(clickedItem) {
    const itemDiv = clickedItem.parentNode;
    const itemName = itemDiv.querySelector('h3').textContent;
    const itemPrice = parseFloat(itemDiv.querySelector('p').textContent.replace('$ ', ''));
    const itemImage = itemDiv.querySelector('img').src;
  
    const item = {
      name: itemName,
      price: itemPrice,
      image: itemImage,
      quantity: 1 // Set initial quantity to 1
    };
  
    let cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    cartItems.push(item);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  
    window.location.href = 'cart.html';
  }
  
  // cart.js
  
  function displayCartItems() {
    const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  
    const cartContainer = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');
  
    let totalPrice = 0;
  
    cartContainer.innerHTML = ''; // Clear the container before updating
  
    cartItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
  
      const itemImage = new Image();
      itemImage.src = item.image;
      itemImage.alt = item.name;
      itemImage.style.width = '50px'; // Set the width
      itemImage.style.height = '50px'; // Set the height
  
      const itemName = document.createElement('h3');
      itemName.textContent = item.name;
  
      const itemPrice = document.createElement('p');
      const singleItemPrice = item.price * (item.quantity || 1);
      itemPrice.textContent = `$ ${singleItemPrice.toFixed(2)}`;
  
      const quantityDiv = document.createElement('div');
      quantityDiv.classList.add('quantity');
      const decreaseBtn = document.createElement('button');
      decreaseBtn.textContent = '-';
      decreaseBtn.onclick = () => decreaseQuantity(item, itemPrice, totalPriceDiv);
      const quantityText = document.createElement('span');
      quantityText.textContent = item.quantity || 1; // Set the displayed quantity
      const increaseBtn = document.createElement('button');
      increaseBtn.textContent = '+';
      increaseBtn.onclick = () => increaseQuantity(item, quantityText, itemPrice, totalPriceDiv);
  
      quantityDiv.appendChild(decreaseBtn);
      quantityDiv.appendChild(quantityText);
      quantityDiv.appendChild(increaseBtn);
  
      itemDiv.appendChild(itemImage);
      itemDiv.appendChild(itemName);
      itemDiv.appendChild(itemPrice);
      itemDiv.appendChild(quantityDiv);
  
      cartContainer.appendChild(itemDiv);
  
      totalPrice += singleItemPrice; // Update total price for each item
    });
  
    totalPriceDiv.textContent = `Total Price: $ ${totalPrice.toFixed(2)}`;
  }
  
  
  
  function decreaseQuantity(item, itemPriceElement, totalPriceDiv) {
    // Decrease quantity logic here
    // For demonstration, let's assume it decreases the quantity by 1
    item.quantity = Math.max(1, (item.quantity || 1) - 1);
    updateItemPrice(item, itemPriceElement, totalPriceDiv);
  }
  
  function increaseQuantity(item, quantityText, itemPriceElement, totalPriceDiv) {
    // Increase quantity logic here
    // For demonstration, let's assume it increases the quantity by 1
    item.quantity = (item.quantity || 1) + 1;
    updateItemPrice(item, itemPriceElement, totalPriceDiv);
  }
  
  function updateItemPrice(item, itemPriceElement, totalPriceDiv) {
    // Update the item price based on quantity
    itemPriceElement.textContent = `$ ${(item.price * (item.quantity || 1)).toFixed(2)}`;
  
    // Recalculate total price and update the total price display
    let totalPrice = 0;
    const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    cartItems.forEach(cartItem => {
      totalPrice += cartItem.price * (cartItem.quantity || 1);
    });
    totalPriceDiv.textContent = `Total Price: $ ${totalPrice.toFixed(2)}`;
  }
  
  function clearCart() {
    localStorage.removeItem('cart');
    displayCartItems(); // Refresh cart display after clearing
  }
  
  function displayCheckoutSummary() {
    const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    const summaryDiv = document.querySelector('.summary-div');
  
    let totalPrice = 0;
  
    summaryDiv.innerHTML = ''; // Clear the summary div before updating
  
    cartItems.forEach(item => {
      const itemSummary = document.createElement('div');
      itemSummary.classList.add('item-summary');
  
      const itemName = document.createElement('h4');
      itemName.textContent = item.name;
  
      const itemQuantity = document.createElement('p');
      itemQuantity.textContent = `Quantity: ${item.quantity}`;
  
      const itemTotalPrice = item.price * item.quantity;
      totalPrice += itemTotalPrice;
  
      const itemPrice = document.createElement('p');
      itemPrice.textContent = `Price: $ ${itemTotalPrice.toFixed(2)}`;
  
      itemSummary.appendChild(itemName);
      itemSummary.appendChild(itemQuantity);
      itemSummary.appendChild(itemPrice);
  
      summaryDiv.appendChild(itemSummary);
    });
  
    const proceedButton = document.createElement('button');
    proceedButton.textContent = 'Proceed to Pay';
    proceedButton.onclick = () => {
      // Redirect or perform payment action
      alert('Redirecting to payment page...');
      // Replace 'payment.html' with your actual payment page
      window.location.href = 'payment.html';
    };
  
    const totalPriceElement = document.createElement('h3');
    totalPriceElement.textContent = `Total Price: $ ${totalPrice.toFixed(2)}`;
  
    summaryDiv.appendChild(totalPriceElement);
    summaryDiv.appendChild(proceedButton);
  }
  
  // Call the function to display the summary when the page loads
  window.onload = displayCheckoutSummary;
  
  
  window.onload = function() {
    if (window.location.pathname.includes('cart.html')) {
      displayCartItems();
    }
  };
  
  