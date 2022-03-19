const express = require('express');
const app = express();

//register ejs as the view engine
app.set('view engine', 'ejs');

//listen for request on port 3000
app.listen(3000);

//static files
app.use(express.static('public'));

//Main page
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/kupa', (req, res) => {
    res.send('KUPA KUPA');
})

//404
app.use((req,res) => {
    res.render('404');
});