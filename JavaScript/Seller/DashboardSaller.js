
// import { DisplayProducts, getStoredProducts, setStoredProducts ,deleteProduct, confirmDeleteProduct,editProduct, updateProduct,previewImage } from "../modules/products.js";
// import {handleActiveSectionSaller} from "../modules/sellerActive.js"
//             //Display.............
// // Fetch products from localStorage
// const products = getStoredProducts();

// const filteredProducts = products.filter(product => product.id === 1);

// // Display the products in the table
// DisplayProducts(products);



import { DisplayProducts, getStoredProducts, confirmDeleteProduct, deleteProduct, editProduct, updateProduct} from "../modules/SallerProducts.js";
import { handleActiveSectionSaller } from "../modules/sellerActive.js";
import { displayOrders, getStoredOrders } from '../modules/orders.js';
import { getStoredCustomers } from "../modules/users.js";
// import {   } from '../modules/SallerProducts.js';

// Helper to fetch logged-in user
const getLoggedInUser = () => {
    const users = getStoredCustomers(); // Assuming this fetches users.json from localStorage
    return users.find(user => user.currentUser === true); // Find the logged-in user
};

// Get the logged-in user
const loggedInUser = getLoggedInUser();

if (loggedInUser) {
    // Fetch all products
    const products = getStoredProducts(); // Assuming this fetches products.json from localStorage

    // Filter products to only those with sellerId matching logged-in user's id
    const filteredProducts = products.filter(product => product.sellerId === loggedInUser.id);

    // Display the filtered products
    DisplayProducts(filteredProducts);
} else {
    console.error("No logged-in user found!");
}













//             //Delete...............
// main.js (or wherever you want to use the functions)

// Import the functions from the product.js file
 //Delete...............
// document.getElementById("edit-customer").addEventListener('click', editCustomer);
document.getElementById("delete-product").addEventListener('click', confirmDeleteProduct);

// window.updateCustomer = updateCustomer;
window.deleteProduct = deleteProduct;






//             //Edit
document.getElementById("edit-product").addEventListener('click', editProduct);
window.updateProduct = updateProduct;

//             document.getElementById("edit-product").addEventListener('click', editProduct);
//             window.updateProduct = updateProduct;
//             window.previewImage = previewImage;






// // ------------------Add Modal Logic--------------------------------------
// const addModal = new bootstrap.Modal(document.querySelector('#addModal'));

// document.querySelector('#addModal form').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent form from refreshing the page

//     // Get form data
//     const productImg = document.getElementById('addProductImg').value.trim();
//     const productCategory = document.getElementById('addProductCategory').value.trim();
//     const productName = document.getElementById('addProductName').value.trim(); // Added Name
//     const productPrice = document.getElementById('addProductPrice').value.trim();
//     const productStock = document.getElementById('addProductStock').value.trim();

//     // Error message elements
//     const errorImg = document.getElementById('errorAddProductImg');
//     const errorCategory = document.getElementById('erroraddProductCategory');
//     const errorName = document.getElementById('errorAddProductName'); // Added Name error
//     const errorPrice = document.getElementById('errorAddProductPrice');
//     const errorStock = document.getElementById('errorAddProductStock');

//     // Clear previous error messages
//     errorImg.textContent = '';
//     errorCategory.textContent = '';
//     errorName.textContent = ''; // Clear Name error
//     errorPrice.textContent = '';
//     errorStock.textContent = '';

//     // Validation logic
//     const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/; // Regex for valid URLs
//     const textAndNumberPattern = /^[a-zA-Z0-9\s]+$/; // Allows letters, numbers, and spaces
//     const numberPattern = /^[0-9]+(\.[0-9]+)?$/; // Allows positive numbers (and decimals)

//     let isValid = true;

//     if (!productImg) {
//         errorImg.textContent = 'Photo URL is required.';
//         isValid = false;
//     } else if (!urlPattern.test(productImg)) {
//         errorImg.textContent = 'Please enter a valid URL for the photo.';
//         isValid = false;
//     }

//     if (!productCategory) {
//         errorCategory.textContent = 'Category is required.';
//         isValid = false;
//     } else if (!textAndNumberPattern.test(productCategory)) {
//         errorCategory.textContent = 'Category can only contain letters and numbers.';
//         isValid = false;
//     }

//     if (!productName) { // Validate Name
//         errorName.textContent = 'Name is required.';
//         isValid = false;
//     } else if (!textAndNumberPattern.test(productName)) {
//         errorName.textContent = 'Name can only contain letters and numbers.';
//         isValid = false;
//     }

//     if (!productPrice) {
//         errorPrice.textContent = 'Price is required.';
//         isValid = false;
//     } else if (!numberPattern.test(productPrice)) {
//         errorPrice.textContent = 'Price must be a valid number.';
//         isValid = false;
//     }

//     if (!productStock) {
//         errorStock.textContent = 'Stock is required.';
//         isValid = false;
//     } else if (!numberPattern.test(productStock)) {
//         errorStock.textContent = 'Stock must be a valid number.';
//         isValid = false;
//     }

//     // If any validation fails, stop further processing
//     if (!isValid) {
//         return;
//     }

//     // If all validations pass
//     const storedProducts = getStoredProducts();
//     const nextId = storedProducts.length > 0 
//         ? Math.max(...storedProducts.map(product => product.id)) + 1 
//         : 1;

//     // Generate a new product object
//     const newProduct = {
//         id: nextId, // Or you can generate a unique ID
//         images: [productImg], // Assuming single image for simplicity
//         category: productCategory,
//         title: productName, // Add Name to product object
//         price: parseFloat(productPrice),
//         stock: parseInt(productStock, 10),
//     };

//     // Add new product to the stored data
//     storedProducts.push(newProduct);

//     // Update localStorage with the new products list
//     setStoredProducts(storedProducts);

//     // Update the table with the new data
//     DisplayProducts(storedProducts);

//     // Close the modal
//     addModal.hide();

//     // Reset the form
//     document.querySelector('#addModal form').reset();
// });


// handleActiveSectionSaller();








//log out
document.getElementById('logOut').addEventListener('click', function() {
    
    window.location.href = '../../Html/Auth/Login.html';

});

