//Main entry file
var express = require('express');
var app = express();

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


var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise",
    "Whenever possible, keep it simple"
];

app.get('/about', (req, res) => {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
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