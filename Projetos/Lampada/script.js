
const ligar = document.getElementById('ligar');
const desligar = document.getElementById('desligar');
const lamp = document.getElementById('lampada');

function lampOn () {
    lamp.src = './img/ligada.jpg';
}

function lampOff () {
    lamp.src = './img/desligada.jpg';
}

function lampQuebra () {
    lamp.src = './img/quebrada.jpg';
}

ligar.addEventListener('click', lampOn);
desligar.addEventListener('click', lampOff);
lamp.addEventListener( 'dblclick' , lampQuebra);
