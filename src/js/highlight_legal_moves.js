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

// Beginning of notation code

// Move number
i = 0;
move_number = i;

var print_notation = function(){	  
	  // PGN of chess game
	  move_history = game.history();
	  
	  // Get move
	  var move = move_history[i];
	  
	  // Check if white to move, if so...do not print move number
	  if(i % 2 === 0)
		document.getElementById("pgn").innerHTML += (move_number + 1) + move + " ";
	  else{
		document.getElementById("pgn").innerHTML += move + " ";
		move_number++;
		}
		
	  // Increment ply
	  i++;
};

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

board = ChessBoard('board', cfg);
$('#flipOrientationBtn').on('click', board.flip);
$('#puzzleSolvedBtn').on('click', boardOscillateGreen);
$('#notationBtn').on('click', print_notation);
$('#board').on('change', print_notation);
