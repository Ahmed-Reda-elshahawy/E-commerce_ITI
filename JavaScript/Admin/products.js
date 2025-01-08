const productsTableBody = document.querySelector('.products-table tbody');
const paginationElement = document.getElementById('pagination');
const rowsPerPage = 5;

// 1- get and set data to localStorage
function getStoredData() {
    return JSON.parse(localStorage.getItem('products')) || [];
}
function setStoredData(products) {
    localStorage.setItem('products', JSON.stringify(products));
}
console .log (products)

// 2- initial data from json file
(async function loadDataFromJson() {
    try {
        const response = await fetch('../../Data/products.json');
        const data = await response.json();

        if (getStoredData().length === 0 || null)
            setStoredData(data);
        console.log("Data loaded into localStorage:", data["products"]);
    } catch (error) {
        console.error("Error loading data: ", error);
        return null;
    }
})();


// 3- Display customers data
function DisplayData(data) {
    productsTableBody.innerHTML = '';
    data["products"].forEach(product => {
        productsTableBody.innerHTML += `
            <tr class="table-active">
                <td>${product.id}</td>
                <td>${product.category}</td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn" id="edit-btn" data-bs-target="#updateModalForProduct"
                        data-bs-toggle="modal">
                        <i class="fa-regular fa-pen-to-square text-primary"></i>
                    </button>
                    <button class="btn" id="delete-btn" data-bs-target="#deleteModalForProduct"
                        data-bs-toggle="modal">
                        <i class="fa-solid fa-trash-can text-danger"></i>
                    </button>
                </td>
            </tr>
        `
    });
}
DisplayData(getStoredData());


// // 4- pagination
// let products = getStoredData();
// const pagination = new Paginate({
//     items: products["products"],
//     itemsPerPage: rowsPerPage,
//     onPageChange: (items) => {
//         DisplayData(items);
//     }
// });
// pagination.render(paginationElement);
