// ==== Get and set stored customers ==== //
export function getStoredOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}
export function setStoredOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}



// ==== Display customers data ==== //
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
                ${storedOrders[i].products.map(p => `(${p.name} => ${p.stock})<br/>`)}
                </td>
                <td>$${storedOrders[i].totalAmount}</td>
                <td>${storedOrders[i].status}</td>
                <td>${storedOrders[i].sellerName}</td>
                <td>
                    <button class="btn edit-btn" data-bs-target="#updateModalForCustomer"
                        data-bs-toggle="modal" onclick="updateOrder(${storedOrders[i].id})">
                        <i class="fa-regular fa-pen-to-square text-primary"></i>
                    </button>
                    <button class="btn delete-btn" data-bs-target="#deleteModalForCustomer"
                        data-bs-toggle="modal" onclick="deleteOrder(${storedOrders[i].id})">
                        <i class="fa-solid fa-trash-can text-danger"></i>
                    </button>
                </td>
            </tr>
        `;
    }
}
