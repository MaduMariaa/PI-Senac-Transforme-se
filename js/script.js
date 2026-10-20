location.hash = 'inicio';
window.location = '#inicio';
//Captura o botão "proximo"
let btnProxima = document.getElementById("proxima");
//Captura o botão "anterior"
let btnAnterior = document.getElementById("anterior");
//Captura o quadro onde a fotografia é exibida
let Quadroimagem = document.getElementById("imagem");
//Cria o album e guarda as fotos
let album = [ "imagens/img.Aline.png",
    "imagens/img.Competição.png", "imagens/img.Rosetas.png", "imagens/fachada.png"
]   

//Quando o botão proximo for clicado executa a função mostrar proximo
btnProxima.addEventListener("click", mostrarProximo);

//Define a posição inicial da foto do album
let foto = 0;

//Função responsável por mostrar a proxima foto
function mostrarProximo(){
    //Avança uma posição do álbum
    foto = foto + 1;
    if (foto >= album.length) {
        foto = 0;
    }
    Quadroimagem.src = album[foto];
}

btnAnterior.addEventListener("click", mostrarAnterior);

//Função responsável por mostrar a proxima foto
function mostrarAnterior(){
    //Avança uma posição do álbum
    foto = foto - 1;
        if (foto < 0) {
        foto = album.length - 1;
    }
    Quadroimagem.src = album[foto];
}

// Variáveis para armazenar as coordenadas iniciais e finais do toque
let touchStartX = 0;
let touchEndX = 0;

// Registra o ponto onde o usuário tocou na tela
Quadroimagem.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

// Registra o ponto onde o usuário soltou a tela e verifica a direção
Quadroimagem.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    lidarComArrasto();
}, { passive: true });

// Função que calcula a direção do arrasto
function lidarComArrasto() {
    // Define uma distância mínima (em pixels) para ser considerado um arrasto intencional
    const limiteArrasto = 50; 

    // Se a posição inicial for maior que a final, o usuário arrastou para a ESQUERDA (Próxima foto)
    if (touchStartX - touchEndX > limiteArrasto) {
        mostrarProximo();
    }
    // Se a posição final for maior que a inicial, o usuário arrastou para a DIREITA (Foto anterior)
    else if (touchEndX - touchStartX > limiteArrasto) {
        mostrarAnterior();
    }
}

const menu = document.querySelector("#menu");
const side = document.querySelector(".nav-side");
const fecharMenu = document.querySelector("#fecharMenu");
const navItem = document.querySelectorAll(".nav-item");

menu.addEventListener("click", function() {
    side.classList.add("aberto");
});

fecharMenu.addEventListener("click", function() {
    side.classList.remove("aberto");
});

navItem.forEach(function(item) {
    item.addEventListener("click", function() {
        side.classList.remove("aberto");
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".carrossel-wrapper");
    const track = document.querySelector(".carrossel-track");

    if (!wrapper || !track) return;

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Função para obter a posição X exata (funciona para mouse e toque do celular)
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    // Inicia o arrasto (Mouse Click ou Toque na Tela)
    function dragStart(event) {
        isDragging = true;
        startX = getPositionX(event);
        wrapper.classList.add("arrastando");

        // Captura a posição atual calculada pela animação CSS antes de pausá-la
        const computedStyle = window.getComputedStyle(track);
        const matrix = new WebKitCSSMatrix(computedStyle.transform);
        prevTranslate = matrix.m41; // Obtém o valor atual de X no transform atual

        // Para a animação automática CSS e fixa a posição atual do transform via JS
        track.style.animation = "none";
        track.style.transform = `translateX(${prevTranslate}px)`;
    }

    // Executa enquanto o usuário move o mouse/dedo
    function dragAction(event) {
        if (!isDragging) return;
        
        const currentX = getPositionX(event);
        const dragDistance = currentX - startX;
        
        currentTranslate = prevTranslate + dragDistance;

        // Limita o arrasto para o carrossel infinito não sumir da tela nas pontas
        const trackWidth = track.scrollWidth;
        if (currentTranslate > 0) {
            currentTranslate = -trackWidth / 2; // Volta para a metade se for muito para a esquerda
        } else if (currentTranslate < -trackWidth / 2) {
            currentTranslate = 0; // Reseta se passar da metade mapeada
        }

        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    // Finaliza o arrasto (Solta o clique ou tira o dedo)
    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        wrapper.classList.remove("arrastando");

        // Salva onde o usuário parou de arrastar
        prevTranslate = currentTranslate;

        // Opcional: Reativa a animação automática de onde parou.
        // Se você preferir que o carrossel continue parado após arrastar, comente as duas linhas abaixo:
        track.style.animation = "rodar 30s linear infinite";
        track.style.transform = ""; // Limpa o transform inline para o CSS reassumir
    }

    // --- EVENTOS DO MOUSE (Computador) ---
    wrapper.addEventListener("mousedown", dragStart);
    window.addEventListener("mousemove", dragAction);
    window.addEventListener("mouseup", dragEnd);

    // --- EVENTOS DE TOQUE (Celular/Tablet) ---
    wrapper.addEventListener("touchstart", dragStart, { passive: true });
    window.addEventListener("touchmove", dragAction, { passive: true });
    window.addEventListener("touchend", dragEnd);
});

