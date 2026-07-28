/* =========================================================
   MENU / NAVEGAÇÃO
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    const btnCursos = document.getElementById("btn-cursos");
    const menuCursos = document.getElementById("menu-cursos");
    const seta = document.querySelector(".seta");

    toggle?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        nav.classList.toggle("active");
    });

    btnCursos?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        menuCursos.classList.toggle("active");
        seta?.classList.toggle("ativa");
    });

    document.addEventListener("click", (e) => {
        if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove("active");
            menuCursos?.classList.remove("active");
            seta?.classList.remove("ativa");
        }
    });
});

/* =========================================================
   HERO — efeito de digitação com tradução
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const elFrase = document.getElementById("typingPhrase");
    const elTraducao = document.getElementById("typingTranslation");
    if (!elFrase || !elTraducao) return;

    const frases = [
        { texto: "I finally feel confident speaking English at work.", traducao: "Você também vai se sentir assim." },
        { texto: "I can watch a movie without reading the subtitles.", traducao: "É esse o tipo de progresso que buscamos." },
        { texto: "I just had a full conversation in English!", traducao: "E foi mais rápido do que você imagina." }
    ];

    const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduzMovimento) {
        elFrase.textContent = frases[0].texto;
        elTraducao.textContent = frases[0].traducao;
        elTraducao.classList.add("visivel");
        return;
    }

    let indiceFrase = 0;

    function digitar(texto, callback) {
        elTraducao.classList.remove("visivel");
        let i = 0;
        elFrase.innerHTML = '<span class="typing-cursor"></span>';

        const intervalo = setInterval(() => {
            i++;
            elFrase.innerHTML = texto.slice(0, i) + '<span class="typing-cursor"></span>';
            if (i >= texto.length) {
                clearInterval(intervalo);
                callback?.();
            }
        }, 38);
    }

    function apagar(callback) {
        const textoAtual = elFrase.textContent;
        let i = textoAtual.length;

        const intervalo = setInterval(() => {
            i--;
            elFrase.innerHTML = textoAtual.slice(0, i) + '<span class="typing-cursor"></span>';
            if (i <= 0) {
                clearInterval(intervalo);
                callback?.();
            }
        }, 18);
    }

    function ciclo() {
        const frase = frases[indiceFrase];
        digitar(frase.texto, () => {
            elTraducao.textContent = frase.traducao;
            elTraducao.classList.add("visivel");

            setTimeout(() => {
                apagar(() => {
                    indiceFrase = (indiceFrase + 1) % frases.length;
                    ciclo();
                });
            }, 2600);
        });
    }

    ciclo();
});