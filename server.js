const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('express server is opened on port 3000');
})