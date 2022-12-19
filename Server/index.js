const config = require('../config.json');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let HOST = config.HOST || 'localhost';
let PORT = config.PORT || 4321;

app.set('view engine', 'ejs'); // Utilizar EJS como view Engine
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('home/index');
});

app.get('/question', (req, res) => {
    res.render('question');
})

app.post('/savequestion', (req, res) => {
    let title = req.body.title;
    let quest = req.body.question;

    res.send(`${title}:${quest}`);
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`[+] Server Online in http://${HOST}:${PORT}`);
});

