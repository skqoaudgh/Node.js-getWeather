const express = require('express');
const request = require('request');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('index');
});

app.post('/', (req, res, next) => {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&units=imperial&appid=f39783cc83854e91534ae28ca26e6524`;
    let text = '';
    let error;
    request(url, function(err, result, body) {
        if(err) {
            text = 'Invalid City. try again!';
            error = true;
        }
        else {
            let weather = JSON.parse(body);
            if(weather.main == undefined) {
                text = 'Invalid City. try again!';
                error = true;
            }
            else {
                const temp = ((weather.main.temp - 32) * 5/9).toFixed(0);
                text = `${req.body.city}'s Current Temperature is ${temp}˚C`;
                error = false;
            }
        }
        res.render('index', {error: error,text: text});
    });
});

app.listen(3000, () => {
    console.log('express server is opened on port 3000');
})