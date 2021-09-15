//RECUPERANDO POP UP DE INSERIR CARD
let divInserirCard = document.getElementById('pop-up');
//PREVENINDO O RECARREGAMENTO DA PÁGINA AO DAR SUBMIT
divInserirCard.addEventListener('submit', function(e){
    e.preventDefault();
})
//ABRIR FORM
function abrirPopup() {
    divInserirCard.style.display = "flex";
    document.getElementById('card-container').style.pointerEvents = "none";
    document.querySelector('.section-div-botoes').style.pointerEvents = "none";
}
//FECHAR FORM
function fecharPopup() {
    document.getElementById('card-container').style.pointerEvents = "auto";
    document.querySelector('.section-div-botoes').style.pointerEvents = "auto";
    divInserirCard.style.display = "none";
    resetBotaoInserirCard();
    limparCampos();
}
//FUNÇÃO PARA CRIAR TODOS OS ELEMENTOS DO CARD
function criarCard(caminhoImagem, tituloH2, sinopseP) {
    let card = document.createElement('section');
    let titulo = document.createElement('h2');
    let img = document.createElement('img');
    let sinopse = document.createElement('p');

    card.classList.add('card');
    card.setAttribute('onclick', "addEditSelecao(this)");
    img.src = caminhoImagem;
    img.alt = `poster do filme ${titulo}`;
    titulo.innerText = tituloH2;
    sinopse.innerText = sinopseP;
    card.addEventListener('dblclick', function() {
        this.classList.toggle('excluir-card');
    })
    card.style.animationName = "animacaoCriarCard";
    card.appendChild(img);
    card.appendChild(titulo);
    card.appendChild(sinopse);

    return card;
}
//FUNÇÃO PARA INSERIR O CARD NA PÁGINA
function inserirCard() {
    let img;
    let titulo;
    let sinopse;
    let card;
    
    if(checarCamposVazios()) {
        img = document.getElementById('urlImg').value;
        titulo = document.getElementById('titulo').value;
        sinopse = document.getElementById('sinopse').value;
        card = criarCard(img, titulo, sinopse);
        document.getElementById('card-container').appendChild(card);
        limparCampos();
        fecharPopup(); 
    } else {
        alert("Preencha todos os campos!");
    }
}
//FUNÇÃO PARA EXCLUIR O CARD
function excluirCard(card) {
    card.style.animationDuration = ".3s";
    card.style.animationName = "animacaoExcluirCard";
    setTimeout(function() {
        document.getElementById('card-container').removeChild(card);
    },290);

}
//FUNÇÃO PARA CHECAR SE EXISTEM CAMPOS VAZIOS NO MOMENTO DA INSERÇÃO DOS DADOS DO CARD
function checarCamposVazios() {
    if((document.getElementById('urlImg').value.length > 0) && 
    (document.getElementById('titulo').value.length > 0) && 
    (document.getElementById('sinopse').value.length > 0)) {
        return true;
    } else {
        return false;
    }
}
//FUNÇÃO PARA ADICIONAR A SELEÇÃO DE EDIÇÃO DO CARD
function addEditSelecao(card) {
    if(card.classList.contains('excluir-card')) {
        card.classList.remove('excluir-card');
    } else if (card.classList.contains('editar-card')) { 
        card.classList.remove('editar-card');
    }else {
        card.classList.toggle("editar-card");
    }
}
//FUNÇÃO PARA RETORNAR UM ARRAY CONTENDO TODOS OS CARDS PRESENTES NA PÁGINA
function getArrayCards() {
    let cards = document.querySelectorAll('.card');
    return cards;
}
//FUNÇÃO PARA EXCLUIR TODO CARD QUE ESTIVER COM A SELEÇÃO DE EXCLUIR
function checarCardsSelecaoExcluir() {
    let cards = document.querySelectorAll(".excluir-card");
    if(cards.length == 0) {
        alert("Não há cards para remover");
    } else {
        for(card of cards) {
            if(card.classList.contains("excluir-card")) {
                excluirCard(card);
            }
        }
    }
}
//FUNÇÃO PARA RETORNAR FALSO CASO TENHA MAIS DE UM CARD COM A SELEÇÃO DE EDIÇÃO OU RETORNA O CARD SELECIONADO
function checkQntdCardsEditar(arrayCards) {
    let cont = 0;
    for(card of arrayCards) {
        if(card.classList.contains("editar-card")) {
            cont++;
        } 
    }
    if(cont > 1) {
        return true;
    } else if(cont == 0) return false;
}
//FUNÇÃO PARA MUDAR O BOTÃO DE INSERIR FILME PARA EDITAR CARD E SETAR A FUNÇÃO editarCard() NO BOTÃO
function popUpEditar() {
    let card = document.querySelector(".editar-card");
    if(!card) {
        alert("Não há cards para editar")
    } else if(checkQntdCardsEditar(getArrayCards())) {
        alert('Edite apenas um card por vez');

    }else {
        let botao = document.getElementById('btnEnviar');
        botao.innerText = "Editar card";
        botao.setAttribute('onclick',`editarCard()`);
        abrirPopup();
    }
}
//FUNÇÃO PARA EDITAR AS INFORMAÇÕES DO CARD
function editarCard() {
    let card = document.querySelector(".editar-card");
    if(document.getElementById('urlImg').value.length > 0) {
        card.children[0].src = document.getElementById('urlImg').value;
    }
    if(document.getElementById('titulo').value.length > 0) {
        card.children[1].innerText = document.getElementById('titulo').value;
    }
    if(document.getElementById('sinopse').value.length > 0) {
        card.children[2].innerText = document.getElementById('sinopse').value;
    }
    card.classList.remove('editar-card');
    resetBotaoInserirCard();
    limparCampos();
    fecharPopup();
}
//FUNÇÃO PARA FORMATAR O BOTÃO DO FORM DE EDITAR CARD PARA INSERIR CARD
//É NECESSARIO POIS ESTOU UTILIZANDO O MESMO FORMULÁRIO PARA CRIAR E EDITAR CARD
//QUANDO O BOTÃO CRIAR CARD É CLICADO, O BOTÃO "INSERIR FILME" VEM COM A FUNÇÃO inserirCard();
//QUANDO O BOTÃO EDITAR CARD É CLICADO, O BOTÃO "INSERIR FILME" VEM COM A FUNÇÃO editarCard();
function resetBotaoInserirCard() {
    let botao = document.getElementById('btnEnviar');
    botao.innerText = "Inserir filme";
    botao.setAttribute('onclick',`inserirCard()`);
}
//FUNÇÃO PARA LIMPAR OS CAMPOS QUANDO O POP UP É FECHADO
function limparCampos() {
    document.getElementById('urlImg').value = "";
    document.getElementById('titulo').value = "";
    document.getElementById('sinopse').value = "";
}
//INSERÇÃO DE FILMES PARA EXEMPLO
function inserirExemplosCard() {
    document.getElementById('card-container').appendChild(criarCard('https://s3.amazonaws.com/criterion-production/films/9c3df80b84fb6e0e7f3ef692cb6ff579/zLMh5Bdp1x7ZdMgkD776ew5Qsh9iRC_large.jpg','Chungking Express','The whiplash, double-pronged Chungking Express is one of the defining works of 1990s cinema and the film that made Wong Kar Wai an instant icon.'));
    document.getElementById('card-container').appendChild(criarCard('https://upload.wikimedia.org/wikipedia/pt/d/d7/Tudo_Sobre_Lily_Chou-Chou_Poster.jpg','All About Lily Chou Chou','Charts the troubled teenage years of students Yūichi Hasumi and Shūsuke Hoshino, exploring the shifting and complex power dynamics of their relationship against the backdrop of Yūichi’s love for the dreamy and abstract music of fictional pop star Lily Chou-Chou.'));
    document.getElementById('card-container').appendChild(criarCard('https://temqueassistir.files.wordpress.com/2015/04/snatch_1.jpg','Snatch','The second film from British director Guy Ritchie. Snatch tells an obscure story similar to his first fast-paced crazy character-colliding filled film “Lock, Stock and Two Smoking Barrels.” There are two overlapping stories here – one is the search for a stolen diamond, and the other about a boxing promoter who’s having trouble with a psychotic gangster.'));
}
inserirExemplosCard();