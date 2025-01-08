import { getProductById, goToProductDetailsPage } from "../modules/products.js";

// document.addEventListener("DOMContentLoaded", () => {
function DisplayAllProducts() {
    const products = JSON.parse(localStorage.getItem("products"));

    if (products) {
        const cardContainer = document.getElementById("cardContainerAll");

        let shuffledProducts = JSON.parse(localStorage.getItem("shuffledProducts"));
        if (!shuffledProducts) {
            shuffledProducts = products.products.sort(() => Math.random() - 0.5);
            localStorage.setItem("shuffledProducts", JSON.stringify(shuffledProducts));
        }

        const renderProducts = (filteredProducts) => {
            cardContainer.innerHTML = "";
            filteredProducts.forEach((product) => {
                const cardCol = document.createElement("div");
                cardCol.className = "col-6 col-md-4 col-lg-3 col-xl-2 mb-3";
                cardCol.innerHTML = `
                    <div class="card product-card w-100 h-100" data-product-id="${product.id}">
                        <div class="card-image-container">
                            <img src="${product.images[0]}" class="card-img-top mainimg" alt="${product.title}">
                            <div class="add-to-cart-icon">
                                <i class="fas fa-cart-plus"></i>
                            </div>
                        </div>
                        <div class="card-body">
                            <h6 class="card-title"><b>${product.title}</b></h6>
                            <p class="itemPrice">${product.price}$</p>
                        </div>
                    </div>
                `;
                cardContainer.appendChild(cardCol);
            });
        };

        renderProducts(shuffledProducts);

        const brandFilters = document.querySelectorAll(".brandFilter");
        brandFilters.forEach((filter) => {
            filter.addEventListener("change", () => {
                const selectedBrands = Array.from(brandFilters)
                    .filter((checkbox) => checkbox.checked)
                    .map((checkbox) => checkbox.value);

                if (selectedBrands.length === 0) {
                    renderProducts(shuffledProducts);
                } else {
                    const filteredProducts = shuffledProducts.filter((product) =>
                        selectedBrands.includes(product.brand)
                    );
                    renderProducts(filteredProducts);
                }
            });
        });

        const clearAllButton = document.getElementById("clearAll");
        clearAllButton.addEventListener("click", () => {
            brandFilters.forEach((filter) => {
                filter.checked = false;
            });
            renderProducts(shuffledProducts);
        });
    } else {
        console.log("No products available or invalid data.");
    }
}
DisplayAllProducts();
// });


const productCards = document.querySelectorAll(".product-card");
productCards.forEach(card => {
    card.addEventListener("click", function () {
        const productId = card.getAttribute("data-product-id");
        getProductById(productId);
        goToProductDetailsPage(productId);
    })
});