const http = require('http'); // node app - в терминале для запуска сервера, npm install fs - скачать модуль
const fs = require('fs'); //Модуль файловой системы,нужен для работы с файлами возвращаемыми в браузер 
const path = require('path'); //Помощь в формировании корректного пути


const PORT = 3000; // указали порт по которому будем подключаться

const db = 'mongodb+srv://RP_RPG:tr123123@cluster0.skfdeqj.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(db)
    .then((res) => colsole.log('Connected to DB'))
    .catch((error) => colsole.log(error))

//Создали сервер, req - обьект запроса, res - обьект ответа. res - будет формировать и отправлять в браузер, req - будет брать url и на его основании отправлять данные или страницу
const server = http.createServer((req, res) => {                                                                             //url - уникальный адрес
//console.log('Server request');
//console.log('just for test');
//console.log(req.url, req.method);// инфа о запрашиваемом пути и методе
res.setHeader('Content-Type', 'text/html');// информация о возвращаемом типе контента, Content-Type - помогает браузеру определить какого типа данные ему были отправлены

const createPath = (page) => path.resolve(__dirname, 'cond',`${page}.html`);//const createPath = (page) => path.resolve(__dirname, 'site',`${page}.html`);

let basePath = '';

switch(req.url) {
    case '/':
        basePath = createPath('index');
        res.statusCode = 200;
        break;
    case '/about-us':
        res.statusCode = 301;
        res.setHeader('Location', '/index');
        res.end(); 
        break;
    case '/login':
        basePath = createPath('login');
        res.statusCode = 200;
        break;
    case '/otz':
        basePath = createPath('otz');
        res.statusCode = 200;
        break;
    case '/index':
        basePath = createPath('index');
        res.statusCode = 200;
        break;
    default:
        basePath = createPath('error');
        res.statusCode = 404;
        break;
}
    fs.readFile(basePath, (err, data) => {
        if(err) {
            console.log(err);
            res.statusCode = 500;
            res.end();//end - сигнал о том что ответ сформирован и готов для отправки в браузер 
        }
        else {
            res.write(data);
            res.end(); 
        }
      });
});
//прослушка сервера                         
            //Порт,  Имя хоста, обычный call-back - функция обратного вызова
server.listen(PORT, 'localhost', (error) => {
     //вывод инфы при возникновении ошибки  //вывод инфы о прослушиванемом порте
    error ? console.log(error) : console.log(`listening port ${PORT}`);
    
});



