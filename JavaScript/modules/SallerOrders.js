document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = getLoggedInUseragain();

    if (loggedInUser) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        console.log("Orders from localStorage:", orders);  // Debugging the orders data

        const userOrders = orders.filter(order => {
            console.log("Checking order:", order);  // Debugging individual orders
            const sellerIds = order.sellerIds;  // Save sellerIds to a variable

            // Ensure sellerIds is a valid array before using .includes()
            if (Array.isArray(sellerIds) && sellerIds.includes(loggedInUser.id)) {
                return true;
            }

            // Log if sellerIds is not valid
            if (!Array.isArray(sellerIds)) {
                console.log("Invalid sellerIds for order:", order);  // Log invalid sellerIds
            }

            return false;
        });

        console.log("Filtered orders:", userOrders);  // Debugging the filtered orders
        displayOrders(userOrders);
    } else {
        console.log("No user is logged in.");
    }
});



// Function to get the logged-in user
export function getLoggedInUseragain() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.currentUser === true);  // Get the user where currentUser is true
}

// Function to display orders in the table
export function displayOrders(orders) {
    const ordersTableBody = document.querySelector('.orders-table tbody');
    ordersTableBody.innerHTML = '';  // Clear any previous data

    // Loop through orders and display them
    orders.forEach(order => {
        ordersTableBody.innerHTML += `
            <tr>
                <td>${order.orderId}</td>
                <td>${order.date}</td>
                <td>${order.userName}</td>
                <td>${order.products.map(product => product.name).join(', ')}</td>
                <td>$${order.totalAmount}</td>
                <td>${order.status}</td>
                <td>${order.sellerIds.join(', ')}</td>
                <td>
                    <button class="btn view-btn" onclick="viewOrder(${order.orderId})">
                        View
                    </button>
                </td>
            </tr>
        `;
    });
}

// Optional function to view more details of an order (just an example)
export function viewOrder(orderId) {
    console.log(`View details for Order ID: ${orderId}`);
}
