function DisplayCartItems(userCart, cartItemsContainer, cartTotalElement) {
    let totalCartPrice = 0;

    // cart items list
    userCart.forEach((item, index) => {
        // const checkedProduct = products.find((product) => product.id === item.id);

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
                <img src="${item.images[0]}" alt="${item.title}" class="product-image me-3">
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p class="fw-bold text-black-50"><strong>Stock:</strong> ${item.stock >= 1 ? item.stock : `<span id="product-brand"class="d-inline-block rounded-3 bg-black text-white fw-bold fs-6 py-1 px-2 mb-2">Out Of Stock</span>`}</p>
                    <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                    <p><strong>Total:</strong> $<span class="item-total">${(item.price * item.quantity).toFixed(2)}</span></p>
                </div>
                <div class="cart-item-quantity">
                    <input type="number" value="${item.quantity}" min="1" max="${item.stock}" class="quantity-input px-1 rounded border-1" data-stock="${item.stock}" data-index="${index}" data-itemId="${item.id}">
                </div>
                <span class="delete-btn" data-index="${index}" data-id="${item.id}" style="cursor: pointer; color: gary; font-weight: bold;" onclick="DeleteCartItem(${item.id})">X</span>
            `;
        cartItemsContainer.insertBefore(cartItem, cartTotalElement); // Ensure total element is at the end.
        totalCartPrice += Number(item.price) * Number(item.quantity);
    });

    // Display the initial total price
    cartTotalElement.innerHTML = `<p><strong>Total Cart Price:</strong> $${totalCartPrice.toFixed(2)}</p>`;
}
function UpdateTotalPrice(cart, userCart, cartTotalElement) {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            const index = parseInt(event.target.dataset.index, 10);
            const quantity = parseInt(event.target.value, 10);
            const stock = parseInt(event.target.getAttribute("data-stock"), 10);

            if (quantity < 1) {
                event.target.value = 1; // Ensure quantity is at least 1
                return;
            }
            if (quantity > stock) {
                event.target.value = stock;
                return;
            }

            // Update the cart object
            cart[index].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));

            // Find the closest item total element
            const itemTotalElement = event.target.closest('.cart-item').querySelector('.item-total');
            const price = cart[index].price;

            // Update the total price for the item
            const totalPrice = (price * quantity).toFixed(2);
            itemTotalElement.textContent = totalPrice;

            // Update the total cart price
            console.log(userCart);
            const newTotalCartPrice = userCart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
            cartTotalElement.innerHTML = `<p><strong>Total Cart Price:</strong> $${newTotalCartPrice.toFixed(2)}</p>`;
        });
    });
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.currentUser == true);
    const userCart = cart.filter(CP => CP.userId == currentUser.id);
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.createElement('div'); // Element to show the total price.
    // const products = JSON.parse(localStorage.getItem('products')) || [];
    console.log(userCart)

    cartItemsContainer.innerHTML = '';
    cartTotalElement.id = 'cart-total';
    cartItemsContainer.appendChild(cartTotalElement);

    if (userCart.length === 0) {
        cartItemsContainer.innerHTML = '<div><img src="../../assets/images/EmptyCart.jpg"" alt="Empty Cart" class=" w-100 rounded-5 opacity-50"> </div>';
        return;
    }

    DisplayCartItems(userCart, cartItemsContainer, cartTotalElement);

    UpdateTotalPrice(cart, userCart, cartTotalElement);
}
loadCart();


function DeleteCartItem(itemId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(itemId);
    const cartItems = cart.filter(item => item.id != itemId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    loadCart();
}