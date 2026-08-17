let z = 10;

// =========================
// ABRIR JANELA
// =========================
function abrirJanela(id) {


    const janela = document.getElementById(id);


    if (!janela) return;


    if (id === "campo") {

        iniciarCampo();

    }


    janela.style.display = "block";

    janela.style.zIndex = ++z;


    janela.classList.remove("fechando");


    document.getElementById("menu").style.display = "none";


    const programas = document.getElementById("programas");


    if (!document.getElementById("btn-" + id)) {


        const botao = document.createElement("div");


        botao.className = "programa";


        botao.id = "btn-" + id;




        botao.innerHTML = `

<span>${id}</span>

<button class="fecharAba">
✕
</button>

`;


        botao.onclick = () => {

            janela.style.display = "block";

            janela.style.zIndex = ++z;

        };


        const fecharBotao = botao.querySelector(".fecharAba");


        fecharBotao.onclick = (e) => {

            e.stopPropagation();

            fecharJanela(id);

        };


        programas.appendChild(botao);


    }


}

// =========================
// FECHAR
// =========================

function fecharJanela(id) {

    const janela = document.getElementById(id);

    if (janela) {

        janela.style.display = "none";

    }

    const botao = document.getElementById("btn-" + id);

    if (botao) {

        botao.remove();

    }

}

// =========================
// MINIMIZAR
// =========================

function minimizar(id) {

    const janela = document.getElementById(id);

    if (janela) {

        janela.style.display = "none";

    }

}

// =========================
// MAXIMIZAR
// =========================

function maximizar(id) {

    const janela = document.getElementById(id);

    if (janela) {

        janela.classList.toggle("maximizada");

    }

}

// =========================
// MENU
// =========================

function toggleMenu() {

    const menu = document.getElementById("menu");

    if (menu.style.display === "block") {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";

    }

}

// =========================
// RELÓGIO
// =========================

function atualizarRelogio() {

    const relogio = document.getElementById("relogio");

    if (!relogio) return;

    const agora = new Date();

    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundos = String(agora.getSeconds()).padStart(2, "0");

    relogio.textContent = `${horas}:${minutos}:${segundos}`;

}

setInterval(atualizarRelogio, 1000);

atualizarRelogio();

// =========================
// ARRASTAR JANELAS
// =========================

document.querySelectorAll(".janela").forEach(janela => {

    const topo = janela.querySelector(".topo");

    let mover = false;

    let x = 0;

    let y = 0;
    let velocidade = 300;

    let tamanhoCelula = 20;

    let brilhoMaca = 0;

    let crescendo = true;

    const somMaca = new Audio("sons/moeda.mp3");

    topo.addEventListener("mousedown", (e) => {

        mover = true;

        janela.style.zIndex = ++z;

        x = e.clientX - janela.offsetLeft;

        y = e.clientY - janela.offsetTop;

    });

    document.addEventListener("mouseup", () => {

        mover = false;

    });

    document.addEventListener("mousemove", (e) => {

        if (!mover) return;

        if (janela.classList.contains("maximizada")) return;

        janela.style.left = (e.clientX - x) + "px";

        janela.style.top = (e.clientY - y) + "px";

    });

});

// =========================
// ABRIR TXT
// =========================

document.querySelectorAll(".arquivo").forEach(item => {

    item.addEventListener("dblclick", () => {

        abrirJanela("arquivoTxt");

    });

});

// =========================
// ARRASTAR + SALVAR ÍCONES
// =========================


document.querySelectorAll(".icone").forEach(icone => {


    icone.style.position = "absolute";


    // carregar posição salva

    let posicaoSalva = JSON.parse(
        localStorage.getItem(icone.id)
    );


    if (posicaoSalva) {

        icone.style.left = posicaoSalva.x + "px";

        icone.style.top = posicaoSalva.y + "px";

    }



    let movendo = false;

    let offsetX = 0;

    let offsetY = 0;



    icone.addEventListener("mousedown", (e) => {


        movendo = true;


        offsetX = e.clientX - icone.offsetLeft;

        offsetY = e.clientY - icone.offsetTop;


        icone.style.zIndex = ++z;


    });



    document.addEventListener("mousemove", (e) => {


        if (!movendo) return;



        icone.style.left =
            (e.clientX - offsetX) + "px";



        icone.style.top =
            (e.clientY - offsetY) + "px";


    });



    document.addEventListener("mouseup", () => {


        if (movendo) {


            localStorage.setItem(

                icone.id,

                JSON.stringify({

                    x: icone.offsetLeft,

                    y: icone.offsetTop

                })

            );


        }



        movendo = false;


    });



});




