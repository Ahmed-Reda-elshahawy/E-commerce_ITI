
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



// ==== Delete a product ==== //

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

    // Remove the product row from the table without refreshing all products
    const productRow = document.querySelector(`tr[data-product-id="${currentProductIdToDelete}"]`);
    if (productRow) {
        productRow.remove();
    }

    // Hide the delete modal
    const deleteModal = document.querySelector('#deleteModalForProduct');
    const modal = bootstrap.Modal.getInstance(deleteModal);
    modal.hide();
}






// edit button

export function editProduct() {
    const products = getStoredProducts();
    const product = products.find(p => p.id === currentProductIdToUpdate);

    if (product) {
        // Update the product details
        product.category = categoryInput.value;
        product.title = titleInput.value;
        product.price = parseFloat(priceInput.value); // Ensure price is stored as a number
        product.stock = parseInt(stockInput.value, 10); // Ensure stock is stored as a number

        // Save the updated product list to localStorage
        setStoredProducts(products);

        // Find the corresponding table row and update its contents
        const productRow = document.querySelector(`tr[data-product-id="${currentProductIdToUpdate}"]`);
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

        // Hide the update modal
        const updateModal = document.querySelector('#updateModalForProduct');
        const modal = bootstrap.Modal.getInstance(updateModal);
        modal.hide();
    }
}
export function updateProduct(productId) {
    const storedProducts = getStoredProducts();
    const product = storedProducts.find(p => p.id === productId);
    if (product) {
        categoryInput.value = product.category;
        titleInput.value = product.title;
        priceInput.value = product.price;
        stockInput.value = product.stock;
        currentProductIdToUpdate = productId;
    }
}



// // ==== Update a product ==== //
// let currentProductIdToUpdate = 0;
// const categoryInput = document.getElementById('floatingInputPC')
// const titleInput = document.getElementById('floatingInputPT')
// const priceInput = document.getElementById('floatingInputPP')
// const stockInput = document.getElementById('floatingInputPS')
// export function updateProduct(productId) {
//     const storedProducts = getStoredProducts();
//     const product = storedProducts.find(p => p.id === productId);
//     if (product) {
//         categoryInput.value = product.category;
//         titleInput.value = product.title;
//         priceInput.value = product.price;
//         stockInput.value = product.stock;
//         currentProductIdToUpdate = productId;
//     }
// }
// export function editProduct() {
//     const products = getStoredProducts();
//     const product = products.find(p => p.id === currentProductIdToUpdate);
//     if (product) {
//         product.category = categoryInput.value;
//         product.title = titleInput.value;
//         product.price = priceInput.value;
//         product.stock = stockInput.value;

//         setStoredProducts(products);
//         DisplayProducts(products);

//         const updateModal = document.querySelector('#updateModalForProduct');
//         const modal = bootstrap.Modal.getInstance(updateModal);
//         modal.hide();
//     }
// }
// export function previewImage(event) {
//     const prevImage = document.getElementById('prevImage');
//     const products = getStoredProducts();
//     const product = products.find(p => p.id === currentProductIdToUpdate);
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//         prevImage.src = reader.result;
//         prevImage.classList.remove("d-none");
//         // Set the src of another image 
//         product.images[0] = reader.result;
//         setStoredProducts(products);
//     };
//     if (file) {
//         reader.readAsDataURL(file);
//     } else {
//         prevImage.classList.add("d-none");
//         console.log("no thing");
//     }
// }



// //search function
// const searchInput = document.getElementById('productsSearch');
// if (searchInput) {
//     function searchFilter(searchName) {
//         const products = getStoredProducts();
//         return products.filter(product => product.title.toLowerCase().includes(searchName.toLowerCase()));
//     }
//     searchInput.addEventListener("input", function () {
//         let searchName = searchInput.value;
//         const products = searchFilter(searchName);
//         DisplayProducts(products);
//     });
// }



// // Get a product by its id
// export function goToProductDetailsPage(productId) {
//     window.location.href = `../../Html/ProductsDetails/ProdDetails.html?productId=${productId}`;
// }
// export function getProductById(productId) {
//     const allProducts = JSON.parse(localStorage.getItem("products"));
//     const product = allProducts.find(product => product.id == productId);
//     localStorage.setItem("productDetails", JSON.stringify(product));
// }
