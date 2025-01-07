const productsTableBody = document.querySelector('.products-table tbody');



// ==== Get and set stored products ==== //
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
            <tr class="table-active">
                <td>${product.id}</td>
                <td><img src="${product.images[0]}" alt="product-img" style="width: 50px; border-radius: 6px;"/></td>
                <td>${product.category}</td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn" id="edit-btn" data-bs-target="#updateModalForProduct"
                        data-bs-toggle="modal">
                        <i class="fa-regular fa-pen-to-square text-primary"></i>
                    </button>
                    <button class="btn" id="delete-btn" data-bs-target="#deleteModalForProduct"
                        data-bs-toggle="modal" onclick="deleteProduct(${product.id})">
                        <i class="fa-solid fa-trash-can text-danger"></i>
                    </button>
                </td>
            </tr>
        `
    });
}



// ==== Delete a product ==== //
let currentProductIdToDelete = 0;
export function deleteProduct(productId) {
    currentProductIdToDelete = productId;
}

export function confirmDeleteProduct() {
    const products = getStoredProducts();
    const newProducts = products.filter(product => product.id != currentProductIdToDelete);
    setStoredProducts(newProducts);
    DisplayProducts(newProducts);
    const deleteModal = document.querySelector('#deleteModalForProduct');
    const modal = bootstrap.Modal.getInstance(deleteModal);
    modal.hide();
}

// // Get a product by its id
// export function getProductById(productID) {
//     const products = getStoredProducts();
//     const product = products.find(product => product.id == productID);
//     // Log an error if the product was not found
//     if (!product) {
//         console.error(`Product with id ${productID} not found.`);
//     }
//     return product || null;
// }



// //search function
// export function searchProduct(searchQuery) {
//     const products = getStoredProducts();
//     const result = products.filter(product =>
//         product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
//     );
// }
// // //     if (result.length === 0) {
// // //         console.log("No products found matching the search criteria.");
// // //         return null;
// // //     }

// // //     return result;
// // // }

// // Load products if they are not already stored in localStorage
// // if (!localStorage.getItem('products')) {
// //     loadDataFromJson();
// // }
