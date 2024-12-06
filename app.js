let listaDeNumerosSorteados= []
let numeroLimite= 10
let numeroSecreto= gerarNumeroAleatorio()
let tentativas= 1
//Formas de usar o querySelector
/*1° forma: pela tag*/

//let titulo= document.querySelector('h1')
//titulo.innerHTML= 'Jogo do número secreto!'

/*2° forma: quando quiser filtrar pelo id ou class, use o # como no CSS
let titulo= document.querySelector('#title')
titulo.innerHTML= 'Jogo do número secreto!'
*/

//let paragrafo= document.querySelector('p')
//paragrafo.innerHTML= 'Escolha um número entre 1 e 10'

function exibirTextoNaTela(tag,texto){
    let campo=document.querySelector(tag)
    campo.innerHTML= texto
    if('speechSynthesis' in window){
        let utterance= new SpeechSynthesisUtterance(texto)
        utterance.lang= 'pt-br'
        utterance.rate= 1.75
        window.speechSynthesis.speak(utterance)
    }else{
        console.log('Web Speech API não suporta este navegador')
    }
}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto!')
    exibirTextoNaTela('p','Escolha um número entre 1 e 10')
}

exibirMensagemInicial()

function verificarChute(){
    let chute=document.querySelector('input').value
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!')
        let palavraTentativa= tentativas>1 ? 'tentativas' : 'tentativa'
        let mensagemTentativas=`Você descobriu o número secreto com ${tentativas}
        ${palavraTentativa}!`
        exibirTextoNaTela('p',mensagemTentativas)
        document.getElementById("reiniciar").removeAttribute('disabled')
    }else if(chute>numeroSecreto){
        exibirTextoNaTela('p',`O número secreto é menor`)
    }else{
        exibirTextoNaTela('p',`O número secreto é maior`)
    }
    tentativas++
    limparCampo()
}
function gerarNumeroAleatorio(){
    let numeroEscolhido=parseInt(Math.random()*numeroLimite+1)
    let quantidadeDeElementosDaLista= listaDeNumerosSorteados.length
    if(quantidadeDeElementosDaLista == numeroLimite){
        listaDeNumerosSorteados=[]
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio()
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido
    }
}
function limparCampo(){
    chute=document.querySelector('input')
    chute.value= ''
}
function reiniciarJogo(){
    numeroSecreto= gerarNumeroAleatorio()
    tentativas=1
    limparCampo()
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled',true)
}