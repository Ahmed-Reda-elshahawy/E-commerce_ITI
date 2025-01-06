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



document.addEventListener("DOMContentLoaded", () => {
    const storedProducts = localStorage.getItem("filteredProducts");
    const products = JSON.parse(storedProducts);

    if (products && products.length > 0) {
        const cardContainerSale = document.getElementById("cardContainerAll");

        products.forEach(product => {
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
                        <h5 class="card-title">${product.title}</h5>
                        <p class="itemPrice">${product.price}$</p>
                    </div>
                </div>
            `;

            cardContainerSale.appendChild(cardCol);
        });
    } else {
        const cardContainerSale = document.getElementById("cardContainerAll");
        cardContainerSale.innerHTML = "<p>No products available for this brand.</p>";
    }
});