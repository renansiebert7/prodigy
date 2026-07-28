/* =========================================================
   MENU / NAVEGAÇÃO
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    const btnCursos = document.getElementById("btn-cursos");
    const menuCursos = document.getElementById("menu-cursos");
    const seta = document.querySelector(".seta");

    if (toggle && nav) {
        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            nav.classList.toggle("active");
        });
    }

    if (btnCursos && menuCursos) {
        btnCursos.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            menuCursos.classList.toggle("active");
            seta?.classList.toggle("ativa");
        });
    }

    document.addEventListener("click", (e) => {
        if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove("active");
            menuCursos?.classList.remove("active");
            seta?.classList.remove("ativa");
        }
    });

    document.querySelectorAll('.menu a[href^="#"]').forEach(link => {
        link.addEventListener("click", () => nav?.classList.remove("active"));
    });
});

/* =========================================================
   HEADER COM SOMBRA AO ROLAR
   ========================================================= */
window.addEventListener("scroll", () => {
    document.querySelector(".header")?.classList.toggle("scrolled", window.scrollY > 40);
});

/* =========================================================
   HERO — palavra alternante ("Fale inglês / espanhol")
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const el = document.querySelector(".hero-word");
    if (!el) return;

    let palavras;
    try {
        palavras = JSON.parse(el.dataset.words);
    } catch {
        return;
    }
    if (!palavras || palavras.length < 2) return;

    const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzMovimento) return;

    let i = 0;
    setInterval(() => {
        el.classList.add("swap");
        setTimeout(() => {
            i = (i + 1) % palavras.length;
            el.textContent = palavras[i];
            el.classList.remove("swap");
        }, 250);
    }, 2600);
});

/* =========================================================
   HERO — cartão de conversa (EN / ES) + reinício da animação
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll(".lang-toggle button");
    const bubbleWrap = document.getElementById("chatBubbles");
    if (!botoes.length || !bubbleWrap) return;

    const conversas = {
        en: [
            { autor: "them", texto: "How was your week?" },
            { autor: "you", texto: "It was great! I finally watched a movie without subtitles 🎬" },
            { autor: "them", texto: "That's huge. Tell me about it — in English." }
        ],
        es: [
            { autor: "them", texto: "¿Cómo estuvo tu semana?" },
            { autor: "you", texto: "¡Genial! Por fin vi una película sin subtítulos 🎬" },
            { autor: "them", texto: "Eso es enorme. Cuéntame, en español." }
        ]
    };

    function renderizarConversa(idioma) {
        bubbleWrap.innerHTML = "";
        conversas[idioma].forEach(msg => {
            const bolha = document.createElement("div");
            bolha.className = `bubble ${msg.autor}`;
            bolha.textContent = msg.texto;
            bubbleWrap.appendChild(bolha);
        });
    }

    botoes.forEach(btn => {
        btn.addEventListener("click", () => {
            botoes.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderizarConversa(btn.dataset.lang);
        });
    });

    renderizarConversa("en");
});

/* =========================================================
   DEPOIMENTOS (carrossel automático)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const depoimentos = document.querySelectorAll(".carousel .item");
    if (!depoimentos.length) return;

    let index = 0;
    setInterval(() => {
        depoimentos[index].classList.remove("active");
        index = (index + 1) % depoimentos.length;
        depoimentos[index].classList.add("active");
    }, 6000);
});

/* =========================================================
   FAQ (acordeão)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".faq-item").forEach(item => {
        item.addEventListener("click", () => item.classList.toggle("active"));
    });
});

/* =========================================================
   GALERIA / LIGHTBOX
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const imagens = document.querySelectorAll(".masonry img");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const fechar = document.querySelector(".close");
    if (!lightbox || !lightboxImg) return;

    imagens.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.classList.add("active");
            lightboxImg.src = img.src;
        });
    });

    fechar?.addEventListener("click", () => lightbox.classList.remove("active"));

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.remove("active");
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") lightbox.classList.remove("active");
    });
});

/* =========================================================
   SCROLL REVEAL (elementos com a classe .reveal)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const alvos = document.querySelectorAll(".reveal");
    if (!alvos.length) return;

    const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzMovimento) {
        alvos.forEach(el => el.classList.add("in-view"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    alvos.forEach(el => observer.observe(el));
});

/* =========================================================
   FORMULÁRIO DE CONTATO -> planilha + WhatsApp
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContato");
    if (!form) return;

    const URL_PLANILHA = "https://script.google.com/macros/s/AKfycbxKERebJEW8EXucy5ULalyhPE1uKv5O_X4Ml9hU5ZbqF4xGazK9zD5rgD_zEUODet4KOA/exec";

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector("button");
        const textoOriginal = submitBtn.innerText;
        submitBtn.innerText = "Enviando...";
        submitBtn.disabled = true;

        const nome = document.getElementById("nome").value;
        const idioma = document.getElementById("idioma").value;
        const mensagem = document.getElementById("mensagem").value;

        const formData = new FormData(form);

        fetch(URL_PLANILHA, { method: "POST", body: formData })
            .then(() => {
                const textoWhats = `Olá! Meu nome é ${nome}. Tenho interesse no curso de ${idioma}. ${mensagem}`;
                const linkWhats = `https://wa.me/555197692906?text=${encodeURIComponent(textoWhats)}`;
                window.location.href = linkWhats;
            })
            .catch(error => {
                alert("Erro ao salvar dados. Tente novamente.");
                console.error(error);
                submitBtn.disabled = false;
                submitBtn.innerText = textoOriginal;
            });
    });
});

/* =========================================================
   CURSOS — switcher Inglês / Espanhol
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const tablist = document.querySelector(".cursos-tablist");
    const indicador = document.querySelector(".tab-indicator");
    const abas = document.querySelectorAll(".curso-tab");
    const paineis = document.querySelectorAll(".curso-panel");
    if (!tablist || !indicador || !abas.length) return;
 
    function moverIndicador(aba) {
        indicador.style.width = `${aba.offsetWidth}px`;
        indicador.style.transform = `translateX(${aba.offsetLeft - 6}px)`;
    }
 
    function ativarAba(aba, { foco = false } = {}) {
        abas.forEach(a => {
            const ativa = a === aba;
            a.classList.toggle("active", ativa);
            a.setAttribute("aria-selected", ativa ? "true" : "false");
            a.tabIndex = ativa ? 0 : -1;
        });
 
        paineis.forEach(painel => {
            const deveMostrar = painel.id === aba.getAttribute("aria-controls");
            painel.hidden = !deveMostrar;
            painel.classList.toggle("active", deveMostrar);
        });
 
        moverIndicador(aba);
        if (foco) aba.focus();
    }
 
    abas.forEach(aba => aba.addEventListener("click", () => ativarAba(aba)));
 
    tablist.addEventListener("keydown", (e) => {
        const atual = Array.from(abas).indexOf(document.activeElement);
        if (atual === -1) return;
 
        let proximo = null;
        if (e.key === "ArrowRight") proximo = (atual + 1) % abas.length;
        if (e.key === "ArrowLeft") proximo = (atual - 1 + abas.length) % abas.length;
 
        if (proximo !== null) {
            e.preventDefault();
            ativarAba(abas[proximo], { foco: true });
        }
    });
 
    const abaAtiva = document.querySelector(".curso-tab.active") || abas[0];
    moverIndicador(abaAtiva);
    window.addEventListener("resize", () => moverIndicador(document.querySelector(".curso-tab.active")));
});
