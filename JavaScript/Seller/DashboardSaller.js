import { DisplayProducts, getStoredProducts,setStoredProducts  ,confirmDeleteProduct,
     deleteProduct, updateProduct, confirmEditProduct} from "../modules/SallerProducts.js";
import { handleActiveSectionSaller } from "../modules/sellerActive.js";
import { getStoredCustomers } from "../modules/users.js";



//-----------------------------------Display-----------------------------------------------------

//fetch logged-in user For display 
const getLoggedInUser = () => {
    const users = getStoredCustomers(); 
    return users.find(user => user.currentUser === true); // Find the logged-in user
};

// Get the logged-in user
const loggedInUser = getLoggedInUser();

if (loggedInUser) {
    // Fetch all products
    const products = getStoredProducts(); 
    // Filter by user's id
    const filteredProducts = products.filter(product => product.sellerId === loggedInUser.id);

    DisplayProducts(filteredProducts);
} else {
    console.error("No logged-in user found!");
}

//----------------------------------Delete product--------------------------------------------
document.getElementById("delete-product").addEventListener('click', confirmDeleteProduct);
window.deleteProduct = deleteProduct;
//--------------------------------------------------------------------------------------------


//----------------------------------Edit product--------------------------------------------
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
window.previewImage = previewImage;
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

//*******************alert added************ */
const globalAlertPlaceholder = document.getElementById('globalAlertPlaceholder');

// Clear any existing alert
globalAlertPlaceholder.innerHTML = '';

// Create a new alert element
const globalAlertDiv = document.createElement('div');
globalAlertDiv.className = 'alert alert-success alert-dismissible fade show mx-auto';
globalAlertDiv.role = 'alert';
globalAlertDiv.style.width = '50%'; 
globalAlertDiv.innerHTML = `
    <strong>Your product has been added successfully!</strong> 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
`;

// Append the alert to the placeholder
globalAlertPlaceholder.appendChild(globalAlertDiv);

// Automatically remove the alert after 5 seconds
setTimeout(() => {
    globalAlertDiv.classList.remove('show'); // Hide the alert
    globalAlertDiv.addEventListener('transitionend', () => {
        globalAlertDiv.remove(); // Remove it from the DOM after transition
    });
}, 2000);
});
//*********************************************************************************************************** */



// =====================( orders )===================== //
// ==== Initialize Display ==== //
import {
    getStoredOrders,
    displayOrdersForSeller,
    confirmDeleteOrder,
    deleteOrderById,
    editOrder,
    updateOrderById
} from "../modules/SallerOrders.js";

displayOrdersForSeller(getStoredOrders());
document.getElementById("edit-order").addEventListener('click', editOrder);
document.getElementById("delete-order").addEventListener('click', confirmDeleteOrder);
window.deleteOrderById = deleteOrderById;
window.updateOrderById = updateOrderById;

//--------------------------------------------------------------------------------------------------------------

handleActiveSectionSaller();

//--------------------------------------------chart--------------------------------------------------------------
    const orders = [
        {
            "orderId": 111,
            "userId": "user111",
            "userName": "userName1",
            "sellerIds": [1, 2],
            "products": [
                { "id": 1000, "name": "product1", "quantity": 5 },
                { "id": 2000, "name": "product2", "quantity": 4 }
            ],
            "totalAmount": 100.00,
            "status": "Shipped",
            "date": "1/1/2025"
        },
        {
            "orderId": 222,
            "userId": "user222",
            "userName": "userName2",
            "sellerIds": [2, 3],
            "products": [
                { "name": "product3", "quantity": 5 },
                { "name": "product4", "quantity": 4 }
            ],
            "totalAmount": 200.00,
            "status": "Shipped",
            "date": "1/1/2025"
        }
    ];

    const processData = (orders) => {
        const sellerSales = {};

        orders.forEach(order => {
            order.sellerIds.forEach(sellerId => {
                if (!sellerSales[sellerId]) sellerSales[sellerId] = 0;
                sellerSales[sellerId] += order.totalAmount;
            });
        });

        return sellerSales;
    };

    const sellerSales = processData(orders);
    const labels = Object.keys(sellerSales).map(sellerId => `Seller ${sellerId}`);
    const data = Object.values(sellerSales);

    const ctx = document.getElementById('sellerChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // Change to 'line' for a line chart
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Sales ($)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

//----------------------------------------------------------------------------------------------------------
//log out
document.getElementById('logOut').addEventListener('click', function() {
        window.location.href = '../../Html/Auth/Login.html';
});

