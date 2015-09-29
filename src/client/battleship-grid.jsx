var React = require('react'),
	classNames = require('classnames');
	
var GridCell = React.createClass({
	getInitialState: function() {
		return { isHit: false }
	},
	onCellClick: function() {
		var coords = getCoordinatesFromCell(this.props['data-cell']);
		$.post('/hit', coords, function(result) {
			this.setState({isHit: result.isHit});
		}.bind(this));
	},
	render: function() {
		var highlightClass = classNames({my: this.props.myShip, opponent: this.props.opponentShip, hit: this.state.isHit});
		return <td onClick={this.onCellClick} className={highlightClass}></td>;
	}
});

var GridRow = React.createClass({	
	render: function() {
		var elements = [];
		
		for (var col = 0; col < this.props.cells; col++) {
			var cellIndex = "cell-" + col + "," + this.props.index;
			var myShip = isPartOfShip(this.props.myShips, col, this.props.index);
			var opponentShip = isPartOfShip(this.props.opponentShips, col, this.props.index);			
			
			var cell = <GridCell key={cellIndex} myShip={myShip} opponentShip={opponentShip} isHit={false} data-cell={cellIndex} />;
			
			elements.push(cell);
		}
		
		return <tr>{elements}</tr>
	}
});

var BattleshipGrid = React.createClass({	
	render: function() {
		var rows = [];
		for (i = this.props.size; i >= 0; i--) {
			var rowIndex = "row-" + i;
			rows.push(<GridRow cells={this.props.size} key={i} index={i} myShips={this.props.myShips} opponentShips={this.props.opponentShips} />);
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

function isPartOfShip(allShips, col, row) {
	var ship = false;
	if (!allShips) return ship;
	
	for (var i = 0; i < allShips.length; i++) {
		var shipDefinition = allShips[i]; 
		for (var k = 0; k < shipDefinition.length; k++) {
			var myCoords = shipDefinition[k];
			if (!myCoords) continue;
			if (myCoords[0] === col && myCoords[1] === row) {
				ship = true;
				break;
			}
		}
	}	
	
	return ship;
}

module.exports = BattleshipGrid;