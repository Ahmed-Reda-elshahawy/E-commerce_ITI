import { getStoredOrders, setStoredOrders } from "./orders.js";
import { getStoredCustomers } from "./users.js";
import { getStoredProducts, setStoredProducts } from './products.js';


function generateUniqueId() {
    const orders = getStoredOrders();
    console.log(orders)
    let newId;
    let exists;
    do {
        newId = Date.now() + Math.floor(Math.random() * 1000);
        exists = orders.some(order => order.orderId === newId);
    } while (exists);
    return newId;
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
function updateProductsAfterCheckout() {
    let AllProducts = getStoredProducts(); // Change const to let
    const cartProducts = JSON.parse(localStorage.getItem("cart"));

    AllProducts = AllProducts.map(p => {
        const cartProduct = cartProducts.find(cartP => cartP.id === p.id);
        if (cartProduct) {
            const updatedStock = p.stock - cartProduct.quantity;
            if (updatedStock > 0) {
                return { ...p, stock: updatedStock };
            }
            // If stock is zero, exclude it from the result
            return null;
        }
        return p;
    }).filter(p => p !== null);

    return AllProducts;
}

const paymentForm = document.getElementById("payment-form");
const checkoutBtn = document.getElementById("checkout-btn");
const customerNameInput = document.querySelector(".customer-name");
const customerCardInput = document.querySelector(".customer-card");
const cardExpireDateInput = document.querySelector(".card-expire-date");
const invalidName = document.querySelector(".error-invalid-name");
const invalidCard = document.querySelector(".error-invalid-card");
const invalidDate = document.querySelector(".error-invalid-date");
checkoutBtn.addEventListener("click", function (event) {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const cardNumberRegex = /^\d{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!nameRegex.test(customerNameInput.value)) {
        invalidName.classList.remove("d-none");
        event.preventDefault();
    } else if (!cardNumberRegex.test(customerCardInput.value)) {
        invalidName.classList.add("d-none");
        invalidCard.classList.remove("d-none");
        event.preventDefault();
    } else if (!expiryDateRegex.test(cardExpireDateInput.value)) {
        invalidName.classList.add("d-none");
        invalidCard.classList.add("d-none");
        invalidDate.classList.remove("d-none");
        event.preventDefault();
    }
    else {
        invalidName.classList.add("d-none");
        invalidCard.classList.add("d-none");
        invalidDate.classList.add("d-none");

        // set new data
        const orders = getStoredOrders();
        let newOrder = {
            orderId: generateUniqueId(),
            userId: getUser().id,
            userName: getUser().username,
            sellerIds: getSellers(),
            products: getProductsInCart(),
            totalAmount: getTotal(),
            status: "Pending",
            shippingAddress: getUser().address,
            date: new Date()
        }
        orders.push(newOrder);
        setStoredOrders(orders);
        setStoredProducts(updateProductsAfterCheckout());
        localStorage.removeItem('cart');
        document.getElementById('cart-items').innerHTML = "";

        document.querySelector('.success-mess').classList.remove('d-none');
        setTimeout(() => {
            document.querySelector('.success-mess').classList.add('d-none');
        }, 2000);


        paymentForm.reset();
    }
});