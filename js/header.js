//FUNÇÃO PARA ATIVAR A ANIMAÇÃO DE EXPANDIR DO HEADER E A INSERÇÃO DOS DOIS LINKS 
function expandirHeader() {
    let divHeader = document.getElementById('header');
    setTimeout(async function() {
        divHeader.style.animationName = "animacaoExpandirHeader"; 
        divHeader.style.width = "33%";
         setTimeout(function() {
            document.getElementById('equipe').style.opacity = "1";
            document.getElementById('contato').style.opacity = "1";
        },170)
    },100);
}
//FUNÇÃO PARA ESCONDER OS ITENS DO HEADER E DESATIVAR A ANIMAÇÃO
function esconderHeader() {
    let divHeader = document.getElementById('header');
    setTimeout(function () {
        divHeader.style.animationName = "animacaoEsconderHeader";
        divHeader.style.width = "200px";
        setTimeout(function() {
            document.getElementById('equipe').style.opacity = "0";
            document.getElementById('contato').style.opacity = "0"; 
        },150)
    },100);
}
