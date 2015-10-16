var express = require('express'),
	bodyParser = require('body-parser'),
	exphbs  = require('express-handlebars');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
	return res.render('index', { title: "EPIC Battleship"})
});

var myShip1 = [[3, 0], [3, 1], [3, 2], [3, 3], [1, 1], [2, 1], [4, 1], [5, 1], [2, 3], [4, 3]];
var myShip2 = [[10, 11], [10, 10], [10, 9], [11, 10], [12, 12], [12, 11], [12, 10], [12, 9], [12, 8], [13, 10]];
var myShip3 = [[1, 15], [2, 15], [3, 15], [3, 16], [4, 15], [5, 15], [3, 14], [2, 13], [3, 13], [4, 13]];

app.get('/game', function(req, res) {		
	res.send({ myShips: [myShip1, myShip2, myShip3]});
});

app.post('/hit', function(req, res) {		
	var hitPoint = req.body;
	var isHit = battleshipHit([myShip1, myShip2], hitPoint.x, hitPoint.y);
	res.send({isHit: isHit});
});

app.listen(8080, function(err, res) {
	if (err) return console.error('Error: ' + err.toString());
	
	console.log('Battleserver started');
});

function battleshipHit(ships, x, y) {
	var result = false;
	for (var i = 0; i < ships.length; i++) {
		var shipDef = ships[i];
		var hits = shipDef.filter(function(el) {
			return el[0] === Number(x) && el[1] === Number(y);
		});
		result = hits.length > 0;
		if (result) break;				
	}
	
	return result;
}