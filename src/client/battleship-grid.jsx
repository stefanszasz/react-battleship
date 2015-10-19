const React = require('react'),
	classNames = require('classnames');
	
const GridCell = React.createClass({
	getInitialState() {
		return { isHit: false, cellText: '' }
	},
	onCellClick() {
		var coords = getCoordinatesFromCell(this.props['data-cell']);
		var text = coords.x + ',' + coords.y;
		this.setState({cellText: text});
		$.post('/hit', coords, (result) => {
			this.setState({isHit: result.isHit});
		});
	},
	render() {
		var highlightClass = classNames({my: this.props.myShip, opponent: this.props.opponentShip, hit: this.state.isHit});
		return <td onClick={this.onCellClick} className={highlightClass}>{this.state.cellText}</td>;
	}
});

const GridRow = React.createClass({	
	render() {
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

const BattleshipGrid = React.createClass({	
	render() {
		var rows = [];
		for (i = this.props.size; i >= 0; i--) {
			var rowIndex = "row-" + i;
			rows.push(<GridRow cells={this.props.size} key={i} index={i} myShips={this.props.myShips} opponentShips={this.props.opponentShips} />);
		}
		
		return <table><tbody>{rows}</tbody></table>
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