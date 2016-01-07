var init = function() {

//--- start example JS ---

var config = {
showNotation: true,
position: 'start',
orientation: 'black'


}


var board = new ChessBoard('board', 'config');

//var ruyLopez = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R';
//var board1 = ChessBoard('board1', ruyLopez);
//--- end example JS ---

}; // end init()

//$(document).ready(init);

window.onload = init
