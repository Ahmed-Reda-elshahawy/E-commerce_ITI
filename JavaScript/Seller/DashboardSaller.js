
// import { DisplayProducts, getStoredProducts, setStoredProducts ,deleteProduct, confirmDeleteProduct,editProduct, updateProduct,previewImage } from "../modules/products.js";
// import {handleActiveSectionSaller} from "../modules/sellerActive.js"
//             //Display.............
// // Fetch products from localStorage
// const products = getStoredProducts();

// const filteredProducts = products.filter(product => product.id === 1);

// // Display the products in the table
// DisplayProducts(products);



import { DisplayProducts, getStoredProducts,setStoredProducts  ,confirmDeleteProduct,
     deleteProduct, updateProduct, confirmEditProduct} from "../modules/SallerProducts.js";
import { handleActiveSectionSaller } from "../modules/sellerActive.js";
// import { displayOrders,  getLoggedInUseragain,   } from '../modules/SallerOrders.js';
import { getStoredCustomers } from "../modules/users.js";
// import {   } from '../modules/SallerProducts.js';
import{getStoredOrders,displayOrders, confirmDeleteOrder, deleteOrderById, editOrder, updateOrderById} from "../modules/orders.js"

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


//---------------------------------------------------------------------------------------
//             //Delete...............
// main.js (or wherever you want to use the functions)

// Import the functions from the product.js file
 //Delete...............
// document.getElementById("edit-customer").addEventListener('click', editCustomer);
document.getElementById("delete-product").addEventListener('click', confirmDeleteProduct);

// window.updateCustomer = updateCustomer;
window.deleteProduct = deleteProduct;
//----------------------------------------------------------------------------------------


//             //Edit
// Attach event listener to the "Edit" button
document.getElementById("edit-product").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    confirmEditProduct();
});

// Make the updateProduct function globally accessible if necessary
window.updateProduct = updateProduct;
function previewImage(event) {
    const fileInput = event.target;
    const preview = document.getElementById('prevImage');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.classList.remove('d-none'); // Make the preview image visible
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        preview.src = '';
        preview.classList.add('d-none'); // Hide the preview image if no file is selected
    }
}

// Make the function accessible globally if it's invoked from HTML
window.previewImage = previewImage;

//             document.getElementById("edit-product").addEventListener('click', editProduct);
//             window.updateProduct = updateProduct;
//             window.previewImage = previewImage;

//--------------------------------------------------------------------------------------------




// ------------------Add Modal Logic--------------------------------------
const addModal = new bootstrap.Modal(document.querySelector('#addModal'));

