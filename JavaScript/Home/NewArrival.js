import { getProductById, goToProductDetailsPage } from "../modules/products.js";

function DisplayNewProducts() {
    const storedProducts = localStorage.getItem("products");
    const products = JSON.parse(storedProducts);


    if (products) {
        const cardContainer = document.getElementById("cardContainerAll");

        let shuffledProducts = JSON.parse(localStorage.getItem("shuffledProducts"));

        if (!shuffledProducts) {
            shuffledProducts = products.sort(() => Math.random() - 0.5);

            localStorage.setItem("shuffledProducts", JSON.stringify(shuffledProducts));
        }

        console.log("Stored products:", shuffledProducts);

        for (let i = 0; i < Math.min(30, shuffledProducts.length); i++) {
            const cardCol = document.createElement("div");
            cardCol.className = "col-6 col-md-4 col-lg-2";
            cardCol.innerHTML = `
                <div class="card product-card w-100 h-100" data-product-id="${products[i].id}">
                    <div class="card-image-container">
                        <img src="${products[i].images[0]}" class="card-img-top mainimg" alt="${products[i].title}">
                        <div class="add-to-cart-icon">
                            <i class="fas fa-cart-plus"></i>
                        </div>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title"><b>${products[i].title}</b></h6>
                        <p class="itemPrice">${products[i].price}$</p>
                    </div>
                </div>
            `;
            cardContainer.appendChild(cardCol);
        }
    } else {
        console.log("No products available or invalid data.");
    }
}
DisplayNewProducts();



const productCards = document.querySelectorAll(".product-card");
productCards.forEach(card => {
    card.addEventListener("click", function () {
        const productId = card.getAttribute("data-product-id");
        getProductById(productId);
        goToProductDetailsPage(productId);
    })
});