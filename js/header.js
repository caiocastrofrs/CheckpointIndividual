//FUNÇÃO PARA ATIVAR A ANIMAÇÃO DE EXPANDIR DO HEADER E A INSERÇÃO DOS DOIS LINKS 
function expandirHeader() {
    let divHeader = document.getElementById('header');
    setTimeout(function() {
        divHeader.style.animationName = "animacaoExpandirHeader"; 
        divHeader.style.width = "33%";
         setTimeout(function() {
            document.getElementById('equipe').style.display = "inline-block";
            document.getElementById('contato').style.display = "inline-block";
        },170)
    },100);
}
//FUNÇÃO PARA ESCONDER OS ITENS DO HEADER E DESATIVAR A ANIMAÇÃO
function esconderHeader() {
    let divHeader = document.getElementById('header');
    console.log(getComputedStyle(divHeader).width);
    setTimeout(function () {
        divHeader.style.animationName = "animacaoEsconderHeader";
        divHeader.style.width = "200px";
        setTimeout(function() {
            document.getElementById('equipe').style.display = "none";
            document.getElementById('contato').style.display = "none"; 
        },150)
    },100);
}

const isMobile = () => window.matchMedia('(max-width: 700px)').matches
window.onload = () => {
    if(isMobile()){
        let divHeader = document.getElementById('header');
        divHeader.removeAttribute('onmouseenter');
        divHeader.removeAttribute('onmouseleave');
        divHeader.setAttribute('ontouchstart','expandirHeader()');
    }
}
