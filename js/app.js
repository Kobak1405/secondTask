const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'static')));

const users = [];
const houses = [];

app.engine('.hbs', expHbs({
    extname: '.hbs',
    defaultLayout: null
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/register', (req, res) => {
    res.render('register')
});

app.get('/users', (req, res) => {
    res.json(users)
});

app.post('/someone', (req, res) => {
    const user = req.body;

    user.user_id = users.length + 1;
    users.push(user);
    res.redirect('/users')
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/auth', (req, res) => {
    const {email, password} = req.body;

    const finded = users.find(user => user.email === email && user.password === password);

    res.json(finded)
});

app.get('/addHouse', (req, res) => {
    res.render('addHouse')
});

app.get('/houses', (req, res) => {
    res.json(houses)
});

app.post('/house', (req, res) => {
    const house = req.body;

    house.house_id = houses.length + 1;
    houses.push(house);
    res.redirect('/houses')
});

app.get('/houses/:house_id', (req, res) => {
    const {house_id} = req.params;

    const finded = houses.find(house => house.house_id === +house_id);

    res.json(finded)
});

app.get('/users/:user_id', (req, res) => {
    const {user_id} = req.params;

    const finded = users.find(user => user.user_id === +user_id);

    res.json(finded)
});

app.all("*", (req, res) => {
    res.render("not-found");
});

app.listen(3000, () => {
    console.log("Listen 3000");
});
