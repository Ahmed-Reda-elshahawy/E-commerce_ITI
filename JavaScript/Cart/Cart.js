function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
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
                <input type="number" value="${item.quantity}" min="1" class="quantity-input">
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners to quantity inputs
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            const quantity = parseInt(event.target.value, 10);
            if (quantity < 1) {
                event.target.value = 1; // Ensure quantity is at least 1
                return;
            }

            // Find the closest item total element
            const itemTotalElement = event.target.closest('.cart-item').querySelector('.item-total');
            const price = parseFloat(event.target.closest('.cart-item').querySelector('.cart-item-details p:nth-child(2)').textContent.replace('$', ''));

            // Update the total price for the item
            const totalPrice = (price * quantity).toFixed(2);
            itemTotalElement.textContent = totalPrice;
        });
    });

    // Payment Method Selection Logic
    const paymentMethodSelect = document.getElementById('payment-method');
    const paymentMethodFields = document.querySelectorAll('.payment-method-fields');

    paymentMethodSelect.addEventListener('change', (event) => {
        const selectedMethod = event.target.value;

        // Hide all payment method fields
        paymentMethodFields.forEach(field => {
            field.style.display = 'none';
        });

        // Show the selected payment method fields
        if (selectedMethod === 'credit-card') {
            document.getElementById('credit-card-fields').style.display = 'block';
        } else if (selectedMethod === 'paypal') {
            document.getElementById('paypal-fields').style.display = 'block';
        } else if (selectedMethod === 'bank-transfer') {
            document.getElementById('bank-transfer-fields').style.display = 'block';
        }
    });
}

loadCart();