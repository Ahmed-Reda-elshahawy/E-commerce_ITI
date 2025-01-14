import { getStoredInCartProducts, setStoredInCartProducts } from "../modules/products.js";
import { getStoredCustomers } from './../modules/users.js';

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
    document.getElementById('product-stock').innerText = selectedProduct.stock;
    document.getElementById('product-description').textContent = selectedProduct.description;
    document.getElementById('product-color').textContent = selectedProduct.color;
    document.getElementById('product-category').textContent = selectedProduct.category;
    document.getElementById('product-image').src = selectedProduct.images[0] || 'https://via.placeholder.com/400';
  } else {
    // If no product is selected, redirect to the homepage
    window.location.href = '../../Html/Home/Home.html';
  }
}
loadProductDetails()



// Function to add product to cart
function addToCart() {
  const selectedProduct = JSON.parse(localStorage.getItem("productDetails"));
  const users = getStoredCustomers();
  const currentUser = users.find(user => user.currentUser == true);

  if (selectedProduct) {
    // const product = {
    //   id: selectedProduct.id,
    //   sellerId: selectedProduct.sellerId,
    //   name: selectedProduct.title && selectedProduct.tittle2
    //     ? `${selectedProduct.title} ${selectedProduct.tittle2}`
    //     : 'Backpack',
    //   price: selectedProduct.price,
    //   image: selectedProduct.images[0] || 'https://via.placeholder.com/80',

    //   quantity: 1,
    //   stock: selectedProduct.stock
    // };
    selectedProduct.quantity = 1;
    selectedProduct.userId = currentUser.id;

    // Retrieve the current cart from localStorage or initialize an empty array
    // let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cart = getStoredInCartProducts();

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.id === selectedProduct.id);
    if (existingProduct) {
      // If the product exists, increase its quantity
      selectedProduct.quantity += 1;
    } else {
      // If the product doesn't exist, add it to the cart
      cart.push(selectedProduct);
    }

    // Save the updated cart back to localStorage
    // localStorage.setItem('cart', JSON.stringify(cart));
    setStoredInCartProducts(cart);
  } else {
    alert('No product selected. Please try again.');
  }
}

// Add event listener to the "Add to Cart" button
document.getElementById('add-to-cart').addEventListener('click', function () {
  const users = JSON.parse(localStorage.getItem('users'));
  const selectedProduct = JSON.parse(localStorage.getItem("productDetails"));
  const IsLogin = users.find(user => user.currentUser == true);
  if (IsLogin && selectedProduct.stock > 0) {
    addToCart();
  } else {
    window.location.href = '../../Html/Auth/Login.html';
  }
});