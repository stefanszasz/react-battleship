var ready = require('domready'),
	React = require('react'),
	ReactDom = require('react-dom'),
	Battleship = require('./battleship-grid.jsx')

ready(function() {
	var node = document.getElementById('game-container');	
	$.get('/game', function(data) {
		var translated = translate(data.myShips, 0, 0);
		var rotated = rotate(translated, { x: 3, y: 1 });
		//var rotatedTranslated = translate(rotated, 6, 2);
		ReactDom.render(<Battleship myShips={translated} size={16} />, node);
	});
});

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function rotate(grid, dp) {
	var angle = toRadians(90);
	return grid.map(g => {
		var rotated = g.map(el => {
			var x = el[0] - dp.x;
			var y = el[1] - dp.y;
			
			var rotatedX = x*Math.floor(Math.cos(angle)) - y*Math.floor(Math.sin(angle));
			var rotatedY = y*Math.floor(Math.sin(angle)) + x*Math.floor(Math.cos(angle));
			
			var lastPX = rotatedX + dp.x
			var lastPY = rotatedY + dp.y	
			
			return [lastPX, lastPY]
		});
		return rotated;	
	});	
}

function translate(grid, dx, dy) {
	return grid.map(g => {
		var moved = g.map(el => {
			var x = el[0];
			var y = el[1];
			
			var newX = x + (dx ? dx : 0);
			var newY = y + (dy ? dy : 0);
			return [newX, newY]
			});
		return moved;
	});
}