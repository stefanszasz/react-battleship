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
var myShip2 = [[10, 2], [10, 3], [10, 4], [10, 5], [8, 3], [9, 3], [11, 3], [12, 3], [9, 5], [11, 5]];

app.get('/game', function(req, res) {		
	res.send({ myShips: [myShip1, myShip2]});
});

app.post('/hit', function(req, res) {		
	var hitPoint = req.body;
	var isHit = battleshipHit(myShip2, hitPoint.x, hitPoint.y);
	res.send({isHit: isHit});
});

app.listen(8080, function(err, res) {
	if (err) return console.error('Error: ' + err.toString());
	
	console.log('Battleserver started');
});

function battleshipHit(shipDef, x, y) {
	var hits = shipDef.filter(function(el) {
		return el[0] === Number(x) && el[1] === Number(y);
	});
	return hits.length > 0;
}