document.querySelectorAll(".btn").forEach(function (btn) {
    btn.parentNode.addEventListener("click", function () {
        btn.classList.toggle("rotated");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let products = JSON.parse(localStorage.getItem("products"));

    if (products && products.products) {
        const cardContainer = document.getElementById("cardContainerAll");

        let shuffledProducts = JSON.parse(localStorage.getItem("shuffledProducts"));

        if (!shuffledProducts) {
            shuffledProducts = products.products.sort(() => Math.random() - 0.5);

            localStorage.setItem("shuffledProducts", JSON.stringify(shuffledProducts));
        }

        console.log("Stored products:", shuffledProducts);

        for (let i = 0; i < Math.min(12, shuffledProducts.length); i++) {
            const product = shuffledProducts[i];
            const cardCol = document.createElement("div");
            cardCol.className = "col-6 col-md-4 col-lg-2";
            cardCol.innerHTML = `
                <div class="card w-100 h-100">
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
        }
    } else {
        console.log("No products available or invalid data.");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const storedProducts = localStorage.getItem("products");
    const products = JSON.parse(storedProducts);

    if (products) {
        const cardContainerSale = document.getElementById("cardContainerAllSale");

        for (let i = 30; i < 36; i++) {
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
                        <p class="itemPrice"><del style="color: rgb(85, 84, 84)">${products.products[i].price}$</del> ${((products.products[i].price)-((products.products[i].price)*((products.products[i].discountPercentage)/100))).toFixed(2)}$</p>
                    </div>
                </div>
            `;

            cardContainerSale.appendChild(cardCol);
        }
    } else {
        console.log("No Data");
    }
});

document.getElementById("NewArrivalButton").addEventListener("click", newArrival);

function newArrival(){
    window.location.href = "../Home/NewArrival.html"
}

document.getElementById("shopNowButton").addEventListener("click", shopNow);

function shopNow(){
    window.location.href = "../Home/ShopAll.html"
}
