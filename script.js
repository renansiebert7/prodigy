document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");

    const btnCursos = document.getElementById("btn-cursos");
    const menuCursos = document.getElementById("menu-cursos");
    const seta = document.querySelector(".seta");

    toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        nav.classList.toggle("active");
    });

    btnCursos.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        menuCursos.classList.toggle("active");
        seta.classList.toggle("ativa");
    });

    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove("active");
            menuCursos.classList.remove("active");
            seta.classList.remove("ativa");
        }
    });
});

const depoimentos = document.querySelectorAll(".carousel .item");
let depoimentoIndex = 0;

setInterval(() => {
    depoimentos[depoimentoIndex].classList.remove("active");

    depoimentoIndex =
        (depoimentoIndex + 1) % depoimentos.length;

    depoimentos[depoimentoIndex].classList.add("active");
}, 6000);

document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});



const form = document.getElementById('formContato');
const URL_PLANILHA = 'https://script.google.com/macros/s/AKfycbxKERebJEW8EXucy5ULalyhPE1uKv5O_X4Ml9hU5ZbqF4xGazK9zD5rgD_zEUODet4KOA/exec';

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button');
    submitBtn.innerText = "Enviando...";
    submitBtn.disabled = true;

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const idioma = document.getElementById('idioma').value;
    const mensagem = document.getElementById('mensagem').value;

    const formData = new FormData(form);

    fetch(URL_PLANILHA, {
        method: 'POST',
        body: formData
    })
        .then(() => {
            const textoWhats = `Olá! Meu nome é ${nome}. Tenho interesse no curso de ${idioma}. ${mensagem}`;
            const linkWhats = `https://wa.me/555197692906?text=${encodeURIComponent(textoWhats)}`;

            window.location.href = linkWhats;
        })
        .catch(error => {
            alert("Erro ao salvar dados. Tente novamente.");
            console.error(error);
            submitBtn.disabled = false;
            submitBtn.innerText = "Enviar Pelo Whatsapp";
        });
});



const linksMenu = document.querySelectorAll('.menu a[href^="#"]');

linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById("nav");
        nav.classList.remove("active");
    });
});


const slides = document.querySelectorAll(".slide");
let slideIndex = 0;

function changeSlide() {
    slides[slideIndex].classList.remove("active");

    slideIndex = (slideIndex + 1) % slides.length;

    slides[slideIndex].classList.add("active");
}

setInterval(changeSlide, 4000);

window.addEventListener("scroll", () => {
    document.querySelector(".header")
        .classList.toggle("scrolled", window.scrollY > 50);
});




document.addEventListener("DOMContentLoaded", () => {

    const imagens = document.querySelectorAll(".masonry img");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const fechar = document.querySelector(".close");

    imagens.forEach((img, i) => {

        img.addEventListener("click", () => {
            lightbox.classList.add("active");
            lightboxImg.src = img.src;
        });

    });

    fechar.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            lightbox.classList.remove("active");
        }
    });

});