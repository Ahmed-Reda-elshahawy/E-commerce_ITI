const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-btn');
const controlList = document.querySelectorAll(".control-list li");
const usersTableContainer = document.querySelector(".table-container:nth-child(1)");
const productsTableContainer = document.querySelector(".table-container:nth-child(2)");


console.log(controlList);
function AddActiveClass() {
    for (let i = 0; i < controlList.length; i++) {
        controlList[i].addEventListener("click", function (e) {
            for (let j = 0; j < controlList.length; j++) {
                controlList[j].classList.remove("active-section");
            }
            this.classList.add("active-section");
            console.log(e.target);
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