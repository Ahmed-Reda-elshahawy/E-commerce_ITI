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
      updateCartItemCount();
    }

    // alert to give a feedback
    const successAlert = document.getElementById('success-add');
    successAlert.innerText = `${selectedProduct.title} has been added to your cart`;
    successAlert.classList.remove("d-none");
    setTimeout(() => {
      successAlert.classList.add("d-none");
    }, 2000);

    // Save the updated cart back to localStorage
    // localStorage.setItem('cart', JSON.stringify(cart));
    setStoredInCartProducts(cart);
  } else {
    alert('No product selected. Please try again.');
  }
}

const selectedProduct = JSON.parse(localStorage.getItem("productDetails"));
if (selectedProduct.stock < 1) {
  document.getElementById('add-to-cart').classList.add('d-none');
  document.querySelector('.outStock').classList.remove('d-none');
}
// else {
//   document.getElementById('add-to-cart').classList.remove('d-none');
//   document.querySelector('.outStock').classList.add('d-none');
// }

function updateCartItemCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const currentUser = users.find(user => user.currentUser == true);
  const userCart = cart.filter(CP => CP.userId == currentUser.id);
  const cartItemCount = userCart.reduce((total, item) => total + item.quantity, 0);

  const cartItemCountElement = document.getElementById('cart-item-count');
  if (cartItemCountElement) {
    if (cartItemCount > 0) {
      cartItemCountElement.textContent = cartItemCount; // Update the cart item count display
      cartItemCountElement.style.display = 'inline'; // Show the span
    } else {
      cartItemCountElement.style.display = 'none'; // Hide the span when the cart is empty
    }
  }
}


// Add event listener to the "Add to Cart" button
document.getElementById('add-to-cart').addEventListener('click', function () {
  const users = JSON.parse(localStorage.getItem('users'));
  // const selectedProduct = JSON.parse(localStorage.getItem("productDetails"));
  const IsLogin = users.find(user => user.currentUser == true);
  if (IsLogin) {
    addToCart();
  } else {
    window.location.href = '../../Html/Auth/Login.html';
  }
});