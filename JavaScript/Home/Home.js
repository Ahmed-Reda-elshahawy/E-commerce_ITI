document.querySelectorAll(".btn").forEach(function (btn) {
    btn.parentNode.addEventListener("click", function () {
        btn.classList.toggle("rotated");
    });
});