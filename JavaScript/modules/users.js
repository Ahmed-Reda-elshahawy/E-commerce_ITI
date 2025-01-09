// const editBtn = document.getElementById('edit-btn');
// const deleteBtn = document.getElementById('delete-btn');
// const controlList = document.querySelectorAll(".control-list li");
// const usersTableContainer = document.querySelector(".table-container:nth-child(1)");
// const productsTableContainer = document.querySelector(".table-container:nth-child(2)");
// const updateModalBody = document.querySelector("#updateModal .modal-body");


// // inputs of updateModal
const customersTableBody = document.querySelector(".customers-table tbody");
const customerName = document.querySelector(".customer-name");
const customerEmail = document.querySelector(".customer-email");



// ==== Get and set stored customers ==== //
export function getStoredCustomers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}
export function setStoredCustomers(customers) {
    localStorage.setItem('users', JSON.stringify(customers));
}



// ==== Display customers data ==== //
export function displayCustomers(storedUsers) {
    console.log(storedUsers);
    customersTableBody.innerHTML = '';
    for (let i = 0; i < storedUsers.length; i++) {
        customersTableBody.innerHTML += `
            <tr class="table-active">
                <td>${storedUsers[i].id}</td>
                <td>${storedUsers[i].username}</td>
                <td>${storedUsers[i].email}</td>
                <td>${storedUsers[i].role}</td>
                <td>
                    <button class="btn" id="edit-btn" data-bs-target="#updateModalForCustomer"
                        data-bs-toggle="modal" onclick="updateCustomer(${storedUsers[i].id})">
                        <i class="fa-regular fa-pen-to-square text-primary"></i>
                    </button>
                    <button class="btn" id="delete-btn" data-bs-target="#deleteModalForCustomer"
                        data-bs-toggle="modal" onclick="deleteCustomer(${storedUsers[i].id})">
                        <i class="fa-solid fa-trash-can text-danger"></i>
                    </button>
                </td>
            </tr>
        `;
    }
}



// ==== Update customer ==== //
let currentCustomerId = 0;
export function updateCustomer(storedUsersId) {
    const storedUsers = getStoredCustomers();
    const customer = storedUsers.find(customer => customer.id === storedUsersId);
    if (customer) {
        customerName.value = customer.username;
        customerEmail.value = customer.email;
        currentCustomerId = storedUsersId;
    }
}

export function editCustomer() {
    const storedUsers = getStoredCustomers();
    const customer = storedUsers.find(customer => customer.id === currentCustomerId);
    if (customer) {
        customer.username = customerName.value;
        customer.email = customerEmail.value;
        setStoredCustomers(storedUsers);
        displayCustomers(storedUsers);
        const updateModal = document.querySelector('#updateModalForCustomer');
        const modal = bootstrap.Modal.getInstance(updateModal);
        modal.hide();
    }
}



// ==== Delete customer ==== //
let currentCustomerIdToDelete = 0;
export function deleteCustomer(customerId) {
    currentCustomerIdToDelete = customerId;
}

export function confirmDeleteCustomer() {
    const storedCustomers = getStoredCustomers();
    const newCustomers = storedCustomers.filter(customer => customer.id != currentCustomerIdToDelete);
    setStoredCustomers(newCustomers);
    displayCustomers(newCustomers);
    const deleteModal = document.querySelector('#deleteModalForCustomer');
    const modal = bootstrap.Modal.getInstance(deleteModal);
    modal.hide();
}



// ==== Search for a customer ==== //
const searchInput = document.getElementById('usersSearch');
function searchFilter(searchName) {
    const users = getStoredCustomers();
    return users.filter(user => user.username.toLowerCase().includes(searchName.toLowerCase()));
}
searchInput.addEventListener("input", function () {
    let searchName = searchInput.value;
    const users = searchFilter(searchName);
    displayCustomers(users);
});