import { displayOrders, getStoredOrders, setStoredOrders } from "./orders.js";
import { getStoredCustomers } from "./users.js";

const checkoutBtn = document.getElementById("checkout-btn");
const customerNameInput = document.getElementById("customer-name");
const customerCardInput = document.getElementById("customer-card");
const cardExpireDateInput = document.getElementById("card-expire-date");

function generateUniqueId(orders) {
    let maxId = 0;
    orders.forEach(order => {
        if (order.orderId > maxId) {
            maxId = order.orderId;
        }
    });
    return maxId + 1;
}
function getProductsInCart() {
    const productsInCart = JSON.parse(localStorage.getItem("cart"));
    return productsInCart;
}
function getUser() {
    const users = getStoredCustomers();
    const currentUser = users.find(user => user.currentUser == true);
    return currentUser;
}
function getSellers() {
    let sellerIds = [];
    const productsInCart = JSON.parse(localStorage.getItem("cart"));
    productsInCart.forEach(p => sellerIds.push(p.sellerId));
    return sellerIds;
}
function getTotal() {
    const productsInCart = JSON.parse(localStorage.getItem("cart"));
    let total = 0;
    productsInCart.forEach(p => {
        total += (p.quantity * p.price);
    });
    return total;
}


const newOrder = {
    orderId: generateUniqueId(getStoredOrders()),
    userId: getUser().id,
    userName: getUser().username,
    sellerIds: getSellers(),
    products: getProductsInCart(),
    totalAmount: getTotal(),
    status: "Pending",
    shippingAddress: getUser().address,
    date: new Date()
}

checkoutBtn.addEventListener("click", function (e) {
    const orders = getStoredOrders();
    orders.push(newOrder);
    setStoredOrders(orders);
    // displayOrders(orders);
});