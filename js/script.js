//Captura o botão "proximo"
let btnProxima = document.getElementById("proxima");
//Captura o botão "anterior"
let btnAnterior = document.getElementById("anterior");
//Captura o quadro onde a fotografia é exibida
let Quadroimagem = document.getElementById("imagem");
//Cria o album e guarda as fotos
let album = [ "imagens/img.Aline.jfif",
    "imagens/img.Competição.jfif", "imagens/img.Rosetas.jfif", "imagens/fachada.png"
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

