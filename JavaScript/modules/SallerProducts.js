const productsTableBody = document.querySelector('.products-table tbody');

//  Get and set   
export function getStoredProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}
export function setStoredProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}


// ==== Display products data ==== //
export function DisplayProducts(data) {
    productsTableBody.innerHTML = '';
    data.forEach(product => {
        productsTableBody.innerHTML += `
            <tr class="table-active" data-product-id="${product.id}">
                <td>${product.id}</td>
                <td><img src="${product.images[0]}" alt="product-img" style="width: 50px; border-radius: 6px;"/></td>
                <td>${product.category}</td>
                <td>${product.title}</td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn edit-btn" data-bs-target="#updateModalForProduct"
                        data-bs-toggle="modal" onclick="updateProduct(${product.id})">
                        <i class="fa-regular fa-pen-to-square text-primary"></i>
                    </button>
                    <button class="btn delete-btn" data-bs-target="#deleteModalForProduct"
                        data-bs-toggle="modal" onclick="deleteProduct(${product.id})">
                        <i class="fa-solid fa-trash-can text-danger"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

//----------------------------------------------------------------------------

// ==== Delete a product ==== //
let currentProductIdToDelete = 0;

export function deleteProduct(productId) {
    currentProductIdToDelete = productId;
}

export function confirmDeleteProduct() {
    // Get the current list of products
    let products = getStoredProducts();

    // Find the product being deleted by its ID
    const productToDelete = products.find(product => product.id === currentProductIdToDelete);
    if (!productToDelete) return; // Exit if the product is not found (safety check)

    // Filter out the product being deleted
    const newProducts = products.filter(product => product.id !== currentProductIdToDelete);

    // Update the stock for products with the same category
    const deletedCategory = productToDelete.category;
    newProducts.forEach(product => {
        if (product.category === deletedCategory) {
            product.stock = Math.max(0, product.stock - 1); // Ensure stock doesn't go below 0
        }
    });

    // Save the updated products list to localStorage
    setStoredProducts(newProducts);

    // Find the row for the deleted product and remove it from the table
    const productRow = document.querySelector(`tr[data-product-id="${currentProductIdToDelete}"]`);
    if (productRow) {
        productRow.remove();
    }

    // Update the stock of other products in the same category in the table without re-rendering everything
    const allRows = document.querySelectorAll('.products-table tbody tr');
    allRows.forEach(row => {
        const productId = parseInt(row.getAttribute('data-product-id'), 10);
        const product = newProducts.find(p => p.id === productId);
        if (product && product.category === deletedCategory) {
            const stockCell = row.querySelector('td:nth-child(6)'); // Assuming stock is the 6th column
            if (stockCell) {
                stockCell.textContent = product.stock; // Update stock in the table
            }
        }
    });

    // Hide the delete modal
    const deleteModal = document.querySelector('#deleteModalForProduct');
    const modal = bootstrap.Modal.getInstance(deleteModal);
    modal.hide();
}
//-------------------------------------------------------------------------------------



// edit button
// Global variable to hold the current product ID for editing
let currentProductIdToEdit = 0;

export function updateProduct(productId) {
    currentProductIdToEdit = productId;

    // Get the product details
    const products = getStoredProducts();
    const productToEdit = products.find(product => product.id === productId);
    if (!productToEdit) return;

    // Pre-fill the input fields with the product's current details
    document.getElementById("floatingInputPC").value = productToEdit.category;
    document.getElementById("floatingInputPT").value = productToEdit.title;
    document.getElementById("floatingInputPP").value = productToEdit.price;
    document.getElementById("floatingInputPS").value = productToEdit.stock;
}

// Function to confirm and save edited product details
export function confirmEditProduct() {
    // Get the current list of products from localStorage
    const products = getStoredProducts();

    // Find the product being edited by its ID
    const productToEdit = products.find(product => product.id === currentProductIdToEdit);
    if (!productToEdit) return; // Exit if the product is not found (safety check)

    // Get the updated values from the input fields
    const updatedCategory = document.getElementById("floatingInputPC").value.trim();
    const updatedTitle = document.getElementById("floatingInputPT").value.trim();
    const updatedPrice = parseFloat(document.getElementById("floatingInputPP").value.trim());
    const updatedStock = parseInt(document.getElementById("floatingInputPS").value.trim(), 10);
    const updatedPhotoInput = document.getElementById("floatingInputPI");

    // Clear previous error messages
    clearErrorMessages();

    // Validate input values and display error messages if necessary
    let isValid = true;

    // Validate category
    if (!updatedCategory) {
        displayErrorMessage("floatingInputPC", "Category is required.");
        isValid = false;
    }

    // Validate title
    if (!updatedTitle) {
        displayErrorMessage("floatingInputPT", "Title is required.");
        isValid = false;
    }

    // Validate price
    if (isNaN(updatedPrice) || updatedPrice <= 0) {
        displayErrorMessage("floatingInputPP", "Price must be a positive number.");
        isValid = false;
    }

    // Validate stock
    if (isNaN(updatedStock) || updatedStock < 0) {
        displayErrorMessage("floatingInputPS", "Stock must be a non-negative number.");
        isValid = false;
    }

    if (!isValid) {
        return; // Stop the update if validation fails
    }

    // Update the product object with the new text values
    productToEdit.category = updatedCategory;
    productToEdit.title = updatedTitle;
    productToEdit.price = updatedPrice;
    productToEdit.stock = updatedStock;

    // Handle the image update
    if (updatedPhotoInput.files && updatedPhotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Update the product's image with the new base64 data
            productToEdit.images = [e.target.result];

            // Save the updated products list back to localStorage
            setStoredProducts(products);

            // Update the displayed products in the table
            updateProductRow(productToEdit);

            // Hide the edit modal and alert success
            hideEditModal();
            // Show success message if needed
            // alert("Product updated successfully!");
        };
        reader.readAsDataURL(updatedPhotoInput.files[0]); // Read the new image as base64
    } else {
        // If no image is uploaded, proceed with updating other fields and save the product list
        setStoredProducts(products);

        // Update the displayed products in the table
        updateProductRow(productToEdit);

        // Hide the edit modal and alert success
        hideEditModal();
        // Show success message if needed
        // alert("Product updated successfully!");
    }
}

// Function to clear error messages under inputs
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());
}

// Function to display error messages under inputs
function displayErrorMessage(inputId, message) {
    const inputField = document.getElementById(inputId);
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "12px";
    errorMessage.textContent = message;
    inputField.insertAdjacentElement('afterend', errorMessage); // Add error message under the input
}

export function hideEditModal() {
    const editModal = document.querySelector('#updateModalForProduct');
    const modal = bootstrap.Modal.getInstance(editModal);
    if (modal) modal.hide();
}

// Helper function to update the product row in the table
export function updateProductRow(product) {
    const productRow = document.querySelector(`tr[data-product-id="${product.id}"]`);
    if (productRow) {
        productRow.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.images[0]}" alt="product-img" style="width: 50px; border-radius: 6px;"/></td>
            <td>${product.category}</td>
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td>${product.stock}</td>
            <td>
                <button class="btn edit-btn" data-bs-target="#updateModalForProduct"
                    data-bs-toggle="modal" onclick="updateProduct(${product.id})">
                    <i class="fa-regular fa-pen-to-square text-primary"></i>
                </button>
                <button class="btn delete-btn" data-bs-target="#deleteModalForProduct"
                    data-bs-toggle="modal" onclick="deleteProduct(${product.id})">
                    <i class="fa-solid fa-trash-can text-danger"></i>
                </button>
            </td>
        `;
    }
}


//-------------------------------------------------------------------------------------------

