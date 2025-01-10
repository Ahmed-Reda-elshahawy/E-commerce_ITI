import {
    getStoredCustomers,
    displayCustomers,
    editCustomer,
    confirmDeleteCustomer,
    updateCustomerById,
    deleteCustomerById
} from '../../JavaScript/modules/users.js';
import { handleActiveSection } from '../modules/activeSection.js';
import { confirmDeleteOrder, deleteOrderById, displayOrders, editOrder, getStoredOrders, updateOrderById } from '../modules/orders.js';
import { confirmDeleteProduct, deleteProduct, DisplayProducts, editProduct, getStoredProducts, previewImage, updateProduct } from '../modules/products.js';



const adminImgs = document.querySelectorAll('.adminImg');
const adminNames = document.querySelectorAll('.adminName');
const adminRole = document.querySelector('.adminRole');

const admins = JSON.parse(localStorage.getItem("admins"));
if (admins && admins.length > 0) {
    adminImgs.forEach(adminImg => adminImg.src = admins[0].Img);
    adminNames.forEach(adminName => adminName.innerText = admins[0].Name);
    adminRole.innerText = admins[0].Role;
} else {
    console.error('No admins found in localStorage or the data is malformed');
}



handleActiveSection();
// =====================( users )===================== //
displayCustomers(getStoredCustomers());

document.getElementById("edit-customer").addEventListener('click', editCustomer);
document.getElementById("delete-customer").addEventListener('click', confirmDeleteCustomer);
window.updateCustomerById = updateCustomerById;
window.deleteCustomerById = deleteCustomerById;



// =====================( products )===================== //
DisplayProducts(getStoredProducts());

document.getElementById("edit-product").addEventListener('click', editProduct);
document.getElementById("delete-product").addEventListener('click', confirmDeleteProduct);
window.updateProduct = updateProduct;
window.deleteProduct = deleteProduct;
window.previewImage = previewImage;



// =====================( orders )===================== //
displayOrders(getStoredOrders());

document.getElementById("edit-order").addEventListener('click', editOrder);
document.getElementById("delete-order").addEventListener('click', confirmDeleteOrder);
window.deleteOrderById = deleteOrderById;
window.updateOrderById = updateOrderById;