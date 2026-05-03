document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    const btnCursos = document.getElementById("btn-cursos");
    const menuCursos = document.getElementById("menu-cursos");

    toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        nav.classList.toggle("active");
    });

    btnCursos.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        menuCursos.classList.toggle("active");
    });

    const linksNavegacao = document.querySelectorAll('.menu a:not(#btn-cursos)');

    linksNavegacao.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove("active");
            menuCursos.classList.remove("active");
        });
    });

    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove("active");
            menuCursos.classList.remove("active");
        }
    });
});
