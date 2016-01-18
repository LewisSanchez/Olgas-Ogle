var board,
  game = new Chess();

var removeGreySquares = function() {
  $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
  var squareEl = $('#board .square-' + square);
  
  var background = '#a9a9a9';
  if (squareEl.hasClass('black-3c85d') === true) {
    background = '#696969';
  }

  squareEl.css('background', background);
};

var onDragStart = function(source, piece) {
  // do not pick up pieces if the game is over
  // or if it's not that side's turn
  if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

var onDrop = function(source, target) {
  removeGreySquares();

  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';
};

var onMouseoverSquare = function(square, piece) {
  // get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  // highlight the square they moused over
  greySquare(square);

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

var onMouseoutSquare = function(square, piece) {
  removeGreySquares();
};

var onSnapEnd = function() {
  board.position(game.fen());
};

// Highlight legal moves end

// Beginning of notation code

// Move number
i = 0;
move_number = i;

// onChange gets called twice when a player castles
// this bool should take care of a hack that will only have printNotation get called once
var castled = false;

// PGN of chess game
var move_history = game.history();

var print_notation = function(){

	  // PGN of chess game
	  move_history = game.history();
	  
	  // Get move
	  var move = move_history[i];
	  
	  // Check if castle
	  if(move === 'O-O')
	  {
		//Toggle castle
		castled = !castled;
	  }
	  
	  // Make sure we do not print notation again if there the player castled
	  if(castled === false)
	  {
		// Check if white to move, if so...do not print move number
		if(i % 2 === 0)
			document.getElementById("pgn").innerHTML += (move_number + 1) + move + " ";
		else{
			document.getElementById("pgn").innerHTML += move + " ";
			move_number++;
			}
		
		// Increment ply
		i++;
	  
	  }
};

/* var erase_notation = function(){
	  // PGN of chess game
	  move_history = game.history();
	  
	  // Remove last move
	  move_history.pop();
	  
	  while(move_history.length > 0)
	  {
		var move = move_history.shift();
	  
		if(i % 2 === 0)
			document.getElementById("pgn").innerHTML += (move_number + 1) + move + " ";
		else{
			document.getElementById("pgn").innerHTML += move + " ";
		}
	  }
	  
	  // Check if white to move, if so...do not print move number
	  if(i % 2 === 0)
		document.getElementById("pgn").innerHTML -= (move_number + 1) + move + " ";
	  else{
		document.getElementById("pgn").innerHTML -= move + " ";
		move_number--;
		}
		
	  // Decrement ply
	  i--;
}; */

var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd,
  orientation: 'white',
  showNotation: true,
  onChange: print_notation
};

var boardOscillateGreen = function(){
   document.getElementById("board_container").style.color = "red";
};

traversing = false;

var back = function(){

// Change onChange event because we do not want notation to print
	cfg.onChange = bold_move;
	
	// If the current move is greater than or equal to zero
	// player should be able to traverse backwards
	if(i > 0)
	{
	// Undo position in the game
		game.undo();
		
	// Decrement number of ply
		i--;
	
	// Set board position to new position of the game
		board.position(game.fen());
	}
	
	cfg.onChange = print_notation;
};

var forward = function(){

// Change onChange event because we do not want notation to print
cfg.onChange = bold_move;

// If current move is less than the game history minus one
	if(i < (game.history().length + 1))
	{
		// Increment the move number
		i++;
  
		// Make move in game
		game.move(move_history[i-1]);
  
		// Set position equal to game
		board.position(game.fen());
	}
	
// Allow printing of notation	
cfg.onChange = print_notation;
	
};

var bold_move = function(){
	// Do nothing for now
};

/*  cg_pgn = ['[Event "Rilton Cup"]',
		  '[Site "Stockholm SWE"]',
		  '[Date "2014.01.04"]',
		  '[EventDate "2013.12.27"]',
		  '[Round "8.1"]',
		  '[Result "1-0"]',
		  '[White "Jon Ludvig Hammer"]',
		  '[Black "Michal Krasenkow"]',
		  '[ECO "A07"]',
		  '[WhiteElo "?"]',
		  '[BlackElo "?"]',
		  '[PlyCount "103"]',

'1. Nf3 d5 2. g3 g6 3. c4 dxc4 4. Na3 Bg7 5. Nxc4 Nc6 6. Bg2 e5',
'7. d3 Nge7 8. O-O O-O 9. Bd2 Re8 10. b4 a6 11. Rc1 Nd5 12. a3',
'Nd4 13. e4 Bg4 14. h3 Bxf3 15. Bxf3 Ne7 16. Na5 b6 17. Nb3',
'Nec6 18. Be3 Re7 19. Nxd4 Nxd4 20. Bxd4 Qxd4 21. Rc4 Qd7',
'22. Kg2 h5 23. Qc2 a5 24. Rc1 axb4 25. axb4 Ra7 26. Rc6 Bh6',
'27. Rd1 Re6 28. Rxe6 Qxe6 29. d4 Ra2 30. Qc3 exd4 31. Rxd4 Bg7',
'32. Rd8+ Kh7 33. Qxc7 Be5 34. Qb7 Bxg3 35. Kxg3 Qe5+ 36. Kg2',
'Qg5+ 37. Kf1 Qf4 38. Be2 Ra1+ 39. Rd1 Ra3 40. Qd7 Ra2 41. Qd3',
'Qh2 42. Qf3 Kh6 43. Rd7 Ra3 44. Rd3 Ra1+ 45. Bd1 Rb1 46. Rd7',
'b5 47. Qe3+ Kg7 48. Qd4+ Kh6 49. Qh8+ Kg5 50. Rd5+ f5',
'51. Rxf5+ gxf5 52. Qg7+ 1-0']; */
 
//game.load_pgn(cg_pgn.join('\n'));
 
//game.fen();

// Create chessboard
board = ChessBoard('board', cfg);

// Set chessboard to correct position
//board.position(game.fen());
 
document.getElementById("pgn").innerHTML += game.pgn({ max_width: 5, newline_char: '<br />' });;

$('#backBtn').on('click', back);
$('#forwardBtn').on('click', forward);
$('#flipOrientationBtn').on('click', board.flip);
$('#puzzleSolvedBtn').on('click', boardOscillateGreen);