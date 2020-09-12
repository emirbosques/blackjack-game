
/**
 * 2C - TWO OF CUBS
 * 2D - TWO OF DIAMONDS
 * 2H - TWO OF HEART
 * 2S - TWO OF SPADES
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosComputadora = 0;

// REFERENCIAS HTML
const botonPedir = document.querySelector('#pedirCarta');
const displayPuntos = document.querySelectorAll('small');
const divCartaJugador = document.querySelector('#jugador-cartas');
const cartaPC = document.querySelector('#jugador-computadora-cartas');

// PREPARAR DECK
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push(i + tipo)
        }
    }

    for (const tipo of tipos) {
        for (const esp of specials) {
            deck.push( esp + tipo)
        }
    }
    deck = _.shuffle(deck);
    console.log('DECK --', deck);
    return deck;

}

crearDeck();


//  PEDIR CARTA
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas';
    } else {
        const carta = deck.pop();
        console.log('Pedir Carta :::', carta);
        return carta;
    }

}

// VALOR CARTA

const valorCarta = ( carta ) =>{

    const valor = carta.substring(0, carta.length -1);
    let puntos = 0;

    if (isNaN(valor)) {
        puntos = (valor === 'A') ? 11 : 10;
        return puntos;
    } else {
        puntos = valor * 1;
        return puntos;
    }
};


// Eventos

// PEDIR CARTA
botonPedir.addEventListener('click', ()=>{
    const cartajugador = pedirCarta();
    const c = document.createElement('img');
    c.src = `assets/cartas/${cartajugador}.png`;
    c.classList.add('carta');
    divCartaJugador.append(c);
    
    puntosJugador =  puntosJugador + valorCarta( cartajugador );
    displayPuntos[0].innerText = puntosJugador;

    if (puntosJugador > 21) {
        botonPedir.disabled = true;
        botonPedir.classList.add('disabled');
        console.warn(' PERDIO ');
    } else if( puntosJugador === 21 ){
        botonPedir.disabled = true;
        console.warn(' GANO ');
    }
});