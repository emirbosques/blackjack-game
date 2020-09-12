
/**
 * 2C - TWO OF CUBS
 * 2D - TWO OF DIAMONDS
 * 2H - TWO OF HEART
 * 2S - TWO OF SPADES
 */

 let deck = [];
 const tipos = ['C', 'D', 'H', 'S'];
 const specials = ['A' ,'J', 'Q', 'K'];


 const crearDeck = ()=>{
     for (let i = 2; i <= 10; i++) {
         for (const tipo of tipos) {
             deck.push(i+tipo)
         }
     }

     for (const tipo of tipos) {
         for (const esp of specials) {
             deck.push(tipo+esp)
         }
     }
 deck = _.shuffle( deck );

 return deck;
     
 }

 crearDeck();