var ready = require('domready'),
	React = require('react'),
	Battleship = require('./battleship-grid.jsx')

ready(function() {
	var node = document.getElementById('game-container');
	var myShip = [[3, 0], [3, 1], [3, 2], [3, 3], [1, 1], [2, 1], [4, 1], [5, 1], [2, 3], [4, 3]];
	var opponentShip = [[10, 2], [10, 3], [10, 4], [10, 5], [8, 3], [9, 3], [11, 3], [12, 3], [9, 5], [11, 5]];
	//var translatedOpponent = translate(opponentShip, 0, 5);
	var translatedMyShip = translate(myShip, -1, 13);
	var rotated = rotate(translatedMyShip, { x: 2, y: 13 });
	React.render(<Battleship myShips={translatedMyShip} opponentShips={opponentShip} size={16} />, node);
});

function rotate(grid, dp) {
	var angle = Math.PI;
	
	var rotate = grid.map(function(el) {
		var x = el[0] + dp.x;
		var y = el[1] + dp.y;
		
		var rotatedX = x*Math.cos(angle) - y*Math.sin(angle);
		var rotatedY = y*Math.cos(angle) + x*Math.sin(angle);
		
		var lastPX = x * rotatedX * (el[0] - dp.x);
		var lastPY = y * rotatedY * (el[1] - dp.y); 		
		
		return [lastPX, lastPY]
	});
	
	return rotate;
}

function translate(grid, dx, dy) {
	var rotate = grid.map(function(el) {
		var x = el[0];
		var y = el[1];
		
		var newX = x + (dx ? dx : 0);
		var newY = y + (dy ? dy : 0);
		return [newX, newY]
	});
	return rotate;
}