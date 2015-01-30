var vertx = require('vertx.js');
var console = require('vertx/console');

var server = vertx.createHttpServer();

var routeMatcher = new vertx.RouteMatcher();

routeMatcher.get('/helloworld', function(req) {
    req.response.end('Hello world');
});

routeMatcher.get('/parse', function(req) {
  var obj = {
        number : parseInt(Math.random() * 1000),
        str: "Hello parse",
        bl: true,
        db: 555.111
    };
	req.response.end(JSON.parse(JSON.stringify(obj)).str + ' ' + JSON.parse(JSON.stringify(obj)).number);
});

routeMatcher.get('/copyinput', function(req) {
	vertx.fileSystem.copy('input.txt', 'bar.dat', function(err) {
		if (!err) {
			console.log('Copy was successful');
		}
	});
	req.response.end('Copy was successful');
});

routeMatcher.get('/raw', function(req) {

	vertx.fileSystem.readFile('input.txt', function(err, res) {
		if (!err) {
			console.log('File contains: ' + res.length() + ' bytes');

			vertx.fileSystem.writeFile('./output.txt', res+'1234567890abcdefghijklmnopqrstuvwxyz', function (err) {
			if (err) throw err;
			
			console.log('filelistAsync complete');
			});
		}
	});

	req.response.end('OK');
});

server.requestHandler(routeMatcher).listen(9002, 'localhost');
