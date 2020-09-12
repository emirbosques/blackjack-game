
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
const botonStop = document.querySelector('#stopGame');
const botonNewGame = document.querySelector('#newGame');
const displayPuntos = document.querySelectorAll('small');
const divCartaJugador = document.querySelector('#jugador-cartas');
const divCartaPC = document.querySelector('#jugador-computadora-cartas');
const divMensaje = document.querySelector('#mensajeJuego');

// PREPARAR DECK
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push(i + tipo)
        }
    }

    for (const tipo of tipos) {
        for (const esp of specials) {
            deck.push(esp + tipo)
        }
    }
    deck = _.shuffle(deck);
    console.log('DECK :::: ', deck);
    return deck;

}

crearDeck();


//  PEDIR CARTA
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas';
    } else {
        const carta = deck.pop();
        return carta;
    }

}

// VALOR CARTA

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    let puntos = 0;

    if (isNaN(valor)) {
        puntos = (valor === 'A') ? 11 : 10;
        return puntos;
    } else {
        puntos = valor * 1;
        return puntos;
    }
};

const turnoComputadora = (ptosMinimos) => {
    do {
        const cartajugador = pedirCarta();
        const c = document.createElement('img');
        c.src = `assets/cartas/${cartajugador}.png`;
        c.classList.add('carta');
        divCartaPC.append(c);

        puntosComputadora = puntosComputadora + valorCarta(cartajugador);
        displayPuntos[1].innerText = puntosComputadora;

        if (ptosMinimos > 21) {
            divMensaje.hidden = false;
            divMensaje.innerText = 'Computador ha ganado!';
            break;
        }

    } while ((puntosComputadora < ptosMinimos) && (ptosMinimos < 21));
    if (puntosComputadora === ptosMinimos) {
        divMensaje.hidden = false;
        divMensaje.innerText = 'EMPATE! nadie Gana!';
    } else if (puntosComputadora > 21) {
        divMensaje.hidden = false;
        divMensaje.innerText = 'Enhorabuena! has Ganado!';
    } else {
        divMensaje.hidden = false;
        divMensaje.innerText = 'Computador ha ganado!';
    }


};



// Eventos

// PEDIR CARTA
botonPedir.addEventListener('click', () => {
    const cartajugador = pedirCarta();
    const c = document.createElement('img');
    c.src = `assets/cartas/${cartajugador}.png`;
    c.classList.add('carta');
    divCartaJugador.append(c);

    puntosJugador = puntosJugador + valorCarta(cartajugador);
    displayPuntos[0].innerText = puntosJugador;

    if (puntosJugador > 21) {
        botonPedir.disabled = true;
        botonStop.disabled = true;
        botonPedir.classList.add('disabled');
        turnoComputadora(puntosJugador);
        divMensaje.hidden = false;
        divMensaje.innerText = 'Buuu has Perdido!';
        console.warn(' PERDIO ');
    } else if (puntosJugador === 21) {
        botonPedir.disabled = true;
        botonStop.disabled = true;
        divMensaje.hidden = false;
        divMensaje.innerText = 'Enhorabuena! has Ganado!';
        console.warn(' GANO ');
    }
});

//  DETENER JUEGO
botonStop.addEventListener('click', () => {
    botonPedir.disabled = true;
    botonStop.disabled = true;
    turnoComputadora(puntosJugador);
});

//  RESET JUEGO
botonNewGame.addEventListener('click', () => {
    deck.splice(0);
    deck = crearDeck();
    puntosComputadora = 0;
    puntosJugador = 0;
    divMensaje.hidden = true;
    displayPuntos[0].innerText = 0
    displayPuntos[1].innerText = 0;
    divCartaJugador.innerHTML = '';
    divCartaPC.innerHTML = '';
    botonPedir.disabled = false;
    botonStop.disabled = false;
});