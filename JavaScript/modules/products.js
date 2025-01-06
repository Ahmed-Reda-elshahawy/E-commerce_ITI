// Export main functions for products

// Load data from a JSON file and store it in localStorage
export async function loadDataFromJson() {
    try {
        const response = await fetch('../../Data/products.json');
        const data = await response.json();

        if (getStoredData().length === 0)
            setStoredData(data);
        console.log("Data loaded into localStorage:", data["products"]);
    } catch (error) {
        console.error("Error loading data: ", error);
        return null;
    }
}

// get and set data to localStorage
export function getStoredData() {
    return JSON.parse(localStorage.getItem('products')) || [];
}
export function setStoredData(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Create a new product
export function createProduct(Product) {
    // Ensure the product has necessary properties like id and name
    if (!Product || !Product.id || !Product.name) {
        console.error("The product must have an id and name.");
        return null;
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(Product);
    setStoredData(products);
    return Product;
}

// Update an existing product
export function updateProduct(productID, updatedProduct) {
    const products = getStoredData();
    const productIndex = products.findIndex(product => product.id === productID);

    // Check if the product was found
    if (productIndex === -1) {
        console.error(`Product with id ${productID} not found.`);
        return null;
    }

    // Ensure that the updated product has the correct id (to avoid mismatched updates)
    if (updatedProduct && updatedProduct.id !== productID) {
        console.error("The updated product must have the same id as the original.");
        return null;
    }

    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    setStoredData(products);
    return updatedProduct;
}

// Delete a product
export function deleteProduct(productID) {
    const products = getStoredData();
    const updatedProducts = products.filter(product => product.id !== productID);

    // Check if the product was found and deleted
    if (updatedProducts.length === products.length) {
        console.error(`Product with id ${productID} not found.`);
        return null;
    }

    setStoredData(updatedProducts);
    return `Product with id ${productID} deleted`;
}

// Get a product by its id
export function getProductById(productID) {
    const products = getStoredData();
    const product = products.find(product => product.id == productID);
    // Log an error if the product was not found
    if (!product) {
        console.error(`Product with id ${productID} not found.`);
    }
    return product || null;
}

// Return all products
export function listAllProducts() {
    const products = getStoredData();
    return products;
}

//search function
export function searchProduct(searchQuery) {
    const products = getStoredData();
    const result = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (result.length === 0) {
        console.log("No products found matching the search criteria.");
        return null;
    }

    return result;
}

// Load products if they are not already stored in localStorage
// if (!localStorage.getItem('products')) {
//     loadDataFromJson();
// }
