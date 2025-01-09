//Add Data To LocalStorage
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

//Search
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

function allProducts() {
    let data = JSON.parse(localStorage.getItem("products"));
    return data;
}

searchInput.addEventListener('input', filterResults);

function displayDropdown(products) {
    searchResults.innerHTML = '';
    products.forEach(product => {
        let li = document.createElement('li');
        li.textContent = product.title;
        li.addEventListener('click', function () {
            localStorage.setItem('selectedTitle', product.title);
            window.location.href = '../../Html/Home/ProductSelectedFromSearch.html';
        });
        searchResults.appendChild(li);
    });
    searchResults.style.display = 'block';
}

function filterResults() {
    let searchText = searchInput.value.toLowerCase();
    let products = allProducts();
    let filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchText)
    );
    displayDropdown(filteredProducts);
}

document.addEventListener('click', function (event) {
    if (!searchInput.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});


