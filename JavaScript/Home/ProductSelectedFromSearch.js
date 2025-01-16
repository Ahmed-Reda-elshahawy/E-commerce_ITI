document.addEventListener('DOMContentLoaded', function () {
    const selectedTitle = localStorage.getItem('selectedTitle');
    const allProducts = JSON.parse(localStorage.getItem('products'));

    if (selectedTitle && allProducts) {
        const matchingProducts = allProducts.filter(product => product.title === selectedTitle);

        const productDetails = document.getElementById('productDetails');

        if (matchingProducts.length > 0) {
            matchingProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.style.margin = "130px 0";
                productCard.className = "col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3";
                productCard.innerHTML = `
                <div class="card product-card w-100 h-100">
                <img src="${product.images[0]}" class="card-img-top mainimg" alt="${product.title}">

                
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="itemPrice">${product.price}$</p>
            </div>
        </div>
    `;
                productDetails.appendChild(productCard);
            });
        }
    }
});