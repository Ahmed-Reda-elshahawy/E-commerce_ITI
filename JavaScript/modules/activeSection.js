const controlList = document.querySelectorAll(".control-list li");
const usersTableContainer = document.querySelector(".table-container:nth-child(1)");
const productsTableContainer = document.querySelector(".table-container:nth-child(2)");



// handle active section
export function handleActiveSection() {
    controlList.forEach(section => {
        section.addEventListener("click", function (e) {
            controlList.forEach(sec => {
                sec.classList.remove("active-section");
            });
            this.classList.add("active-section");
            if (this.getAttribute("data-section") == "products") {
                productsTableContainer.classList.remove("d-none");
                usersTableContainer.classList.add("d-none");
            }
            else if (this.getAttribute("data-section") == "customers") {
                usersTableContainer.classList.remove("d-none");
                productsTableContainer.classList.add("d-none");
            }
            else if (this.getAttribute("data-section") == "orders") {
                usersTableContainer.classList.add("d-none");
                productsTableContainer.classList.add("d-none");
            }
        });
    });
};