document.querySelectorAll(".btn").forEach(function (btn) {
    btn.parentNode.addEventListener("click", function () {
        btn.classList.toggle("rotated");
    });
});

// const usericon = document.getElementById("userIcon")
// const userdropdown = document.getElementById("userDropdown");
// usericon.addEventListener("click", function(event){
//     event.stopPropagation();
//     if(userdropdown.style.display === "none" || userdropdown.style.display === ""){
//         userdropdown.style.display = "block";
//     }
//     else{
//         userdropdown.style.display = "none";
//     }
// });

// document.addEventListener("click" , function(event){
//     const isclick = usericon.contains(event.target) || userdropdown.contains(event.target);
//     if(!isclick){
//         userdropdown.style.display = "none";
//     }
// });

let scrollAmount = 0;
    const cardWidth = 160; 
    const totalCards = 10; 
    const maxScroll = (totalCards - 5) * cardWidth; 

    function moveLeft() {
        const row = document.querySelector('.rowSale');
        if (scrollAmount > 0) {
            scrollAmount -= cardWidth;
            row.style.transform = `translateX(${Math.max(scrollAmount, 0)}px)`;
        }
    }

    function moveRight() {
        const row = document.querySelector('.rowSale');
        if (scrollAmount < maxScroll) {
            scrollAmount += cardWidth;
            row.style.transform = `translateX(${Math.min(scrollAmount, maxScroll)}px)`;
        }
    }