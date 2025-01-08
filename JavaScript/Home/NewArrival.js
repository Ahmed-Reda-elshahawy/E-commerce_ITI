document.addEventListener("DOMContentLoaded", () => {
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
                <div class="card w-100 h-100">
                    <div class="card-image-container">
                        <img src="${products[i].images[0]}" class="card-img-top mainimg" alt="${products[i].title}">
                        <div class="add-to-cart-icon">
                            <i class="fas fa-cart-plus"></i>
                        </div>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title"><b>${products.title}</b></h6>
                        <p class="itemPrice">${products.price}$</p>
                    </div>
                </div>
            `;
            cardContainer.appendChild(cardCol);
        }
    } else {
        console.log("No products available or invalid data.");
    }
});
