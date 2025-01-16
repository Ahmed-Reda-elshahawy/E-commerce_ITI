// ==== Get and set stored users and orders ==== //
export function getStoredUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}
export function getStoredOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}
export function setStoredOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// ==== Get Current Logged-in User ==== //
export function getCurrentUser() {
    const users = getStoredUsers();
    return users.find(user => user.currentUser === true); // Find the logged-in user
}

// ==== Display Orders data for Logged-in Seller ==== //
export function displayOrdersForSeller(storedOrders) {
    const currentUser = getCurrentUser();

    if (!currentUser || currentUser.role !== 'seller') {
        console.error("No seller logged in or user role is not 'seller'");
        document.querySelector(".orders-table tbody").innerHTML = `
            <tr><td colspan="8">No orders to display</td></tr>
        `;
        return;
    }

    // Filter orders based on the logged-in seller's ID
    const sellerOrders = storedOrders.filter(order => order.sellerIds.includes(currentUser.id));

    console.log(sellerOrders); // Debug: Check filtered orders

    document.querySelector(".orders-table tbody").innerHTML = '';
    for (let i = 0; i < sellerOrders.length; i++) {
        document.querySelector(".orders-table tbody").innerHTML += `
            <tr class="table-active">
                <td>${sellerOrders[i].orderId}</td>
                <td>${sellerOrders[i].date}</td>
                <td>${sellerOrders[i].userName}</td>
                <td>
                ${sellerOrders[i].products.map(p => `(productId: ${p.id} => quantity: ${p.quantity})<br/>`).join('')}
                </td>
                <td>$${sellerOrders[i].totalAmount}</td>
                <td class="fw-bold text-black-50">${sellerOrders[i].status}</td>
                <td>${sellerOrders[i].sellerIds.map(s => ` [${s}]`).join('')}</td>
                <td>
                    <button class="btn edit-btn" data-bs-target="#updateModalForOrder"
                        data-bs-toggle="modal" onclick="updateOrderById(${sellerOrders[i].orderId})">
                        <i class="fa-regular fa-pen-to-square text-primary"></i>
                    </button>
                    <button class="btn delete-btn" data-bs-target="#deleteModalForOrder"
                        data-bs-toggle="modal" onclick="deleteOrderById(${sellerOrders[i].orderId})">
                        <i class="fa-solid fa-trash-can text-danger"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    // Handle case where no orders are found
    if (sellerOrders.length === 0) {
        document.querySelector(".orders-table tbody").innerHTML = `
            <tr><td colspan="8">No orders found for this seller</td></tr>
        `;
    }
}

// ******************************************Delete Orders*************************
let currentOrderIdToDelete = 0;
export function deleteOrderById(orderId) {
    currentOrderIdToDelete = orderId;
}
export function confirmDeleteOrder() {
    const storedOrders = getStoredOrders();
    const newOrders = storedOrders.filter(order => order.orderId != currentOrderIdToDelete);
    setStoredOrders(newOrders);
    displayOrdersForSeller(newOrders); // Update display after deletion
    const deleteModal = document.querySelector('#deleteModalForOrder');
    const modal = bootstrap.Modal.getInstance(deleteModal);
    modal.hide();
}
//*********************************************************************************
// ************************************** Update Orders data ************************* //
let currentOrderId = 0;
const orderStatusSelect = document.getElementById("selectStatus");
export function updateOrderById(orderId) {
    const storedOrders = getStoredOrders();
    const order = storedOrders.find(order => order.orderId === orderId);
    if (order) {
        currentOrderId = orderId;
    }
}
export function editOrder() {
    const storedOrders = getStoredOrders();
    const order = storedOrders.find(order => order.orderId === currentOrderId);
    if (order) {
        order.status = orderStatusSelect.value;
        setStoredOrders(storedOrders);
        displayOrdersForSeller(storedOrders); // Update display after editing
        const updateModal = document.querySelector('#updateModalForOrder');
        const modal = bootstrap.Modal.getInstance(updateModal);
        modal.hide();
    }
}


