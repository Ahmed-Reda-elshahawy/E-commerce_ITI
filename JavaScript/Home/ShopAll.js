import { getProductById, goToProductDetailsPage } from "../modules/products.js";


function DisplayAllProducts() {
    const products = JSON.parse(localStorage.getItem("products"));

    if (products) {
        const cardContainer = document.getElementById("cardContainerAll");

        let shuffledProducts = JSON.parse(localStorage.getItem("shuffledProducts"));
        if (!shuffledProducts) {
            shuffledProducts = products.products.sort(() => Math.random() - 0.5);
            localStorage.setItem("shuffledProducts", JSON.stringify(shuffledProducts));
        }

        const productsPerPage = 18; 
        let currentPage = 1; 

        const renderProducts = (filteredProducts, page) => {
            cardContainer.innerHTML = "";
            const startIndex = (page - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;

            for (let i = startIndex; i < Math.min(endIndex, filteredProducts.length); i++) {
                const product = filteredProducts[i];
                const cardCol = document.createElement("div");
                cardCol.className = "col-6 col-md-4 col-lg-3 col-xl-2 mb-3";
                cardCol.innerHTML = `
                    <div class="card product-card w-100 h-100" data-product-id="${product.id}">
                        <div class="card-image-container">
                            <img src="${product.images[0]}" class="card-img-top mainimg" alt="${product.title}">
                        </div>
                        <div class="card-body">
                            <h6 class="card-title"><b>${product.title}</b></h6>
                            <p class="itemPrice">${product.price}$</p>
                        </div>
                    </div>
                `;
                cardContainer.appendChild(cardCol);
            }

            let paginationControls = document.getElementById("paginationControls");
            if (!paginationControls) {
                paginationControls = document.createElement("nav");
                paginationControls.id = "paginationControls";
                paginationControls.setAttribute("aria-label", "Page navigation");
                paginationControls.innerHTML = `
                    <ul class="pagination justify-content-center"></ul>
                `;
                cardContainer.parentElement.appendChild(paginationControls);
            }

            const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
            const paginationUl = paginationControls.querySelector("ul");
            paginationUl.innerHTML = "";

            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement("li");
                pageButton.className = `page-item ${i === currentPage ? "active" : ""}`;
                pageButton.innerHTML = `<a class="page-link" href="#">${i}</a>`;
                pageButton.addEventListener("click", () => {
                    currentPage = i;
                    renderProducts(filteredProducts, currentPage);
                });
                paginationUl.appendChild(pageButton);
            }
        };

        renderProducts(shuffledProducts, currentPage);

        const brandFilters = document.querySelectorAll(".brandFilter");
        brandFilters.forEach((filter) => {
            filter.addEventListener("change", () => {
                const selectedBrands = Array.from(brandFilters)
                    .filter((checkbox) => checkbox.checked)
                    .map((checkbox) => checkbox.value);

                if (selectedBrands.length === 0) {
                    renderProducts(shuffledProducts, currentPage);
                } else {
                    const filteredProducts = shuffledProducts.filter((product) =>
                        selectedBrands.includes(product.brand)
                    );
                    renderProducts(filteredProducts, currentPage);
                }
            });
        });

        const clearAllButton = document.getElementById("clearAll");
        clearAllButton.addEventListener("click", () => {
            brandFilters.forEach((filter) => {
                filter.checked = false;
            });
            renderProducts(shuffledProducts, currentPage);
        });
    } else {
        console.log("No products available or invalid data.");
    }
}
DisplayAllProducts();



const productCards = document.querySelectorAll(".product-card");
productCards.forEach(card => {
    card.addEventListener("click", function () {
        const productId = card.getAttribute("data-product-id");
        getProductById(productId);
        goToProductDetailsPage(productId);
    })
});