document.addEventListener("DOMContentLoaded", () => {
    const storedProducts = localStorage.getItem("products");
    const products = JSON.parse(storedProducts);

    if (products) {
        const cardContainerSale = document.getElementById("cardContainerAll");

        for (let i = 0; i < storedProducts.length; i++) {
            const product = products[i];
            const cardCol = document.createElement("div");
            cardCol.className = "col-6 col-md-4 col-lg-2";
            cardCol.innerHTML += `
                <div class="card w-100 h-100">
                    <div class="card-image-container">
                        <img src="${products.products[i].images[0]}" class="card-img-top mainimg" alt="${products.products[i].title}">
                        <div class="add-to-cart-icon">
                            <i class="fas fa-cart-plus"></i>
                        </div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${products.products[i].title}</h5>
                        <p class="itemPrice">${products.products[i].price}$</p>
                    </div>
                </div>
            `;

            cardContainerSale.appendChild(cardCol);
        }
    } else {
        console.log("No Data");
    }
});
