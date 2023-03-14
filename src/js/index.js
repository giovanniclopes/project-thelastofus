/* 
	OBJETIVO - quando clicarmos no botão temos que mostrar a image de fundo correspondente

    - passo 1 - dar um jeito de pegar o elemento HTML dos botões

	- passo 2 - dar um jeito de identificar o clique do usuário no botão

	- passo 3 - desmarcar o botão selecionado anterior

	- passo 4 - marcar o botão clicado como se estivesse selecionada

	- passo 5 - esconder a image de fundo anterior

	- passo 6 - fazer aparecer a image de fundo correspondente ao botão clicado
*/

// passo 1 - dar um jeito de pegar o elemento HTML dos botões
const buttonsCarrossel = document.querySelectorAll('.button');
const images = document.querySelectorAll('.image');

// passo 2 - dar um jeito de identificar o clique do usuário no botão
buttonsCarrossel.forEach((button, index) => {
    button.addEventListener('click', () => {    
        disableSelectButton();

        selectCarroselButton(button);

        hideActiveImage();

        showBackgroundImage(index);
    })
})

function showBackgroundImage(index) {
    images[index].classList.add('active');
}

function selectCarroselButton(button) {
    button.classList.add('selected');
}

function hideActiveImage() {
    const imageAtiva = document.querySelector('.active');
    imageAtiva.classList.remove('active');
}

function disableSelectButton() {
    const buttonSelecionado = document.querySelector('.selected');
    buttonSelecionado.classList.remove('selected');
}
