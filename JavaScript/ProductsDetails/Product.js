// Function to load product details
function loadProductDetails() {
    // Retrieve the selected product from localStorage
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  
    if (selectedProduct) {
      // Ensure the product name is displayed correctly
      const productName = selectedProduct.title && selectedProduct.tittle2 
        ? `${selectedProduct.title} ${selectedProduct.tittle2}` 
        : 'Backpack'; 
  
      // Update the DOM with the product details
      document.getElementById('product-name').textContent = productName;
      document.getElementById('product-price').textContent = `$${selectedProduct.price.toFixed(2)}`;
      document.getElementById('product-description').textContent = selectedProduct.description;
      document.getElementById('product-style').textContent = selectedProduct.style;
      document.getElementById('product-category').textContent = selectedProduct.category;
      document.getElementById('product-image').src = selectedProduct.images[0] || 'https://via.placeholder.com/400'; // Fallback image
    } else {
      // If no product is selected, redirect to the homepage
      window.location.href = 'index.html';
    }
  }
  
  // Function to add the product to the cart
  function addToCart() {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  
    if (!selectedProduct) {
      // If no product is found, redirect to the homepage
      window.location.href = 'index.html';
      return;
    }
  
    const quantity = parseInt(document.getElementById('quantity').value);
  
    const product = {
      id: selectedProduct.id,
      title: `${selectedProduct.title} ${selectedProduct.tittle2}`,
      price: selectedProduct.price,
      image: selectedProduct.images[0] || 'https://via.placeholder.com/400',
      style: selectedProduct.style,
      category: selectedProduct.category,
      quantity: quantity
    };
  
    // Get the existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id // Only check for product ID (no size or color)
    );
  
    if (existingProductIndex !== -1) {
      // If the product exists, update its quantity
      cart[existingProductIndex].quantity += product.quantity;
    } else {
      // If the product does not exist, add it to the cart
      cart.push(product);
    }
  
    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    // Redirect to the cart page
    window.location.href = 'cart.html';
  }
  
  // Load product details when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails();
  });
  
  // Add event listener to the "Add to Cart" button
  const addToCartButton = document.getElementById('add-to-cart');
  addToCartButton.addEventListener('click', addToCart);