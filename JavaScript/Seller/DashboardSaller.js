
import { DisplayProducts, getStoredProducts, setStoredProducts ,deleteProduct, confirmDeleteProduct } from "../modules/products.js";
import {handleActiveSectionSaller} from "../modules/sellerActive.js"
            //Display.............
// Fetch products from localStorage
const products = getStoredProducts();

// Display the products in the table
DisplayProducts(products);


            //Delete...............
// document.getElementById("edit-customer").addEventListener('click', editCustomer);
document.getElementById("delete-product").addEventListener('click', confirmDeleteProduct);

// window.updateCustomer = updateCustomer;
window.deleteProduct = deleteProduct;





            //Edit
// document.getElementById("edit-product").addEventListener('click', confirmUpdateProduct);
// window.updateProduct = updateCustomer;






// ------------------Add Modal Logic--------------------------------------
const addModal = new bootstrap.Modal(document.querySelector('#addModal'));

document.querySelector('#addModal form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form data
    const productImg = document.getElementById('addProductImg').value.trim();
    const productBrand = document.getElementById('addProductBrand').value.trim();
    const productPrice = document.getElementById('addProductPrice').value.trim();
    const productStock = document.getElementById('addProductStock').value.trim();

    // Error message elements
    const errorImg = document.getElementById('errorAddProductImg');
    const errorBrand = document.getElementById('errorAddProductBrand');
    const errorPrice = document.getElementById('errorAddProductPrice');
    const errorStock = document.getElementById('errorAddProductStock');

    // Clear previous error messages
    errorImg.textContent = '';
    errorBrand.textContent = '';
    errorPrice.textContent = '';
    errorStock.textContent = '';

    // Validation logic
    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/; // Regex for valid URLs
    const textAndNumberPattern = /^[a-zA-Z0-9\s]+$/; // Allows letters, numbers, and spaces
    const numberPattern = /^[0-9]+(\.[0-9]+)?$/; // Allows positive numbers (and decimals)

    let isValid = true;

    if (!productImg) {
        errorImg.textContent = 'Photo URL is required.';
        isValid = false;
    } else if (!urlPattern.test(productImg)) {
        errorImg.textContent = 'Please enter a valid URL for the photo.';
        isValid = false;
    }

    if (!productBrand) {
        errorBrand.textContent = 'Brand is required.';
        isValid = false;
    } else if (!textAndNumberPattern.test(productBrand)) {
        errorBrand.textContent = 'Brand can only contain letters and numbers.';
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

    // If all validations pass
    const storedProducts = getStoredProducts();
    const nextId = storedProducts.length > 0 
        ? Math.max(...storedProducts.map(product => product.id)) + 1 
        : 1;

    // Generate a new product object
    const newProduct = {
        id: nextId, // Or you can generate a unique ID
        images: [productImg], // Assuming single image for simplicity
        category: productBrand,
        price: parseFloat(productPrice),
        stock: parseInt(productStock, 10),
    };

    // Add new product to the stored data
    storedProducts.push(newProduct);

    // Update localStorage with the new products list
    setStoredProducts(storedProducts);

    // Update the table with the new data
    DisplayProducts(storedProducts);

    // Close the modal
    addModal.hide();

    // Reset the form
    document.querySelector('#addModal form').reset();
});


handleActiveSectionSaller();










