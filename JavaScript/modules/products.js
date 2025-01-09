const productsTableBody = document.querySelector('.products-table tbody');



// ==== Get and set stored products ==== //
export function getStoredProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}
export function setStoredProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}



// ==== Display products data ==== //
// export function DisplayProducts(data) {
//     productsTableBody.innerHTML = '';
//     data.forEach(product => {
//         productsTableBody.innerHTML += `
//             <tr class="table-active">
//                 <td>${product.id}</td>
//                 <td><img src="${product.images[0]}" alt="product-img" style="width: 50px; border-radius: 6px;"/></td>
//                 <td>${product.category}</td>
//                 <td>$${product.price}</td>
//                 <td>${product.stock}</td>
//                 <td>
                    
//                     <button class="btn" id="delete-btn" data-bs-target="#deleteModalForProduct"
//                         data-bs-toggle="modal" onclick="deleteProduct(${product.id})">
//                         <i class="fa-solid fa-trash-can text-danger"></i>
//                     </button>
//                 </td>
//             </tr>
//         `
//     });
// }
// ==== Delete a product ==== //
// let currentProductIdToDelete = 0;
// export function deleteProduct(productId) {
//     currentProductIdToDelete = productId;
// }

// export function confirmDeleteProduct() {
//     const products = getStoredProducts();
//     const newProducts = products.filter(product => product.id != currentProductIdToDelete);
//     setStoredProducts(newProducts);
//     DisplayProducts(newProducts);
//     const deleteModal = document.querySelector('#deleteModalForProduct');
//     const modal = bootstrap.Modal.getInstance(deleteModal);
//     modal.hide();
// }





















// ==== Display products data ==== //
export function DisplayProducts(data) {
    productsTableBody.innerHTML = '';
    data.forEach(product => {
        productsTableBody.innerHTML += `
            <tr class="table-active">
                <td>${product.id}</td>
                <td><img src="${product.images[0]}" alt="product-img" style="width: 50px; border-radius: 6px;"/></td>
                <td>${product.category}</td>
                <td>${product.title}</td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn" id="edit-btn" data-bs-target="#updateModalForProducts"
                        data-bs-toggle="modal" onclick="updateProduct(${product.id})">
                        <i class="fa-regular fa-pen-to-square text-primary"></i>
                    </button>
                    <button class="btn" id="delete-btn" data-bs-target="#deleteModalForProduct"
                        data-bs-toggle="modal" onclick="deleteProduct(${product.id})">
                        <i class="fa-solid fa-trash-can text-danger"></i>
                    </button>
                    
                </td>
            </tr>
        `;
    });
}

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
    
    // Update the stock for products with the same brand (category)
    const deletedCategory = productToDelete.category;
    newProducts.forEach(product => {
        if (product.category === deletedCategory) {
            product.stock = Math.max(0, product.stock - 1); // Ensure stock doesn't go below 0
        }
    });

    // Save the updated products list to localStorage
    setStoredProducts(newProducts);

    // Refresh the table display
    DisplayProducts(newProducts);

    // Hide the delete modal
    const deleteModal = document.querySelector('#deleteModalForProduct');
    const modal = bootstrap.Modal.getInstance(deleteModal);
    modal.hide();
}



//search function
const searchInput = document.getElementById('productsSearch');
if (searchInput) {
    function searchFilter(searchName) {
        const products = getStoredProducts();
        return products.filter(product => product.title.toLowerCase().includes(searchName.toLowerCase()));
    }
    searchInput.addEventListener("input", function () {
        let searchName = searchInput.value;
        const products = searchFilter(searchName);
        DisplayProducts(products);
    });
}



// Get a product by its id
export function goToProductDetailsPage(productId) {
    window.location.href = `../../Html/ProductsDetails/ProdDetails.html?productId=${productId}`;
}
export function getProductById(productId) {
    const allProducts = JSON.parse(localStorage.getItem("products"));
    const product = allProducts.find(product => product.id == productId);
    localStorage.setItem("productDetails", JSON.stringify(product));
}