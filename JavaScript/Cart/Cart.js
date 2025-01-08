function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');
  
    let totalItems = 0;
    let totalPrice = 0;
  
    cartItemsContainer.innerHTML = '';
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-center">Your cart is empty.</p>';
      totalItemsElement.textContent = 0;
      totalPriceElement.textContent = '$0.00';
      return;
    }
  
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      totalItems += item.quantity;
      totalPrice += itemTotal;
  
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="row">
          <div class="col-md-3">
            <img src="${item.image}" alt="${item.title}" class="img-fluid">
          </div>
          <div class="col-md-6">
            <h5>${item.title}</h5>
            <p>Price: $${item.price.toFixed(2)}</p>
            <div class="quantity-controls">
              <label for="quantity-${index}">Quantity:</label>
              <input type="number" id="quantity-${index}" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            </div>
          </div>
          <div class="col-md-3 text-end">
            <p>Total: $${itemTotal.toFixed(2)}</p>
            <button class="btn-remove" onclick="removeItem(${index})">Remove</button>
          </div>
        </div>
      `;
  
      cartItemsContainer.appendChild(cartItem);
    });
  
    totalItemsElement.textContent = totalItems;
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
  
  function updateQuantity(index, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
      cart[index].quantity = parseInt(newQuantity);
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart();
    }
  }
  
  function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart();
    }
  }
  
  function checkout() {
    // Clear the cart and redirect to the homepage
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
  }
  
  // Load the cart when the page loads
  loadCart();