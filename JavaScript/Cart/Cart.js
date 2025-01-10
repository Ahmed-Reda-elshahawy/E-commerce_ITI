function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.createElement('div'); // Element to show the total price.

    cartItemsContainer.innerHTML = '';
    cartTotalElement.id = 'cart-total';
    cartItemsContainer.appendChild(cartTotalElement);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let totalCartPrice = 0;

    cart.forEach((item, index) => {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const checkedProduct = products.find((product) => product.id === item.id);

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="product-image">
            <div class="cart-item-details">
                <p><strong>Product:</strong> ${item.name}</p>
                <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                <p><strong>Total:</strong> $<span class="item-total">${(item.price * item.quantity).toFixed(2)}</span></p>
            </div>
            <div class="cart-item-quantity">
                <input type="number" value="${item.quantity}" min="1" max="${checkedProduct.stock}" class="quantity-input" data-index="${index}">
            </div>
        `;
        cartItemsContainer.insertBefore(cartItem, cartTotalElement); // Ensure total element is at the end.
        totalCartPrice += item.price * item.quantity;
    });

    // Display the initial total price
    cartTotalElement.innerHTML = `<p><strong>Total Cart Price:</strong> $${totalCartPrice.toFixed(2)}</p>`;

    // Add event listeners to quantity inputs
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            const index = parseInt(event.target.dataset.index, 10);
            const quantity = parseInt(event.target.value, 10);

            if (quantity < 1) {
                event.target.value = 1; // Ensure quantity is at least 1
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
            const newTotalCartPrice = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
            cartTotalElement.innerHTML = `<p><strong>Total Cart Price:</strong> $${newTotalCartPrice.toFixed(2)}</p>`;
        });
    });

    // // Payment Method Selection Logic
    // const paymentMethodSelect = document.getElementById('payment-method');
    // const paymentMethodFields = document.querySelectorAll('.payment-method-fields');

    // paymentMethodSelect.addEventListener('change', (event) => {
    //     const selectedMethod = event.target.value;

    //     // Hide all payment method fields
    //     paymentMethodFields.forEach(field => {
    //         field.style.display = 'none';
    //     });

    //     // Show the selected payment method fields
    //     if (selectedMethod === 'credit-card') {
    //         document.getElementById('credit-card-fields').style.display = 'block';
    //     } else if (selectedMethod === 'paypal') {
    //         document.getElementById('paypal-fields').style.display = 'block';
    //     }
    // });
}

loadCart();
