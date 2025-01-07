const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-btn');
const controlList = document.querySelectorAll(".control-list li");
const usersTableContainer = document.querySelector(".table-container:nth-child(1)");
const productsTableContainer = document.querySelector(".table-container:nth-child(2)");
const customersTableBody = document.querySelector(".customers-table tbody");
const updateModalBody = document.querySelector("#updateModal .modal-body");
// inputs of updateModal
const customerName = document.querySelector(".customer-name");
const customerEmail = document.querySelector(".customer-email");
const EditCustomerBtn = document.getElementById("edit-customer");
const DeleteCustomerBtn = document.getElementById("delete-customer");



// add active class to Tap Buttons
function AddActiveClass() {
    for (let i = 0; i < controlList.length; i++) {
        controlList[i].addEventListener("click", function (e) {
            for (let j = 0; j < controlList.length; j++) {
                controlList[j].classList.remove("active-section");
            }
            this.classList.add("active-section");
        });
    }
}
AddActiveClass();

controlList[0].addEventListener("click", function (e) {
    usersTableContainer.classList.remove("d-none");
    productsTableContainer.classList.add("d-none");
});

controlList[1].addEventListener("click", function (e) {
    productsTableContainer.classList.remove("d-none");
    usersTableContainer.classList.add("d-none");
});


// ============== CRUD ============= //
// ==== initial data from json file ==== //
async function fetchAndStoreUsers() {
    try {
        const response = await fetch('../../Data/users.json');
        const users = await response.json();
        // set data to localStorage
        if (getStoredCustomers().length === 0)
            setStoredCustomers(users);
    }
    catch (error) {
        console.error('Error fetching user data: ', error);
        return [];
    }
};
fetchAndStoreUsers();



// ==== get and set stored customers ==== //
function getStoredCustomers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}
function setStoredCustomers(customers) {
    localStorage.setItem('users', JSON.stringify(customers));
}



// ==== Display customers data ==== //
function DisplayCustomers(storedUsers) {
    console.log(storedUsers);
    customersTableBody.innerHTML = '';
    for (let i = 0; i < storedUsers.length; i++) {
        customersTableBody.innerHTML += `
            <tr class="table-active">
                <td>${storedUsers[i].id}</td>
                <td>${storedUsers[i].username}</td>
                <td>${storedUsers[i].email}</td>
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
        `
    }
}
DisplayCustomers(getStoredCustomers());



// ==== edit customer data  ==== //
// fill inputs with current customer data
let CurrentCustomerId = 0;
function updateCustomer(storedUsersId) {
    const storedUsers = getStoredCustomers();
    const customer = storedUsers.find(customer => customer.id === storedUsersId);
    if (customer) {
        customerName.value = customer.username;
        customerEmail.value = customer.email;
        CurrentCustomerId = storedUsersId;
    }
}

EditCustomerBtn.addEventListener('click', function () {
    const storedUsers = getStoredCustomers();
    const customer = storedUsers.find(customer => customer.id === CurrentCustomerId);
    if (customer) {
        // update customer data
        customer.username = customerName.value;
        customer.email = customerEmail.value;
        // store update
        setStoredCustomers(storedUsers);
        // display after update
        DisplayCustomers(storedUsers);
        // Close the modal 
        const updateModal = document.querySelector('#updateModalForCustomer');
        const modal = bootstrap.Modal.getInstance(updateModal);
        modal.hide();
    }
});



// ==== delete customer ==== //
let CurrentCustomerIdToDelete = 0;
function deleteCustomer(customerId) {
    CurrentCustomerIdToDelete = customerId;
}
DeleteCustomerBtn.addEventListener('click', function () {
    // delete customer
    const storedCutomers = getStoredCustomers();
    const newCustomers = storedCutomers.filter(customer => customer.id != CurrentCustomerIdToDelete);
    // store data after delete
    setStoredCustomers(newCustomers);
    // display after delete
    DisplayCustomers(newCustomers);
    // close the modal
    const updateModal = document.querySelector('#deleteModalForCustomer');
    const modal = bootstrap.Modal.getInstance(updateModal);
    modal.hide();
});
