//Add Data To LocalStorage
async function loadDataFromJson() {
    try {
        const response = await fetch('../../Data/products.json');
        const data = await response.json();
        localStorage.setItem("products", JSON.stringify(data));
        console.log("Data loaded into localStorage:", data);
        // return "Products loaded into localStorage";
    } catch (error) {
        console.error("Error loading data: ", error);
        return null;
    }
}

//Search
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

function allProducts() {
    let data = JSON.parse(localStorage.getItem("products"));
    return data;
}

searchInput.addEventListener('input', filterResults);

function displayDropdown(products) {
    searchResults.innerHTML = '';
    products.forEach(product => {
        let li = document.createElement('li');
        li.textContent = product.title;
        li.addEventListener('click', function () {
            localStorage.setItem('selectedTitle', product.title);
            window.location.href = '../../Html/Home/ProductSelectedFromSearch.html';
        });
        searchResults.appendChild(li);
    });
    searchResults.style.display = 'block';
}

function filterResults() {
    let searchText = searchInput.value.toLowerCase();
    let products = allProducts();
    let filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchText)
    );
    displayDropdown(filteredProducts);
}

document.addEventListener('click', function (event) {
    if (!searchInput.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});

//before and after auth
document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem('users'));
    let userIcon = document.getElementById('userIcon');

    userIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        let dropdown1 = document.getElementById('userDropdown1');
        let dropdown2 = document.getElementById('userDropdown2');
        for (var i = 0; i < user.length; i++) {


            if (user[i].currentUser) {

                dropdown1.style.display = 'none';
                dropdown2.style.display = 'block';
                return;

            }


        } dropdown2.style.display = 'none';
        dropdown1.style.display = 'block';



    });


    document.getElementById('login').addEventListener('click', function () {

        window.location.href = '../../Html/Auth/Login.html';

    });

    document.getElementById('signUp').addEventListener('click', function () {

        window.location.href = '../../Html/Auth/Registration.html';

    });


    document.getElementById('logOut').addEventListener('click', function () {
        let user = JSON.parse(localStorage.getItem('users'));
        for (var i = 0; i < user.length; i++) {

            user[i].currentUser = false;
            localStorage.setItem('users', JSON.stringify(user));

        }
        window.location.href = '../../Html/Auth/Login.html';

    });
    document.getElementById('sitting').addEventListener('click', function () {
        window.location.href = '../../Html/User/User.html';
    });


    document.addEventListener('click', function (event) {
        let dropdown1 = document.getElementById('userDropdown1');
        let dropdown2 = document.getElementById('userDropdown2');
        if (!userIcon.contains(event.target)) {
            dropdown1.style.display = 'none';
            dropdown2.style.display = 'none';
        }
    });
});

//cart

// function updateCartItemCount() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

//     const cartItemCountElement = document.getElementById('cart-item-count');
//     if (cartItemCountElement) {
//         if (cartItemCount > 0) {
//             cartItemCountElement.textContent = cartItemCount; // Update the cart item count display
//             cartItemCountElement.style.display = 'inline'; // Show the span
//         } else {
//             cartItemCountElement.style.display = 'none'; // Hide the span when the cart is empty
//         }
//     }
// }
// updateCartItemCount();