function myFunction() {
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

var btn = document.querySelector(".button__close");
btn.addEventListener("click", function() {
    let popup = document.getElementById("myPopup");
    popup.classList.remove("show");
});

export default myFunction