// =======================
// MENU DE CONTEXTO
// =======================

const menuContexto = document.getElementById("menuContexto");

document.addEventListener("contextmenu", function (e) {

    e.preventDefault();

    menuContexto.style.display = "block";

    menuContexto.style.left = e.pageX + "px";

    menuContexto.style.top = e.pageY + "px";

});

document.addEventListener("click", function () {

    menuContexto.style.display = "none";

});

// =======================
// PAPEL DE PAREDE
// =======================

const wallpapers = [

    "imagens/fotos/gif.gif",



];

let wallpaperAtual = 0;

function trocarWallpaper() {

    wallpaperAtual++;

    if (wallpaperAtual >= wallpapers.length) {

        wallpaperAtual = 0;

    }

    document.body.style.backgroundImage =
        `url('${wallpapers[wallpaperAtual]}')`;

}

// =========================
// BLOCO DE NOTAS
// =========================

const bloco = document.getElementById("blocoNotas");

if (bloco) {

    // Carrega o texto salvo
    bloco.value = localStorage.getItem("retroNotas") || "";

    // Salva automaticamente enquanto digita
    bloco.addEventListener("input", () => {

        localStorage.setItem("retroNotas", bloco.value);

    });

}
// =========================
// BOOT RETRO
// =========================

function iniciarBoot() {

    setTimeout(() => {


        document.getElementById("boot").style.display = "none";


        document.querySelector(".desktop").style.display = "block";


    }, 3000);

}

// =========================
// SOBRE
// =========================

function mostrarSobre() {

    alert(

        `Retro Desktop

Versão 1.0

Criado com HTML, CSS e JavaScript.`

    );

}

// =========================
// DESLIGAR RETRO COM POWER ON
// =========================

function desligarDesktop() {


    const somDesligar = new Audio("sons/desligar.wav");


    somDesligar.play();



    document.body.innerHTML = `


    <div class="computadorDesligado">


        <h1>

        Agora você pode desligar o computador.

        </h1>


        <p>

        Retro Desktop

        </p>


        <button onclick="ligarDesktop()">

        🔴 Ligar novamente

        </button>


    </div>


    `;


}



// =========================
// LIGAR NOVAMENTE
// =========================


function ligarDesktop() {


    document.body.innerHTML = `


    <div id="boot">


        <h1>

        Retro Desktop

        </h1>


        <p>

        Inicializando sistema...

        </p>


        <div class="barraBoot">

            <div class="progressoBoot"></div>

        </div>


    </div>


    `;



    const somLigar = new Audio("sons/iniciar.wav");


    somLigar.play();



    setTimeout(() => {


        location.reload();


    }, 3000);



}

// =========================
// PLAYLIST
// =========================

const musicas = [

    {
        titulo: "Vogue",
        artista: "Madonna",
        capa: "imagens/fotos/madonna.jpg",
        audio: "imagens/musica/maddona.mp3"
    },

    {
        titulo: "...Baby One More Time",
        artista: "Britney Spears",
        capa: "imagens/fotos/britney.jpg",
        audio: "imagens/musica/baby.mp3"
    },

    {
        titulo: "Fantasy",
        artista: "Mariah Carey",
        capa: "imagens/fotos/mariah.jpg",
        audio: "musicas/tu.mp3"
    },
    {
        titulo: "Bills,Bills,Bills",
        artista: "Destiny Child",
        capa: "imagens/fotos/bills.jpg",
        audio: "musicas/tu.mp3"
    },
    {
        titulo: "Dont't Cha",
        artista: "The Pussycat Dolls",
        capa: "imagens/fotos/cat.jpg",
        audio: "musicas/tu.mp3"
    },
    {
        titulo: "I'm a Slave 4 U",
        artista: "Britney Spears",
        capa: "imagens/fotos/britney2.jpg",
        audio: "musicas/tu.mp3"
    },
    {
        titulo: "Obsessed",
        artista: "Mariah Carey",
        capa: "imagens/fotos/mariah2.jpg",
        audio: "musicas/tu.mp3"
    },
    {
        titulo: "Love Don't Cost a Thing",
        artista: "Jenifer Lopez",
        capa: "imagens/fotos/jlo.jpg",
        audio: "musicas/tu.mp3"
    }


];

