// ==== Get and set stored customers ==== //
export function getStoredOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}
export function setStoredOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}



// ==== Display Orders data ==== //
export function displayOrders(storedOrders) {
    console.log(storedOrders);
    document.querySelector(".orders-table tbody").innerHTML = '';
    for (let i = 0; i < storedOrders.length; i++) {
        document.querySelector(".orders-table tbody").innerHTML += `
            <tr class="table-active">
                <td>${storedOrders[i].orderId}</td>
                <td>${storedOrders[i].date}</td>
                <td>${storedOrders[i].userName}</td>
                <td>
                ${storedOrders[i].products.map(p => `(productId: ${p.id} => quantity: ${p.quantity})<br/>`)}
                </td>
                <td>$${storedOrders[i].totalAmount}</td>
                <td class="fw-bold text-black-50">${storedOrders[i].status}</td>
                <td>${storedOrders[i].sellerIds.map(s => ` [${s}]`)}</td>
                <td>
                    <button class="btn edit-btn" data-bs-target="#updateModalForOrder"
                        data-bs-toggle="modal" onclick="updateOrderById(${storedOrders[i].orderId})">
                        <i class="fa-regular fa-pen-to-square text-primary"></i>
                    </button>
                    <button class="btn delete-btn" data-bs-target="#deleteModalForOrder"
                        data-bs-toggle="modal" onclick="deleteOrderById(${storedOrders[i].orderId})">
                        <i class="fa-solid fa-trash-can text-danger"></i>
                    </button>
                </td>
            </tr>
        `;
    }
}



// ==== Delete Orders data ==== //
let currentOrderIdToDelete = 0;
export function deleteOrderById(orderId) {
    currentOrderIdToDelete = orderId;
}
export function confirmDeleteOrder() {
    const storedOrders = getStoredOrders();
    const newOrders = storedOrders.filter(order => order.orderId != currentOrderIdToDelete);
    setStoredOrders(newOrders);
    displayOrders(newOrders);
    const deleteModal = document.querySelector('#deleteModalForOrder');
    const modal = bootstrap.Modal.getInstance(deleteModal);
    modal.hide();
}



// ==== Update Orders data ==== //
let currentOrderId = 0;
const orderStatusSelect = document.getElementById("selectStatus");
export function updateOrderById(orderId) {
    const storedOrders = getStoredOrders();
    const order = storedOrders.find(order => order.orderId === orderId);
    if (order) {
        // orderStatusInput.value = order.status;
        currentOrderId = orderId;
    }
}
export function editOrder() {
    const storedOrders = getStoredOrders();
    const order = storedOrders.find(order => order.orderId === currentOrderId);
    if (order) {
        order.status = orderStatusSelect.value;
        setStoredOrders(storedOrders);
        displayOrders(storedOrders);
        const updateModal = document.querySelector('#updateModalForOrder');
        const modal = bootstrap.Modal.getInstance(updateModal);
        modal.hide();
    }
}




// ==== Search for a customer ==== //
const searchInput = document.getElementById('ordersSearch');
if (searchInput) {
    function searchFilter(searchName) {
        const orders = getStoredOrders();
        return orders.filter(order => order.sellerName.toLowerCase().includes(searchName.toLowerCase()));
    }
    searchInput.addEventListener("input", function () {
        let searchName = searchInput.value;
        const orders = searchFilter(searchName);
        displayOrders(orders);
    });
}
