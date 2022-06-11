'use strict';

const display = document.getElementById('tela');
const numeros = document.querySelectorAll('[id*=num]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        switch (operador){
            case '+':
                atualizarDisplay(numeroAnterior + numeroAtual);
                break;
            case '-':
                atualizarDisplay(numeroAnterior - numeroAtual);
                break;
            case '*':
                atualizarDisplay(numeroAnterior * numeroAtual);
                break;
            case '/':
                atualizarDisplay(numeroAnterior / numeroAtual);
                break;
        } 
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    }else{
        display.textContent += texto.toLocaleString('BR');
    } 
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach (numero => numero.addEventListener('click', inserirNumero));


const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
        console.log (operador);
    }
}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';
document.getElementById('limparTela').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('virgula').addEventListener('click', inserirDecimal);


const mapaTeclado = {
    '0' : 'num0',
    '1' : 'num1',
    '2' : 'num2',
    '3' : 'num3',
    '4' : 'num4',
    '5' : 'num5',
    '6' : 'num6',
    '7' : 'num7',
    '8' : 'num8',
    '9' : 'num9',
    '/' : 'operadordiv',
    '+' : 'operadorsoma',
    '-' : 'operadorsub',
    '*' : 'operadormult',
    ',' : 'virgula',
    '=' : 'igual',
    'Enter' : 'igual',
    'Backspace' : 'backspace',
    'c' : 'limparTela',
    'Escape' : 'limparCalculo'

}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida  = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;

    if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click()
}
document.addEventListener('keydown', mapearTeclado);