let musicaAtual = 0;

const audio = document.getElementById("audio");
const capa = document.getElementById("capaAlbum");
const titulo = document.getElementById("tituloMusica");
const artista = document.getElementById("artistaMusica");
const barra = document.getElementById("barra");
const playlist = document.getElementById("playlist");
const botaoPlay = document.getElementById("play");
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");

function carregarMusica(i) {

    musicaAtual = i;

    titulo.textContent = musicas[i].titulo;
    artista.textContent = musicas[i].artista;
    capa.src = musicas[i].capa;
    audio.src = musicas[i].audio;

    atualizarFavorito();
    criarPlaylist();
}




function criarPlaylist() {

    playlist.innerHTML = "";

    musicas.forEach((m, index) => {

        const item = document.createElement("div");

        item.className = "itemPlaylist";

        if (index === musicaAtual) {

            item.classList.add("tocando");

        }

        item.innerHTML = "🎵 " + m.titulo;

        item.onclick = () => {

            carregarMusica(index);

            audio.play();

            botaoPlay.innerHTML = "⏸";

        }

        playlist.appendChild(item);

    });

}

function proxima() {

    if (aleatorio) {

        musicaAtual = Math.floor(Math.random() * musicas.length);

    } else {

        musicaAtual++;

        if (musicaAtual >= musicas.length) {

            musicaAtual = 0;

        }

    }

    carregarMusica(musicaAtual);

    audio.play();

    botaoPlay.innerHTML = "⏸";

}
function anterior() {

    musicaAtual--;

    if (musicaAtual < 0) {

        musicaAtual = musicas.length - 1;

    }

    carregarMusica(musicaAtual);

    audio.play();

    botaoPlay.innerHTML = "⏸";

}

audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        barra.value =

            (audio.currentTime / audio.duration) * 100;

        tempoAtual.textContent =

            formatarTempo(audio.currentTime);

        tempoTotal.textContent =

            formatarTempo(audio.duration);

    }

});



barra.addEventListener("input", () => {

    audio.currentTime =

        (barra.value / 100) * audio.duration;

});

function formatarTempo(segundos) {

    const min = Math.floor(segundos / 60);

    const seg = Math.floor(segundos % 60);

    return String(min).padStart(2, "0") + ":" +

        String(seg).padStart(2, "0");



}
audio.addEventListener("ended", () => {

    proxima();

});

const volume = document.getElementById("volume");

volume.value = 100;

audio.volume = 1;

volume.addEventListener("input", () => {

    audio.volume = volume.value / 100;

});

let aleatorio = false;

function alternarAleatorio() {

    aleatorio = !aleatorio;

    document.getElementById("btnShuffle").style.background =

        aleatorio ? "#66cc66" : "";

}

let repetir = false;

