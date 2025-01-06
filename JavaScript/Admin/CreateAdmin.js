const addCustomerInput = document.getElementById("add-customer");
const addAdminForm = document.getElementById("add-admin-form");

const adminNameInput = document.querySelector(".admin-name");
const adminEmailInput = document.querySelector(".admin-email");
const adminPasswordInput = document.querySelector(".admin-password");


async function FetchAndStoreAdmins() {
    try {
        const response = await fetch('../../Data/admin.json');
        const admins = await response.json();
        // set data to localStorage
        if (!localStorage.getItem('admins'))
            localStorage.setItem('admins', JSON.stringify(admins));
    }
    catch (error) {
        console.error('Error fetching user data: ', error);
        return [];
    }
}
FetchAndStoreAdmins();

function GetAdmins() {
    return JSON.parse(localStorage.getItem("admins")) || [];
}
function SetAdmins(admins) {
    localStorage.setItem("admins", JSON.stringify(admins));
}

function createAdmin(newAdminData) {
    const admins = GetAdmins();
    admins.push(newAdminData);
    SetAdmins(admins);
}

addCustomerInput.addEventListener("click", function () {
    const admins = GetAdmins();

    const AdminID = admins.lenght ? admins[admins.length - 1].AdminID + 1 : 1;
    const AdminName = adminNameInput.value;
    const Email = adminEmailInput.value;
    const Password = adminPasswordInput.value;
    const Role = "admin";
    const ContactInfo = "01009797821";
    const DateCreated = new Date().toISOString();

    const newAdminData = {
        AdminID,
        AdminName,
        Email,
        Password,
        Role,
        ContactInfo,
        DateCreated,
    }

    createAdmin(newAdminData);
    addAdminForm.reset();
});