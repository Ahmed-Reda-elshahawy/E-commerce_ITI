// import { DisplayProducts, getStoredProducts } from '../modules/products.js';

// // Fetch products from localStorage
// const products = getStoredProducts();

// // Display the products in the table
// DisplayProducts(products);


















const productsTableBody = document.querySelector('.products-table tbody');

// 1- get and set data to localStorage
function getStoredData() {
    return JSON.parse(localStorage.getItem('products')) || [];
}
function setStoredData(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// 3- Display customers data
function DisplayData(data) {
    productsTableBody.innerHTML = '';
    data.forEach(product => {

        // Display only the first image
        const imageTags = product.images && product.images.length > 0 
            ? `<img src="${product.images[0]}" alt="Product Image" style="max-width: 50px; margin-right: 5px;">`
            : ''; // Fallback for no images

        productsTableBody.innerHTML += ` 
            <tr class="table-active">
                <td>${product.id}</td>
                <td>${imageTags}</td>
                <td>$${product.brand}</td>
                <td>${product.price}</td>
                <td>
                    <button class="btn" id="edit-btn" data-bs-target="#updateModalForProduct"
                        data-bs-toggle="modal">
                        <i class="fa-regular fa-pen-to-square text-primary"></i>
                    </button>
                    <button class="btn" id="delete-btn" data-bs-target="#deleteModalForProduct"
                        data-bs-toggle="modal">
                        <i class="fa-solid fa-trash-can text-danger"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

// Initially load the stored data
DisplayData(getStoredData());



// Add Modal Logic
const addModal = new bootstrap.Modal(document.querySelector('#addModal'));
document.querySelector('#addModal form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form data
    const productimg = document.getElementById('addProductImg').value;
    const productPrice = document.getElementById('addProductPrice').value;
    const productBrand = document.getElementById('addProductBrand').value;

    // Get stored data from localStorage
    const storedProducts = getStoredData();

    // Generate a new product object
    const newProduct = {
        id: storedProducts.length + 1, // Or you can generate a unique ID       storedProducts.length + 1
        images: [productimg], // Assuming single image for simplicity
        brand: productBrand,
        price: productPrice
    };

    // Add new product to the stored data
    storedProducts.push(newProduct);

    // Update localStorage with the new products list
    setStoredData(storedProducts);

    // Update the table with the new data
    DisplayData(storedProducts);

    // Close the modal
    addModal.hide();
    
    // Reset the form
    document.querySelector('#addModal form').reset();
});
