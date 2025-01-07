import { loadDataFromJson } from "../../JavaScript/modules/products.js";


loadDataFromJson();
document.querySelectorAll(".btn").forEach(function (btn) {
    btn.parentNode.addEventListener("click", function () {
        btn.classList.toggle("rotated");
    });
});


// document.addEventListener("DOMContentLoaded", () => {
//     const storedProducts = localStorage.getItem("products");
//     const products = JSON.parse(storedProducts);

//     if (products) {
//         const cardContainer = document.getElementById("cardContainerAll");

//         products.forEach(product => {
//             const cardCol = document.createElement("div");
//             cardCol.className = "col-6 col-md-4 col-lg-2";
//             cardCol.innerHTML = `
//                 <div class="card">
//                     <div class="card-image-container">
//                         <img src="${product.images[0]}" class="card-img-top mainimg" alt="${product.title}">
//                         <div class="add-to-cart-icon">
//                             <i class="fas fa-cart-plus"></i>
//                         </div>
//                     </div>
//                     <div class="card-body">
//                         <h5 class="card-title">${product.title}</h5>
//                         <p class="card-text">${product.tittle2}</p>
//                     </div>
//                 </div>
//             `;

//             cardContainer.appendChild(cardCol);
//         });
//     } else {
//         console.log("No Data");
//     }
// });


// async function loadDataFromJson() {
//     try {
//         const response = await fetch('../../Data/products.json');
//         const data = await response.json();
//         localStorage.setItem("products", JSON.stringify(data));
//         console.log("Data loaded into localStorage:", data);
//         // return "Products loaded into localStorage";
//     } catch (error) {
//         console.error("Error loading data: ", error);
//         return null;
//     }
// }

document.addEventListener("DOMContentLoaded", () => {
    const storedProducts = localStorage.getItem("products");
    const products = JSON.parse(storedProducts);

    if (products) {
        const cardContainer = document.getElementById("cardContainerAll");

        for (let i = 0; i < 8; i++) {
            var product = products[i];
            const cardCol = document.createElement("div");
            cardCol.className = "col-6 col-md-4 col-lg-2";
            cardCol.innerHTML += `
                <div class="card">
                    <div class="card-image-container">
                        <img src="${products.products[0].images[0]}" class="card-img-top mainimg" alt="${products.products[0].title[0]}">
                        <div class="add-to-cart-icon">
                            <i class="fas fa-cart-plus"></i>
                        </div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${products.products[0].title[0]}</h5>
                        <p class="card-text">${products.products[0].title[0]}</p>
                    </div>
                </div>
            `;

            cardContainer.appendChild(cardCol);
        }
    } else {
        console.log("No Data");
    }
});
