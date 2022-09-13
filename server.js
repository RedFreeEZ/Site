const express =require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');


const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;


const db = 'mongodb+srv://RP_RPG:tr123123@cluster0.skfdeqj.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, 'ejs-cond',`${page}.ejs`);//const createPath = (page) => path.resolve(__dirname, 'site',`${page}.html`);


//прослушка сервера                         
            //Порт,  Имя хоста, обычный call-back - функция обратного вызова
app.listen(PORT,  (error) => {
    //вывод инфы при возникновении ошибки  //вывод инфы о прослушиванемом порте
   error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content=length] - response-time ms'));

app.use(express.urlencoded({ extended: false }));
//app.use(express.static('image'));
app.use(express.static('styles'));


app.get('/', (req, res) => {
    const title = 'home';
    res.render(createPath('index'), { title });
});

app.get('/login', (req, res) => {
    const title = 'login';
    res.render(createPath('login'), { title });
});

app.post('/otz', (req, res) => {
   const { title, text } = req.body;
   const post = new Post({title, text})
    post
        .save()
        .then((result) => res.send(result)) 
        .catch((error) => {
          console.log(error);
          res.render(createPath('error'), { title: 'Error'})  
        })
  
});
app.get('/otz', (req, res) => {
    const title = 'otz';
    res.render(createPath('otz'), { title });
});

app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    const post = {
        id: '1',
        text:'Обновлена продукция',
        title:'Название заголовка',
        date:'04.09.2022',
        author:'Guliver',
    };
    res.render(createPath('post'), { title, post});
});

app.get('/posts', (req, res) => {
    const title = 'posts';
    const posts = [
       {
        id: '1',
        text:'Обновлена продукция',
        title:'Название заголовка',
        date:'04.09.2022',
        author:'Guliver',
       }
    ];
    res.render(createPath('posts'), { title, posts });
});

app.get('/about-us', (req, res) => {
    res.redirect(createPath('otz'), { title });
});

app.use((req, res) => {
    const title = 'ERROR';
    res
        .status(404)
        .render(createPath('error'), { title });
});