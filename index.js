const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { colours } = require('nodemon/lib/config/defaults');
const Photo = require('./models/photo.js');

const dbURI = 'mongodb+srv://kliszek:S7tvZp0CSZWPM9dB@webdev1.2a9fc.mongodb.net/WebDev1?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

//register ejs as the view engine
app.set('view engine', 'ejs');

//listen for request on port 3000


//static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//Main page
app.get('/', (req, res) => {
    Photo.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {page: "home", photoList: result});
        })
        .catch((err) => {
            console.log(err);
            res.render('index', {page: "home"});
        })
});

app.get('/about', (req, res) => {
    res.render('about', {page: "about"})
});

app.get('/contact', (req, res) => {
    res.render('contact', {page: "contact"})
});

app.get('/kupa', (req, res) => {
    res.send('KUPA KUPA');
});

app.get('/photo/add', (req, res) => {
    res.render('add', {page: "add"});
    // const testPhoto = new Photo({
    //     title: 'aaatytul',
    //     uri: 'jakis adres',
    //     description: 'costam',
    //     sdfaf: 'fsdfsa',
    //     author: 'sad',
    //     date: Date.now()
    // });

    // testPhoto.save()
    //     .then((result) => {
    //         //do something
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
});

app.post('/photo', (req, res) => {
    console.log(req.body);
    const newPhoto = new Photo(req.body);

    newPhoto.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        })
})

//404
app.use((req, res) => {
    res.render('404', {page:""});
});