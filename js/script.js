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

let indexAtual = 0;

function atualizarCarrossel() {
    const track = document.querySelector('.carrossel-track');
    const itens = document.querySelectorAll('.carrossel-item');
    const wrapper = document.querySelector('.carrossel-wrapper');
    
    if (!track || itens.length === 0) return;

    // Se for Desktop (tela maior que 768px), limpa as modificações do JS
    if (window.innerWidth > 768) {
        track.style.transform = '';
        itens.forEach(item => item.classList.remove('active'));
        return;
    }

    // Código executado apenas se for Mobile
    itens.forEach((item, index) => {
        if (index === indexAtual) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const larguraItem = itens[indexAtual].offsetWidth;
    const larguraWrapper = wrapper.offsetWidth;
    const offsetItem = itens[indexAtual].offsetLeft; 
    
    // Alinhamento matemático centralizado perfeito na viewport móvel
    const deslocamento = offsetItem - (larguraWrapper / 2) + (larguraItem / 2);
    track.style.transform = `translateX(${-deslocamento}px)`;
}

function mudarFoto(direcao) {
    // Executa a mudança de foto por cliques apenas se estiver no mobile
    if (window.innerWidth > 768) return;

    const itens = document.querySelectorAll('.carrossel-item');
    indexAtual += direcao;

    if (indexAtual < 0) {
        indexAtual = itens.length - 1;
    } else if (indexAtual >= itens.length) {
        indexAtual = 0;
    }

    atualizarCarrossel();
}

// Inicializa o estado correto baseado na largura atual do dispositivo
window.addEventListener('load', () => {
    setTimeout(atualizarCarrossel, 150);
});
window.addEventListener('resize', atualizarCarrossel);