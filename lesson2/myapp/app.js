var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/html', function (req, res) {
    res.sendfile('public/html/1.html');
});

app.use(express.static('public'));

app.use(function (req, res, next) {
    //res.status(404).send('Sorry cant find that!');
    //res.status(404).sendfile('public/html/2.html');
    res.redirect('/html/2.html')
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});