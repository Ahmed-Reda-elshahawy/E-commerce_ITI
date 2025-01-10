const controlList = document.querySelectorAll(".control-list li");
const productsTableContainer = document.querySelector(".table-container:nth-child(1)");
const ordersTableContainer = document.querySelector(".table-container:nth-child(2)");
const chartsTableContainer = document.querySelector(".table-container:nth-child(3)"); // Add charts container

// Handle active section
export function handleActiveSectionSaller() {
    controlList.forEach(section => {
        section.addEventListener("click", function () {
            // Remove active class from all sections
            controlList.forEach(sec => {
                sec.classList.remove("active-section");
            });

            // Add active class to the clicked section
            this.classList.add("active-section");

            // Handle visibility of containers
            if (this.getAttribute("data-section") === "products") {
                productsTableContainer.classList.remove("d-none");
                ordersTableContainer.classList.add("d-none");
                chartsTableContainer.classList.add("d-none"); // Hide charts
            } else if (this.getAttribute("data-section") === "orders") {
                ordersTableContainer.classList.remove("d-none");
                productsTableContainer.classList.add("d-none");
                chartsTableContainer.classList.add("d-none"); // Hide charts
            } else if (this.getAttribute("data-section") === "charts") {
                chartsTableContainer.classList.remove("d-none"); // Show charts
                productsTableContainer.classList.add("d-none");
                ordersTableContainer.classList.add("d-none");
            }
        });
    });
}

// Initialize the function
handleActiveSectionSaller();
