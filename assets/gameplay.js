//variavel que armazena a chamada da função timeout de contar tempo;
var timerID = null;


function iniciarJogo() {
    var url = window.location.search;
    var nivel = url.replace('?nivel=', '');
    var tempo_segundos = 0;
    var qtde_baloes = 80;

    switch (nivel) {
        case '1':
            tempo_segundos = 120;
            break;
        case '2':
            tempo_segundos = 60;
            break;
        case '3':
            tempo_segundos = 30;
            break;
        default:
    }

    document.getElementById('img-time-pontos').innerHTML = tempo_segundos;

    document.getElementById('img-ballon-pontos').innerHTML = qtde_baloes;

    document.getElementById('img-ballon-pontos-est').innerHTML = 0;

    criarBaloes(qtde_baloes);

    contarTempo(tempo_segundos + 1);
}

function contarTempo(segundos) {
    segundos = segundos - 1;

    if (segundos == -1) {
        clearTimeout(timerID); //encerra a execução da função setTimeout;

        gameOver(); // fim de jogo;
        return false;
    }
    document.getElementById('img-time-pontos').innerHTML = segundos;

    timerID = setTimeout("contarTempo(" + segundos + ")", 1000);
}

function gameOver() {
    removeEventosBaloes();

    alert("Fim de jogo, Infelizmente você não estorou todos os balões a tempo!");

    resultado();

}

function criarBaloes(qtde_baloes) {
    for (var i = 1; i <= qtde_baloes; i++) {

        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '12px';
        balao.id = 'b' + i;
        balao.onclick = function () {
            estourar(this);
        };

        document.getElementById('content').appendChild(balao);
    }
}

function estourar(e) {
    var idBalao = e.id;

    document.getElementById(idBalao).setAttribute("onclick", "");

    document.getElementById(idBalao).src = 'imagens/balao_azul_pequeno_estourado.png';

    pontuacao(1);
}

function pontuacao(acao) {

    var baloesInteiros = parseInt(document.getElementById('img-ballon-pontos').innerHTML);

    var baloesEstourados = parseInt(document.getElementById('img-ballon-pontos-est').innerHTML);

    baloesInteiros = baloesInteiros - acao;

    document.getElementById('img-ballon-pontos').innerHTML = baloesInteiros;

    baloesEstourados = baloesEstourados + acao;

    document.getElementById('img-ballon-pontos-est').innerHTML = baloesEstourados;

    estadoJogo(baloesInteiros);
}

function estadoJogo(baloesInteiros) {
    if (baloesInteiros == 0) {
        clearTimeout(timerID);
        alert("Parabéns!!! Você conseguiu terminar o jogo a tempo!");

        resultado();


    }
}

function removeEventosBaloes() {
    var i = 1; //contado para recuperar balões por id

    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while (document.getElementById('b' + i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b' + i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

function resultado() {

    var baloesInteiros = parseInt(document.getElementById('img-ballon-pontos').innerHTML);

    var baloesEstourados = parseInt(document.getElementById('img-ballon-pontos-est').innerHTML);
    alert("Sua Pontuação Final foi : \nestourados : " + baloesEstourados + " \nnão estourados : " + baloesInteiros);
}
