//Main entry file
var express = require('express');
var app = express();
var fortune = require('./lib/fortune');

//set up handlebars view engine
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//static content
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', {fortune: fortune.getFortune()});
});

//404 page
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

//505 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('404');
});

app.listen(app.get('port'), () => {
    console.log(`Express started on localhost:${app.get('port')}, Press ctrl + c to terminate`);
});