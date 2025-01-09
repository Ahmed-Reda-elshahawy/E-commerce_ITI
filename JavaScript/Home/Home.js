import { getProductById, goToProductDetailsPage } from "../modules/products.js";



function DisplayHomePageProducts() {
    const storedProducts = localStorage.getItem("products");
    const products = JSON.parse(storedProducts);

    if (products) {
        // Shuffling products for the first section
        const cardContainer = document.getElementById("cardContainerAll");
        let shuffledProducts = JSON.parse(localStorage.getItem("shuffledProducts"));

        if (!shuffledProducts) {
            shuffledProducts = products.sort(() => Math.random() - 0.5);
            localStorage.setItem("shuffledProducts", JSON.stringify(shuffledProducts));
        }

        for (let i = 0; i < Math.min(12, shuffledProducts.length); i++) {
            const product = shuffledProducts[i];
            const cardCol = document.createElement("div");
            cardCol.className = "col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3";
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

        // Displaying specific products for the sale section

        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            autoplay: {
                delay: 1000,
                disableOnInteraction: false 
            },
            breakpoints: {
                430: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1200:{
                    slidesPerView: 4,
                    spaceBetween: 20
                }
            }
        });

        const cardContainerSale = document.getElementById("cardContainerAllSale");

        for (let i = 22; i < 35; i++) {
            const product = products[i];
                
            const cardCol = document.createElement("div");
            cardCol.className = "swiper-slide col-6 col-md-4 col-lg-2";
            cardCol.innerHTML = `
        <div class="card product-card h-100" data-product-id="${product.id}">
            <div class="card-image-container">
                <img src="${product.images[0]}" class="card-img-top mainimg" alt="${product.title}">
            </div>
            <div class="card-body">
                <h5 class="card-title" style="font-width: 16px">${product.title}</h5>
                <p class="itemPrice">
                    <del style="color: rgb(85, 84, 84)">${product.price}$</del>
                    ${((product.price) - ((product.price) * ((product.discountPercentage) / 100))).toFixed(2)}$
                </p>
            </div>
        </div>
    `;
            cardContainerSale.appendChild(cardCol);
        }

        swiper.update();

    } else {
        console.log("No products available or invalid data.");
    }

    // Add event listeners for buttons
    document.getElementById("NewArrivalButton").addEventListener("click", newArrival);
    document.getElementById("shopNowButton").addEventListener("click", shopNow);
}

DisplayHomePageProducts();

function newArrival() {
    window.location.href = "../Home/NewArrival.html";
}

function shopNow() {
    window.location.href = "../Home/ShopAll.html";
}


const productCards = document.querySelectorAll(".product-card");
productCards.forEach(card => {
    card.addEventListener("click", function () {
        const productId = card.getAttribute("data-product-id");
        getProductById(productId);
        goToProductDetailsPage(productId);
    })
});
