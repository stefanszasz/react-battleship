var ready = require('domready'),
	React = require('react'),
	Battleship = require('./battleship-grid.jsx')

ready(function() {
	var node = document.getElementById('game-container');	
	$.get('/game', function(data) {
		React.render(<Battleship myShips={data.myShips} size={16} />, node);
	});
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