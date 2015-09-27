var ready = require('domready'),
	React = require('react'),
	Battleship = require('./battleship-grid.jsx')

ready(function() {
	var node = document.getElementById('game-container');
	var myShips = [[3, 0], [3, 1], [3, 2], [3, 3], [1, 1], [2, 1], [4, 1], [5, 1], [2, 3], [4, 3]];
	var opponentShips = [[10, 2], [10, 3], [10, 4], [10, 5], [8, 3], [9, 3], [11, 3], [12, 3], [9, 5], [11, 5]];
	var rotated = rotate(opponentShips);
	React.render(<Battleship myShips={myShips} opponentShips={opponentShips} size={14} />, node);
});

function rotate(grid) {
	var newGrid = [];
	
	var rotate = grid.map(function(el) {
		var x = el[0];
		var y = el[1];
		
		return [Math.ceil(x*Math.cos(45) - y*Math.sin(45)), Math.ceil(y*Math.cos(45) + x*Math.sin(45))]
	});
	
	return rotate;
}