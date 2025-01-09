function loadProductDetails() {
  // Retrieve the selected product from localStorage
  const selectedProduct = JSON.parse(localStorage.getItem("productDetails"));
  console.log("selected product: ", selectedProduct);

  if (selectedProduct) {
    // Ensure the product name is displayed correctly
    const productName = selectedProduct.title && selectedProduct.tittle2
      ? `${selectedProduct.title} ${selectedProduct.tittle2}`
      : 'Backpack';

    // Update the DOM with the product details
    document.getElementById('product-brand').innerText = selectedProduct.brand;
    document.getElementById('product-name').innerText = productName;
    document.getElementById('product-price').textContent = `$${selectedProduct.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = selectedProduct.description;
    document.getElementById('product-color').textContent = selectedProduct.color;
    document.getElementById('product-category').textContent = selectedProduct.category;
    document.getElementById('product-image').src = selectedProduct.images[0] || 'https://via.placeholder.com/400';
  } else {
    // If no product is selected, redirect to the homepage
    window.location.href = 'index.html';
  }
}
loadProductDetails()






// Function to add the product to the cart
function addToCart() {
  const selectedProduct = JSON.parse(localStorage.getItem("productDetails"));
  const quantity = parseInt(document.getElementById('quantity').value);

  const product = {
    id: selectedProduct.id,
    title: selectedProduct.title,
    price: selectedProduct.price,
    image: selectedProduct.images[0] || 'https://via.placeholder.com/400',
    quantity: quantity
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = 'cart.html'; // Redirect to shopping cart
}

// Load product details when the page loads
// function loadProductDetails() {
//   const productDetails = JSON.parse(localStorage.getItem("productDetails"));

//   // Assuming you have elements to display product details
//   document.getElementById('product-title').innerText = productDetails.title;
//   document.getElementById('product-price').innerText = `$${productDetails.price.toFixed(2)}`;
//   document.getElementById('product-image').src = productDetails.images[0] || 'https://via.placeholder.com/400';

//   // Initialize quantity input
//   document.getElementById('quantity').value = 1;
// }

// // Call the function to load product details
// loadProductDetails();

// Add event listener to the "Add to Cart" button
const addToCartButton = document.getElementById('add-to-cart');
addToCartButton.addEventListener('click', addToCart);



