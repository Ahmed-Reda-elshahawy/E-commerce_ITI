async function loadDataFromJson() {
    try {
        const response = await fetch('../../Data/products.json');
        const data = await response.json();
        localStorage.setItem("products", JSON.stringify(data));
        console.log("Data loaded into localStorage:", data);
        // return "Products loaded into localStorage";
    } catch (error) {
        console.error("Error loading data: ", error);
        return null;
    }
}

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
                        <img src="${products.products[0].images[0]}" class="card-img-top mainimg" alt="${products.products[0].title[0]}">
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
                <div class="card w-100 h-100" onclick="getproductbyid(${productd[i].id})">
                    <div class="card-image-container">
                        <img src="${products.products[i].images[0]}" class="card-img-top mainimg" alt="${products.products[i].title}">
                        <div class="add-to-cart-icon">
                            <i class="fas fa-cart-plus"></i>
                        </div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${products.products[i].title}</h5>
                        <p class="itemPrice"><del style="color: rgb(85, 84, 84)">${products.products[i].price}$</del> ${((products.products[i].price) - ((products.products[i].price) * ((products.products[i].discountPercentage) / 100))).toFixed(2)}$</p>
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

function newArrival() {
    window.location.href = "../Home/NewArrival.html"
}

document.getElementById("shopNowButton").addEventListener("click", shopNow);

function shopNow() {
    window.location.href = "../Home/ShopAll.html"
}

// search

function searchProduct(searchQuery) {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    return Array.isArray(products) ? products.filter(product =>
        product.title.toLowerCase().trim().includes(searchQuery.toLowerCase().trim()) || 
        (product.category && product.category.toLowerCase().trim().includes(searchQuery.toLowerCase().trim()))
    ) : [];
}

document.getElementById("searchInput").addEventListener("input", function () {
    const searchQuery = this.value.trim();
    const searchResultsContainer = document.getElementById("searchResults");
    searchResultsContainer.innerHTML = "";

    if (searchQuery === "") {
        searchResultsContainer.style.display = "none";
        return;
    }

    const results = searchProduct(searchQuery);

    if (results.length === 0) {
        const noResultsItem = document.createElement("li");
        noResultsItem.textContent = "No products found.";
        noResultsItem.style.color = "red";
        noResultsItem.style.padding = "5px 10px";
        searchResultsContainer.appendChild(noResultsItem);
        searchResultsContainer.style.display = "block";
        return;
    }

    if(results.length > 0){
        results.forEach(product => {
            const resultItem = document.createElement("li");
            resultItem.textContent = product.title;
            resultItem.style.cursor = "pointer";
            resultItem.style.padding = "5px 10px";
    
            resultItem.addEventListener("click", function () {
                document.getElementById("searchInput").value = product.title;
                searchResultsContainer.innerHTML = "";
                searchResultsContainer.style.display = "none";
            });
    
            searchResultsContainer.appendChild(resultItem);
        });
    
    }
    searchResultsContainer.style.display = "block";
});


// category

const brandLinks = document.querySelectorAll(".dropdown-item");

brandLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const brandName = link.getAttribute("data-brand");

        const allProducts = JSON.parse(localStorage.getItem("products")) || [];

        const filteredProducts = allProducts.filter(product => product.brand === brandName);

        localStorage.setItem("filteredProducts", JSON.stringify(filteredProducts));

        window.location.href = link.getAttribute("href");
    });
});