const config = require('../config.json');
const Connection = require('../database/db');
const Question = require('../database/Question');
const Answer = require('../database/Answer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let HOST = config.HOST || 'localhost';
let PORT = config.PORT || 4321;

//Connect to database
Connection
    .authenticate()
    .then(() => {
        console.log('[+] Connected to database!');
    })
    .catch((err) => {
        console.log(err);
    })



app.set('view engine', 'ejs'); // Use EJS as a view engine
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes

//Root Directory
app.get('/', (req, res) => {
    Question.findAll({
        raw: true, order: [
            ['id', 'DESC'] //ORGANIZATION MODE - ID = column in table / DESC = Descending / ASC = Ascending
        ]
    }).then((question) => {
        res.render('home/index', {
            questions: question
        });
    })
});

//Question page
app.get('/question', (req, res) => {
    res.render('question');
})

app.post('/savequestion', (req, res) => {
    let title = req.body.title;
    let question = req.body.question;

    //Saves questions to the database
    Question.create({
        title: title,
        description: question
    }).then(() => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err)
    })
})

app.get('/question/:id', (req, res) => {
    let id = req.params.id;

    Question.findOne({
        where: {
            id: id
        }
    }).then((id) => {
        if (id != undefined) {
            Answer.findAll({
                raw: true,
                where: { questionId: id.id }
            }).then((answer) => {
                res.render('searchQuestion', {
                    questionId: id,
                    answer: answer
                });
            });
        } else {
            res.redirect('/');
        }

    });
});

app.post('/answer', (req, res) => {
    let body = req.body.body;
    let anwserId = req.body.questionId;

    Answer.create({
        body: body,
        questionId: anwserId
    }).then(() => {
        res.redirect(`/question/s?id=${anwserId}`);
    })
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`[+] Server Online in http://${HOST}:${PORT}`);
});