document.querySelector('#addModal form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form data
    const productImg = document.getElementById('addProductImg').value.trim();
    const productCategory = document.getElementById('addProductCategory').value.trim();
    const productName = document.getElementById('addProductName').value.trim();
    const productPrice = document.getElementById('addProductPrice').value.trim();
    const productStock = document.getElementById('addProductStock').value.trim();

    // Error message elements
    const errorImg = document.getElementById('errorAddProductImg');
    const errorCategory = document.getElementById('erroraddProductCategory');
    const errorName = document.getElementById('errorAddProductName');
    const errorPrice = document.getElementById('errorAddProductPrice');
    const errorStock = document.getElementById('errorAddProductStock');

    // Clear previous error messages
    errorImg.textContent = '';
    errorCategory.textContent = '';
    errorName.textContent = '';
    errorPrice.textContent = '';
    errorStock.textContent = '';

    // Validation logic
    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    const textAndNumberPattern = /^[a-zA-Z0-9\s]+$/;
    const numberPattern = /^[0-9]+(\.[0-9]+)?$/;

    let isValid = true;

    if (!productImg) {
        errorImg.textContent = 'Photo URL is required.';
        isValid = false;
    } else if (!urlPattern.test(productImg)) {
        errorImg.textContent = 'Please enter a valid URL for the photo.';
        isValid = false;
    }

    if (!productCategory) {
        errorCategory.textContent = 'Category is required.';
        isValid = false;
    } else if (!textAndNumberPattern.test(productCategory)) {
        errorCategory.textContent = 'Category can only contain letters and numbers.';
        isValid = false;
    }

    if (!productName) {
        errorName.textContent = 'Name is required.';
        isValid = false;
    } else if (!textAndNumberPattern.test(productName)) {
        errorName.textContent = 'Name can only contain letters and numbers.';
        isValid = false;
    }

    if (!productPrice) {
        errorPrice.textContent = 'Price is required.';
        isValid = false;
    } else if (!numberPattern.test(productPrice)) {
        errorPrice.textContent = 'Price must be a valid number.';
        isValid = false;
    }

    if (!productStock) {
        errorStock.textContent = 'Stock is required.';
        isValid = false;
    } else if (!numberPattern.test(productStock)) {
        errorStock.textContent = 'Stock must be a valid number.';
        isValid = false;
    }

    // If any validation fails, stop further processing
    if (!isValid) {
        return;
    }

    // Get the logged-in user
    const loggedInUser = getLoggedInUser();

    if (!loggedInUser) {
        console.error("No logged-in user found!");
        return;
    }

    // Generate a new product object
    const storedProducts = getStoredProducts();
    const nextId = storedProducts.length > 0 
        ? Math.max(...storedProducts.map(product => product.id)) + 1 
        : 1;

    const newProduct = {
        id: nextId,
        images: [productImg],
        category: productCategory,
        title: productName,
        price: parseFloat(productPrice),
        stock: parseInt(productStock, 10),
        sellerId: loggedInUser.id, // Associate the product with the logged-in seller
    };

    // Add new product to the stored data
    storedProducts.push(newProduct);

    // Update localStorage with the new products list
    setStoredProducts(storedProducts);

    // Get filtered products after adding the new one
    const filteredProducts = storedProducts.filter(product => product.sellerId === loggedInUser.id);

    // Update the table with the filtered products, including the new product
    DisplayProducts(filteredProducts);

    // Close the modal
    addModal.hide();

    // Reset the form
    document.querySelector('#addModal form').reset();
});
//*********************************************************************************************************** */



// =====================( orders )===================== //
displayOrders(getStoredOrders());
document.getElementById("edit-order").addEventListener('click', editOrder);
document.getElementById("delete-order").addEventListener('click', confirmDeleteOrder);
window.deleteOrderById = deleteOrderById;
window.updateOrderById = updateOrderById;
// Importing the functions from orders.js
// Example usage of imported functions
// document.addEventListener("DOMContentLoaded", () => {
//     // Get the logged-in user
//     const loggedInUser = getLoggedInUseragain();
//     if (loggedInUser) {
//         // Fetch orders from localStorage
//         const orders = JSON.parse(localStorage.getItem('orders')) || [];
//         // Filter orders where the sellerId matches the logged-in user's id
//         const userOrders = orders.filter(order => order.sellerIds.includes(loggedInUser.id));
//         // Display orders
//         displayOrders(userOrders);
//     } else {
//         console.log("No user is logged in.");
//     }
// });


// document.getElementById("edit-order").addEventListener('click', editOrder);
// document.getElementById("delete-order").addEventListener('click', confirmDeleteOrder);
// window.deleteOrderById = deleteOrderById;
// window.updateOrderById = updateOrderById;

//--------------------------------------------------------------------------------------------------------------

handleActiveSectionSaller();

//----------------------------------------------------------------------------------------------------------
//chart

// Include Chart.js from CDN
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(script);

// Wait for Chart.js to load
script.onload = function () {
    // Get the canvas element
    const ctx = document.getElementById('sellerChart').getContext('2d');

    // Create the chart
    const sellerChart = new Chart(ctx, {
        type: 'bar', // Change this to 'line', 'pie', etc., as needed
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'], // Example labels
            datasets: [
                {
                    label: 'Sellers',
                    data: [5, 10, 8, 15, 20], // Example data
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
};

//----------------------------------------------------------------------------------------------------------






//log out
document.getElementById('logOut').addEventListener('click', function() {
    
    window.location.href = '../../Html/Auth/Login.html';

});

