// ==== Fetch and store users ==== //
async function fetchAndStoreUsers() {
    // Check if users have been fetched and stored
    const isFetched = localStorage.getItem('isUsersFetched');
    if (isFetched) {
        return;
    }

    try {
        const response = await fetch('../../Data/users.json');
        const users = await response.json();
        localStorage.setItem('users', JSON.stringify(users));
        // Set the flag to indicate users have been fetched and stored
        localStorage.setItem('isUsersFetched', 'true');
    } catch (error) {
        console.error('Error fetching users data: ', error);
        return [];
    }
}
(async () => { await fetchAndStoreUsers(); })();



// ==== Fetch and store products ==== //
async function fetchAndStoreProducts() {
    // Check if users have been fetched and stored
    const isFetched = localStorage.getItem('isProductsFetched');
    if (isFetched) {
        return;
    }

    try {
        const response = await fetch('../../Data/products.json');
        const products = await response.json();
        localStorage.setItem('products', JSON.stringify(products));
        // Set the flag to indicate users have been fetched and stored
        localStorage.setItem('isProductsFetched', 'true');
    } catch (error) {
        console.error('Error fetching products data: ', error);
        return [];
    }
}
(async () => { await fetchAndStoreProducts(); })();



// ==== Fetch and store orders ==== //
async function fetchAndStoreOrders() {
    // Check if users have been fetched and stored
    const isFetched = localStorage.getItem('isOrdersFetched');
    if (isFetched) {
        return;
    }

    try {
        const response = await fetch('../../Data/orders.json');
        const orders = await response.json();
        localStorage.setItem('orders', JSON.stringify(orders));
        // Set the flag to indicate users have been fetched and stored
        localStorage.setItem('isOrdersFetched', 'true');
    } catch (error) {
        console.error('Error fetching orders data: ', error);
        return [];
    }
}
(async () => { await fetchAndStoreOrders(); })();