window.addEventListener('load', function () {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    var userIndex = users.findIndex(user => user.currentUser);

    if (userIndex === -1) {
        users.push({
            currentUser: true,
            username: "Default User",
            email: "default@example.com",
            phone: "1234567890",
            address: "Default Address"
        });
        userIndex = 0;
        localStorage.setItem('users', JSON.stringify(users));
    }

    var user = users[userIndex];

    document.getElementById('username1').innerText = user.username;
    document.getElementById('username').innerText = user.username;
    document.getElementById('email').innerText = user.email;
    document.getElementById('phone').innerText = user.phone;
    document.getElementById('address').innerText = user.address;

    // Edit Icon Functionality
    document.querySelectorAll('.profileIcon').forEach((icon) => {
        icon.addEventListener('click', function () {
            const parent = this.closest('.dataItem');
            const infoText = parent.querySelector('.infoText');

            if (!parent.querySelector('input')) {
                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.value = infoText.innerText;
                inputField.dataset.field = infoText.id.replace('username', 'username')
                    .replace('email', 'email')
                    .replace('phone', 'phone')
                    .replace('address', 'address');

                infoText.style.display = 'none';
                parent.querySelector('.bordered-box').appendChild(inputField);

                inputField.focus();

                inputField.addEventListener('blur', function () {
                    const fieldName = inputField.dataset.field;
                    const newValue = inputField.value;

                    infoText.innerText = newValue;
                    users[userIndex][fieldName] = newValue;
                    document.getElementById('username1').innerText = user.username;
                    localStorage.setItem('users', JSON.stringify(users));

                    infoText.style.display = 'block';
                    inputField.remove();
                });
            }
        });
    });

    // Logout Functionality
    document.getElementById('logOut1').addEventListener('click', function () {

        for (var i = 0; i < user.length; i++) {

            user[i].currentUser = false;


        }
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = '../../Html/Auth/Login.html';
    });

    // Delete Account Functionality
    document.getElementById('delete').addEventListener('click', function () {
        if (confirm('Are you sure you want to delete your account?')) {
            users.splice(userIndex, 1); // Remove the current user
            localStorage.setItem('users', JSON.stringify(users));
            window.location.href = '../../Html/Auth/Login.html';
        }
    });
});



const buttons = document.querySelectorAll('.profileButton');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

const personalDetailsButton = document.getElementById("personalDetailsButton");
const myOrdersButton = document.getElementById("myOrdersButton");

const personalDetails = document.getElementById('personalDetails');
const myOrders = document.getElementById('myOrders');
const emptyProfile = document.getElementById('emptyProfile');

function hideAllSections() {
    personalDetails.style.display = 'none';
    myOrders.style.display = 'none';
    emptyProfile.style.display = 'none';
}

personalDetailsButton.addEventListener('click', () => {
    hideAllSections();
    personalDetails.style.display = 'block';
});

myOrdersButton.addEventListener('click', () => {
    hideAllSections();
    myOrders.style.display = 'block';
});

hideAllSections();
emptyProfile.style.display = 'block';


//display user orders

const users = JSON.parse(localStorage.getItem("users")) || [];
const orders = JSON.parse(localStorage.getItem("orders")) || [];
const products = JSON.parse(localStorage.getItem("products")) || [];

const currentUser = users.find(user => user.currentUser === true);

const orderEmptyImg = document.getElementById("orderEmptyImg");
const orderDetails = document.getElementById("orderDetails");
const orderList = document.getElementById("orderList");

if (currentUser) {
    const userOrders = orders.filter(order => order.userId === currentUser.id);

    if (userOrders.length > 0) {
        orderEmptyImg.style.display = "none";
        orderDetails.style.display = "block";

        userOrders.forEach(order => {
            const orderItem = document.createElement("li");
            orderItem.classList.add("mb-4");
            orderItem.innerHTML = `
                <div class="border p-3 rounded shadow-sm">
                    <div class="mb-2"><b>Order ID:</b> ${order.orderId}</div>
                    <div class="mb-2"><b>Shipping Address:</b> ${order.shippingAddress}</div>
                    <div class="mb-2"><b>Status:</b> ${order.status}</div>
                    <div class="mb-2"><b>Total Amount:</b> $${order.totalAmount}</div>
                    <div class="mb-2"><b>Products:</b></div>
                    <div>
                        ${order.products.map(product => {
                            const productData = products.find(p => p.id === product.id);
                            return `
                                <div class="product-row d-flex align-items-center mb-3" style="border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                                    <div style="flex: 0 0 120px;">
                                        <img src="${product.images[0]}" alt="${product.title}" style="width: 100%; max-width: 120px; height: 100px; object-fit: cover; border-radius: 8px;">
                                    </div>
                                    <div style="flex: 1; padding-left: 15px;">
                                        <h5 style="margin: 0; font-size: 1.2rem;"><b>${product.title}<b></h5>
                                        <p style="margin: 5px 0; font-size: 0.9rem; color: #555;">${product.tittle2}</p>
                                        <p style="margin: 0; font-size: 0.9rem; color: #555;">Quantity: ${product.quantity}</p>
                                        <p style="margin: 0; font-size: 0.9rem; color: #555;"><b>Price: $${product.price}</p>
                                    </div>
                                </div>
                            `;
                        }).join("")}
                    </div>
                </div>
            `;
            orderList.appendChild(orderItem);
        });
    } else {
        orderEmptyImg.style.display = "block";
        orderDetails.style.display = "none";
    }
} else {
    orderEmptyImg.style.display = "block";
    orderDetails.style.display = "none";
}
