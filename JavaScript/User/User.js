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
    document.getElementById('logOut').addEventListener('click', function () {
        users.forEach(user => user.currentUser = false);
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
const myAddressButton = document.getElementById("myAddressButton");

const personalDetails = document.getElementById('personalDetails');
const myOrders = document.getElementById('myOrders');
const myAddress = document.getElementById('myAddress');
const emptyProfile = document.getElementById('emptyProfile');

function hideAllSections() {
    personalDetails.style.display = 'none';
    myOrders.style.display = 'none';
    myAddress.style.display = 'none';
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

myAddressButton.addEventListener('click', () => {
    hideAllSections(); 
    myAddress.style.display = 'block'; 
});

hideAllSections();
emptyProfile.style.display = 'block';