function alternarRepetir() {

    repetir = !repetir;

    audio.loop = repetir;

    document.getElementById("btnRepeat").style.background =

        repetir ? "#66cc66" : "";

}

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function favoritar() {

    const musica = musicas[musicaAtual].titulo;

    if (favoritos.includes(musica)) {

        favoritos = favoritos.filter(item => item !== musica);

    } else {

        favoritos.push(musica);

    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    atualizarFavorito();

}

function atualizarFavorito() {

    const botao = document.getElementById("favorito");

    if (!botao) return;

    if (favoritos.includes(musicas[musicaAtual].titulo)) {

        botao.innerHTML = "♥ Favoritada";

    } else {

        botao.innerHTML = "♡ Favoritar";

    }

}




atualizarFavorito();


window.addEventListener("load", () => {

    carregarMusica(0);

});

function playPause() {

    if (audio.paused) {

        audio.play();

        botaoPlay.innerHTML = "⏸";

    } else {

        audio.pause();

        botaoPlay.innerHTML = "▶";

    }

}
// =========================
// CALCULADORA
// =========================

let valorCalc = "";

const visor = document.getElementById("visor");


function adicionar(valor) {

    if (valorCalc === "0") {

        valorCalc = "";

    }

    valorCalc += valor;

    visor.value = valorCalc;

}


function limparCalc() {

    valorCalc = "";

    visor.value = "0";

}


function apagar() {

    valorCalc = valorCalc.slice(0, -1);

    if (valorCalc === "") {

        visor.value = "0";

    } else {

        visor.value = valorCalc;

    }

}


function calcular() {

    try {

        valorCalc = eval(valorCalc);

        visor.value = valorCalc;

    }

    catch {

        visor.value = "Erro";

        valorCalc = "";

    }

}

// =========================
// SOM DOS BOTÕES
// =========================

const somBotao = new Audio("sons/retro.wav");


document.querySelectorAll(".calcBotoes button")
    .forEach(botao => {


        botao.addEventListener("click", () => {


            somBotao.currentTime = 0;

            somBotao.play();


        });


    });

// =========================
// TRAZER JANELA PARA FRENTE
// =========================


document.querySelectorAll(".janela")
    .forEach(janela => {


        janela.addEventListener("mousedown", () => {


            janela.style.zIndex = ++z;


        });


    });

// =========================
// INTERNET RETRO
// =========================


let historicoWeb = [];



function abrirSite() {


    let endereco = document.getElementById("endereco").value;


    mostrarPagina(
        "Você abriu: " + endereco
    );


    historicoWeb.push(endereco);


}



function mostrarPagina(texto) {


    document.getElementById("pagina").innerHTML = `

<h1>🌐 Retro Internet</h1>

<p>${texto}</p>


<br>


<button onclick="mostrarPagina('Página inicial')">

🏠 Inicio

</button>


`;

}



function voltarPagina() {


    mostrarPagina("Voltando...");


}



function recarregarPagina() {


    mostrarPagina("Página recarregada ✔");


}

// =========================
// VISUALIZADOR DE IMAGENS
// =========================


let imagens = [

    "imagens/fotos/britney.jpg",

    "imagens/fotos/madonna.jpg",

    "imagens/fotos/mariah.jpg"

];


let imagemAtual = 0;



function abrirImagem(src) {


    document.getElementById("fotoAberta").src = src;


    document.getElementById("imagemGrande")
        .style.display = "flex";


}


function proximaImagem() {


    imagemAtual++;


    if (imagemAtual >= imagens.length) {

        imagemAtual = 0;

    }


    abrirImagem(imagens[imagemAtual]);


}



function voltarImagem() {


    imagemAtual--;


    if (imagemAtual < 0) {

        imagemAtual = imagens.length - 1;

    }


    abrirImagem(imagens[imagemAtual]);


}

// =========================
// NAVEGADOR FAKE
// =========================


function abrirFavorito(site) {


    const pagina = document.getElementById("pagina");


    if (site === "música") {


        pagina.innerHTML = `

        <h1>🎵 Retro Music</h1>

        <p>
        Player de músicas do sistema.
        </p>

        <button onclick="mostrarPagina('inicio')">
        🏠 Voltar
        </button>

        `;


    }



    if (site === "projetos") {


        pagina.innerHTML = `

        <h1>💻 Projetos</h1>

        <p>
        Seus projetos aparecerão aqui.
        </p>

        <button onclick="mostrarPagina('inicio')">
        🏠 Voltar
        </button>

        `;


    }



    if (site === "galeria") {


        pagina.innerHTML = `

        <h1>📷 Galeria</h1>

        <p>
        Fotos do sistema.
        </p>


        <button onclick="abrirJanela('imagens')">
        Abrir imagens
        </button>


        `;


    }



    if (site === "sobre") {


        pagina.innerHTML = `

        <h1>💿 Retro Desktop</h1>

        <p>
        Sistema criado em HTML, CSS e JavaScript.
        </p>


        `;


    }



}


// =========================
// SNAKE GAME MELHORADO
// =========================

let canvas = document.getElementById("jogoSnake");
let ctx = canvas.getContext("2d");


let cobra = [];
let comida;

let direcao = "direita";

let jogo;

let pontos = 0;

let recorde = localStorage.getItem("snakeRecorde") || 0;


// velocidade inicial
let velocidade = 300;


// animação maçã
let brilhoMaca = 0;
let crescendo = true;


// som
const somMaca = new Audio("sons/moeda.mp3");



function iniciarSnake() {


    cobra = [

        { x: 140, y: 140 },

        { x: 120, y: 140 },

        { x: 100, y: 140 }

    ];


    comida = criarComida();


    direcao = "direita";


    pontos = 0;


    velocidade = 300;


    atualizarPlacar();



    clearInterval(jogo);


    jogo = setInterval(
        desenharSnake,
        velocidade
    );


}




function criarComida() {


    return {

        x: Math.floor(Math.random() * 15) * 20,

        y: Math.floor(Math.random() * 15) * 20

    };


}





document.addEventListener("keydown", e => {


    if (e.key === "ArrowUp" && direcao != "baixo")
        direcao = "cima";


    if (e.key === "ArrowDown" && direcao != "cima")
        direcao = "baixo";


    if (e.key === "ArrowLeft" && direcao != "direita")
        direcao = "esquerda";


    if (e.key === "ArrowRight" && direcao != "esquerda")
        direcao = "direita";


});






function desenharSnake() {



    ctx.fillStyle = "black";

    ctx.fillRect(0, 0, 300, 300);





    let cabeca = {

        x: cobra[0].x,

        y: cobra[0].y

    };




    if (direcao == "cima")
        cabeca.y -= 20;


    if (direcao == "baixo")
        cabeca.y += 20;


    if (direcao == "esquerda")
        cabeca.x -= 20;


    if (direcao == "direita")
        cabeca.x += 20;





    cobra.unshift(cabeca);




    // =================
    // PEGOU MAÇÃ
    // =================


    if (

        cabeca.x === comida.x &&

        cabeca.y === comida.y

    ) {



        pontos++;


        atualizarPlacar();



        // som

        somMaca.currentTime = 0;

        somMaca.play();



        // cria outra maçã

        comida = criarComida();



        // aumenta velocidade

        if (pontos % 3 === 0) {


            velocidade -= 30;


            clearInterval(jogo);


            jogo = setInterval(
                desenharSnake,
                velocidade
            );


        }



    } else {


        cobra.pop();


    }





    // =================
    // DESENHAR COBRA
    // =================



    cobra.forEach((parte, index) => {


        if (index === 0) {


            // cabeça

            ctx.fillStyle = "#00ffff";


        } else {


            ctx.fillStyle = "#00ff66";


        }


        ctx.fillRect(

            parte.x,

            parte.y,

            18,

            18

        );


    });





    // =================
    // MAÇÃ ANIMADA
    // =================


    if (crescendo) {

        brilhoMaca++;

    } else {

        brilhoMaca--;

    }



    if (brilhoMaca >= 5)
        crescendo = false;


    if (brilhoMaca <= 0)
        crescendo = true;



    ctx.fillStyle = "red";


    ctx.beginPath();


    ctx.arc(

        comida.x + 10,

        comida.y + 10,

        10 + brilhoMaca,

        0,

        Math.PI * 2

    );


    ctx.fill();







    // colisão parede


    if (

        cabeca.x < 0 ||

        cabeca.y < 0 ||

        cabeca.x >= 300 ||

        cabeca.y >= 300

    ) {


        fimSnake();


    }






    // bateu no corpo


    cobra.slice(1).forEach(p => {


        if (

            cabeca.x === p.x &&

            cabeca.y === p.y

        ) {


            fimSnake();


        }



    });



}







function fimSnake() {



    clearInterval(jogo);



    if (pontos > recorde) {


        recorde = pontos;


        localStorage.setItem(

            "snakeRecorde",

            recorde

        );


    }





    ctx.fillStyle = "rgba(0,0,0,0.8)";


    ctx.fillRect(

        0,

        0,

        300,

        300

    );




    ctx.fillStyle = "white";


    ctx.font = "25px Pixelify Sans";


    ctx.fillText(

        "GAME OVER",

        65,

        120

    );



    ctx.font = "18px Pixelify Sans";


    ctx.fillText(

        "Pontos: " + pontos,

        90,

        160

    );



    ctx.fillText(

        "Recorde: " + recorde,

        80,

        190

    );



}





function atualizarPlacar() {


    let placar = document.getElementById(
        "pontosSnake"
    );


    if (placar) {


        placar.innerHTML =

            "⭐ Pontos: " + pontos +

            " | 🏆 Recorde: " + recorde;


    }



}


// =========================
// PAINT RETRO
// =========================


const canvasPaint = document.getElementById("canvasPaint");

const ctxPaint = canvasPaint.getContext("2d");


let desenhando = false;

let borracha = false;


canvasPaint.addEventListener("mousedown", () => {

    desenhando = true;

});


canvasPaint.addEventListener("mouseup", () => {

    desenhando = false;

    ctxPaint.beginPath();

});


canvasPaint.addEventListener("mousemove", desenhar);



function desenhar(e) {


    if (!desenhando) return;


    const rect = canvasPaint.getBoundingClientRect();


    let x = e.clientX - rect.left;

    let y = e.clientY - rect.top;



    ctxPaint.lineWidth =
        document.getElementById("tamanhoPincel").value;


    ctxPaint.lineCap = "round";



    if (borracha) {

        ctxPaint.strokeStyle = "white";

    } else {

        ctxPaint.strokeStyle =
            document.getElementById("corPaint").value;

    }



    ctxPaint.lineTo(x, y);

    ctxPaint.stroke();

    ctxPaint.beginPath();

    ctxPaint.moveTo(x, y);


}




function modoPincel() {

    borracha = false;

}



function modoBorracha() {

    borracha = true;

}



function limparPaint() {

    ctxPaint.clearRect(
        0,
        0,
        canvasPaint.width,
        canvasPaint.height
    );

}



// salvar imagem

function salvarPaint() {


    let imagem = canvasPaint.toDataURL();


    let link = document.createElement("a");


    link.href = imagem;


    link.download = "desenho-retro.png";


    link.click();


}



// abrir desenho

function abrirPaint() {


    document.getElementById("arquivoPaint").click();


}



document
    .getElementById("arquivoPaint")
    .addEventListener("change", function (e) {


        let arquivo = e.target.files[0];


        let img = new Image();


        img.onload = () => {


            ctxPaint.clearRect(
                0,
                0,
                canvasPaint.width,
                canvasPaint.height
            );


            ctxPaint.drawImage(
                img,
                0,
                0
            );


        };


        img.src = URL.createObjectURL(arquivo);


    });

// =========================
// CURSOR + SOM DE CLIQUE
// =========================


const somClique = new Audio("sons/pixeltext.mp3");


document.addEventListener("click", function () {


    // som
    somClique.currentTime = 0;
    somClique.play();



    // anima cursor

    document.body.classList.add("clicando");


    setTimeout(() => {

        document.body.classList.remove("clicando");

    }, 200);



});


// =========================
// LOGIN RETRO
// =========================

function entrarSistema() {

    let usuario = document.getElementById("usuarioLogin").value;

    let senha = document.getElementById("senhaLogin").value;


    if (usuario === "admin" && senha === "1234") {


        document.getElementById("login").style.display = "none";


        document.querySelector(".desktop").style.display = "block";


    } else {


        document.getElementById("erroLogin").innerHTML =
            "Usuário ou senha incorretos";


    }

}

// =========================
// CAMPO MINADO RETRO
// =========================

let bombas = [];
let jogoCampo = false;
let tempoCampo = 0;
let contadorCampo;


const somExplosao = new Audio("sons/bombaclat.mp3");


function iniciarCampo() {

    const tabuleiro = document.getElementById("tabuleiro");


    if (!tabuleiro) {
        console.log("Erro: tabuleiro não existe");
        return;
    }


    tabuleiro.innerHTML = "";

    bombas = [];

    tempoCampo = 0;

    jogoCampo = true;



    document.getElementById("tempoCampo").innerHTML = 0;



    clearInterval(contadorCampo);



    contadorCampo = setInterval(() => {

        tempoCampo++;

        document.getElementById("tempoCampo").innerHTML = tempoCampo;


    }, 1000);



    // criar bombas

    while (bombas.length < 10) {

        let posicao = Math.floor(Math.random() * 64);


        if (!bombas.includes(posicao)) {

            bombas.push(posicao);

        }

    }



    // criar casas

    for (let i = 0; i < 64; i++) {


        let bloco = document.createElement("div");


        bloco.className = "blocoCampo";



        bloco.onclick = function () {


            clicarCampo(i, bloco);


        };



        tabuleiro.appendChild(bloco);



    }


}




function clicarCampo(pos, bloco) {


    if (!jogoCampo) return;



    if (bloco.classList.contains("aberto"))
        return;



    if (bombas.includes(pos)) {


        bloco.innerHTML = "💣";


        bloco.classList.add("explodiu");



        somExplosao.currentTime = 0;

        somExplosao.play();



        fimCampo(false);


        return;


    }



    bloco.innerHTML = "🌱";


    bloco.classList.add("aberto");



    verificarVitoria();



}




function verificarVitoria() {


    let abertos = document.querySelectorAll(".blocoCampo.aberto").length;



    if (abertos === 54) {


        fimCampo(true);


    }


}




function fimCampo(vitoria) {


    jogoCampo = false;


    clearInterval(contadorCampo);



    if (vitoria) {

        alert("🎉 Você venceu!");

    } else {


        alert("💥 Game Over!");

    }


}
// =========================
// TETRIS RETRO COMPLETO
// =========================

const canvasTetris = document.getElementById("jogoTetris");
const ctxTetris = canvasTetris.getContext("2d");


const TAM = 30;

const COLUNAS = 10;
const LINHAS = 20;


let tabuleiroTetris = [];

let pecaAtual = null;

let jogoTetris;

let pontosTetris = 0;

let recordeTetris =
    localStorage.getItem("recordeTetris") || 0;


let velocidadeTetris = 600;



const somLinha = new Audio("sons/linha.mp3");

const somMover = new Audio("sons/retro.wav");





// PEÇAS

const pecas = [

    {
        forma: [
            [1, 1],
            [1, 1]
        ]
    },


    {
        forma: [
            [1, 1, 1, 1]
        ]
    },


    {
        forma: [
            [0, 1, 0],
            [1, 1, 1]
        ]
    },


    {
        forma: [
            [1, 0, 0],
            [1, 1, 1]
        ]
    },


    {
        forma: [
            [0, 0, 1],
            [1, 1, 1]
        ]
    }


];





function criarTabuleiro() {


    tabuleiroTetris = [];


    for (let y = 0; y < LINHAS; y++) {

        tabuleiroTetris.push(
            new Array(COLUNAS).fill(0)
        );

    }

}




function novaPeca() {


    let escolha =
        pecas[
        Math.floor(Math.random() * pecas.length)
        ];


    return {

        forma: escolha.forma,

        x: 3,

        y: 0

    };


}




function iniciarTetris() {


    clearInterval(jogoTetris);


    criarTabuleiro();


    pecaAtual = novaPeca();


    pontosTetris = 0;


    velocidadeTetris = 600;


    atualizarPontos();



    jogoTetris = setInterval(() => {


        moverBaixo();


    }, velocidadeTetris);



    desenharTetris();


}





function desenharTetris() {


    ctxTetris.fillStyle = "#111";

    ctxTetris.fillRect(
        0,
        0,
        300,
        600
    );




    // tabuleiro


    for (let y = 0; y < LINHAS; y++) {


        for (let x = 0; x < COLUNAS; x++) {


            if (tabuleiroTetris[y][x]) {


                desenharBloco(x, y, "#00ffff");


            }


        }


    }



    // peça atual


    pecaAtual.forma.forEach((linha, y) => {


        linha.forEach((valor, x) => {


            if (valor) {


                desenharBloco(

                    pecaAtual.x + x,

                    pecaAtual.y + y,

                    "#ff00ff"

                );


            }


        });


    });


}







function desenharBloco(x, y, cor) {


    ctxTetris.fillStyle = cor;


    ctxTetris.fillRect(

        x * TAM,

        y * TAM,

        TAM - 2,

        TAM - 2

    );


}







function colidiu() {



    for (let y = 0; y < pecaAtual.forma.length; y++) {


        for (let x = 0; x < pecaAtual.forma[y].length; x++) {


            if (

                pecaAtual.forma[y][x] &&

                (

                    !tabuleiroTetris[pecaAtual.y + y] ||

                    tabuleiroTetris[pecaAtual.y + y][pecaAtual.x + x]

                )

            ) {

                return true;


            }


        }


    }


    return false;

}







function travarPeca() {



    pecaAtual.forma.forEach((linha, y) => {


        linha.forEach((valor, x) => {


            if (valor) {


                tabuleiroTetris[

                    pecaAtual.y + y

                ][

                    pecaAtual.x + x

                ] = 1;


            }


        });


    });



    quebrarLinhas();



    pecaAtual = novaPeca();



    if (colidiu()) {


        fimTetris();


    }


}






function moverBaixo() {


    pecaAtual.y++;



    if (colidiu()) {


        pecaAtual.y--;


        travarPeca();


    }


    desenharTetris();


}







function quebrarLinhas() {


    for (let y = LINHAS - 1; y >= 0; y--) {


        if (tabuleiroTetris[y].every(v => v)) {



            tabuleiroTetris.splice(y, 1);


            tabuleiroTetris.unshift(

                new Array(COLUNAS).fill(0)

            );



            pontosTetris += 100;



            somLinha.currentTime = 0;

            somLinha.play();


        }



    }


    atualizarPontos();


}






function girarPeca() {


    let nova = [];


    for (let x = 0; x < pecaAtual.forma[0].length; x++) {


        nova[x] = [];


        for (let y = pecaAtual.forma.length - 1; y >= 0; y--) {


            nova[x].push(

                pecaAtual.forma[y][x]

            );


        }


    }



    pecaAtual.forma = nova;



    if (colidiu()) {

        // volta se bater

        girarPecaVoltar();

    }



}





function girarPecaVoltar() {


    // simples proteção

    pecaAtual.forma.reverse();


}






document.addEventListener("keydown", e => {


    if (!pecaAtual) return;



    if (e.key === "ArrowLeft") {


        pecaAtual.x--;


        if (colidiu())

            pecaAtual.x++;


    }



    if (e.key === "ArrowRight") {


        pecaAtual.x++;


        if (colidiu())

            pecaAtual.x--;


    }





    if (e.key === "ArrowDown") {


        moverBaixo();


    }




    if (e.key === "ArrowUp") {


        girarPeca();


    }



    somMover.currentTime = 0;

    somMover.play();


    desenharTetris();


});







function atualizarPontos() {


    let texto = document.getElementById("pontosTetris");


    if (texto) {


        texto.innerHTML =

            "⭐ Pontos: " + pontosTetris +
            " | 🏆 Recorde: " + recordeTetris;


    }


}






function fimTetris() {


    clearInterval(jogoTetris);



    if (pontosTetris > recordeTetris) {


        recordeTetris = pontosTetris;


        localStorage.setItem(

            "recordeTetris",

            recordeTetris

        );


    }



    alert(
        "GAME OVER\nPontos: " + pontosTetris
    );


}

// RELÓGIO DIGITAL


function relogioRetro() {


    let agora = new Date();


    let h =
        String(agora.getHours()).padStart(2, "0");


    let m =
        String(agora.getMinutes()).padStart(2, "0");


    let s =
        String(agora.getSeconds()).padStart(2, "0");



    document.getElementById("relogio").innerHTML =

        `${h}:${m}:${s}`;



}



setInterval(relogioRetro, 1000);


relogioRetro();