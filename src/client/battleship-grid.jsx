var React = require('react'),
	classNames = require('classnames');

var GridRow = React.createClass({
	onCellClick: function(data) {
		var coords = getCoordinatesFromCell(data);
		this.props.onCellClick(coords);
	},
	render: function() {
		var elements = [];
		
		for (var col = 0; col < this.props.cells; col++) {
			var cellIndex = "cell-" + col + "," + this.props.index;
			var myShip = isPartOfShip(this.props.myShips, col, this.props.index);
			var opponentShip = isPartOfShip(this.props.opponentShips, col, this.props.index);
			
			var highlightClass = classNames({my: myShip, opponent: opponentShip});
			var cell = <td key={cellIndex} onClick={this.onCellClick.bind(null, cellIndex)} className={highlightClass}></td>;
			elements.push(cell);
		}
		
		return <tr>{elements}</tr>
	}
});

var BattleshipGrid = React.createClass({
	onCellClick: function(data) {
		console.log('clicked on' + data);
	},
	render: function() {
		var rows = []; 
		for (i = 0; i < this.props.size; i++) {
			var rowIndex = "row-" + i;
			rows.push(<GridRow cells={this.props.size} key={i} index={i} onCellClick={this.onCellClick} myShips={this.props.myShips} opponentShips={this.props.opponentShips} />);
		}
		
		return <table>{rows}</table>
	}
});

function getCoordinatesFromCell(cell) {
	var position = cell.substring(5).split(',');
	var x = Number(position[0]);
	var y = Number(position[1]);
	return { x, y };
}

function isPartOfShip(shipDefinition, col, row) {
	var ship = false;
	for (var k = 0; k < shipDefinition.length; k++) {
		var myCoords = shipDefinition[k];
		if (!myCoords) continue;
		if (myCoords[0] === col && myCoords[1] === row) {
			ship = true;
			break;
		}
	}
	
	return ship;
}

module.exports = BattleshipGrid;