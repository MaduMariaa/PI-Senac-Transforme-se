//Captura o botão "proximo"
let btnProxima = document.getElementById("proxima");
//Captura o botão "anterior"
let btnAnterior = document.getElementById("anterior");
//Captura o quadro onde a fotografia é exibida
let Quadroimagem = document.getElementById("imagem");
//Cria o album e guarda as fotos
let album = [ "imagens/img.Aline.jfif",
    "imagens/img.Competição.jfif", "imagens/img.Rosetas.jfif", "imagens/img.fachada.jfif"
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


