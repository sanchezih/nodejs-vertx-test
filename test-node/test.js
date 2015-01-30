var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
var port = process.env.OPENSHIFT_NODEJS_PORT || 9001;

var router = express.Router();

router.get('/helloworld', function (req, res) {
    res.send('Hello world');
});

router.get('/parse', function (req, res) {
    var obj = {
        number : parseInt(Math.random() * 1000),
        str: "Hello parse",
        bl: true,
        db: 555.111
    };
	res.send(JSON.parse(JSON.stringify(obj)).str + ' ' + JSON.parse(JSON.stringify(obj)).number);

});

router.get('/raw', function (req, res) {

	var fs = require('fs');

	fs.readFile('./input.txt', 'utf-8', function(err, data){
		if (err) throw err;

		fs.writeFile('./output.txt', data+'1234567890abcdefghijklmnopqrstuvwxyz', 'utf-8', function (err) {
			if (err) throw err;
			console.log('filelistAsync complete');
		});
	});
	res.send('OK');
});

app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

// START THE SERVER
// =============================================================================
app.listen(port, ipaddress, function () {
    console.log((new Date()) + ' Server is listening on port ' + port);
});
