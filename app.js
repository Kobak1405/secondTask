// підключення пакетів
const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path');

const app = express();  // запуск експресу

app.use(express.json()); // надання можлтивості працювати з JSON
app.use(express.urlencoded({extended:true}));  // надання можливості працювати з посиланнями

app.use(express.static(path.join(__dirname, 'static')));  // створюємо посилання на папку static без прив'язки до ОС

const users = [];
const houses = [];

app.engine('.hbs', expHbs({   // вказання двигуна, який опрацьовуватиме запити.
    extname: '.hbs',
    defaultLayout: null  // вирішує трабли з папкою static 
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));

/**
 * Створення основних сторінок сайту за допомогою матеду get
 */
app.get('/', (req, res) => {  // метод get, який малює домашню сторінку
    res.render('index')
});

app.get('/register', (req, res) => {  // метод get, який малює сторінку реєстрації
    res.render('register')
});

app.get('/login', (req, res) => {   // сторінка авторизації
    res.render('login')
});

app.post('/auth', (req, res) => {   // стторінка автентифікації
    const {email, password} = req.body;

    const finishFind = users.find(user => user.email === email && user.password === password);

    res.json(finishFind);
});

app.get('/users', (req, res) => {
    res.json(users)
});

app.post('/addUser', (req, res) => {
    const user = req.body;

    user.user_id = users.length;
    users.push(user);
    res.redirect('/users')
});

app.get('/addHouse', (req, res) => {    // метод додавання дому
    res.render('addHouse')
});

app.get('/houses', (req, res) => {   // метод для пошуку дому
    res.json(houses)
});

app.post('/house', (req, res) => {
    const house = req.body;

    house.house_id = houses.length;
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

app.all('*', (req, res)  => {
    res.redirect('/not-found');
});

app.listen(5000, () => {
    console.log('Listen 5000')
});
