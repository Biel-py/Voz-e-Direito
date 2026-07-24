const backToTopButton = document.querySelector(".botao_home");

window.addEventListener("scroll", () => {

    if (window.scrollY > 250) {

        backToTopButton.classList.add("mostrar");

    } else {

        backToTopButton.classList.remove("mostrar");
    }
});


backToTopButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
