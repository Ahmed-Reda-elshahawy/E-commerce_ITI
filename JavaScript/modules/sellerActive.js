
const controlList = document.querySelectorAll(".control-list li");
const productsTableContainer = document.querySelector(".table-container:nth-child(1)");
const ordersTableContainer = document.querySelector(".table-container:nth-child(2)");



// handle active section
export function handleActiveSectionSaller() {
    controlList.forEach(section => {
        section.addEventListener("click", function (e) {
            controlList.forEach(sec => {
                sec.classList.remove("active-section");
            });
            this.classList.add("active-section");
            if (this.getAttribute("data-section") == "products") {
                productsTableContainer.classList.remove("d-none");
                ordersTableContainer.classList.add("d-none");
            }
            else if (this.getAttribute("data-section") == "orders") {
                ordersTableContainer.classList.remove("d-none");                    //remove 
                productsTableContainer.classList.add("d-none");
            }
        });
    });
};
handleActiveSectionSaller();