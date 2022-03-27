const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { colours } = require('nodemon/lib/config/defaults');
const Photo = require('./models/photo.js');

const dbURI = 'mongodb+srv://kliszek:S7tvZp0CSZWPM9dB@webdev1.2a9fc.mongodb.net/WebDev1?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => {
        console.log(err);
        console.log("FAILED TO CONNECT WITH THE DATABASE!");
        app.listen(3000);
    })

//register ejs as the view engine
app.set('view engine', 'ejs');

//listen for request on port 3000


//static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/recent');
})

//Main page
app.get('/recent', (req, res) => {

    if(mongoose.connection.readyState != 1){
        console.log("Displaying empty browse page, because connection with the database could not be estabilished!");
        res.render('browse', {page: "home"});
        return;
    }

    Photo.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('browse', {page: "home", photoList: result});
    })
    .catch((err) => {
        console.log(err);
        res.render('browse', {page: "home"});
    })

});

app.get('/about', (req, res) => {
    res.render('about', {page: "about"})
});

app.get('/contact', (req, res) => {
    res.render('contact', {page: "contact"})
});

app.get('/photo/add', (req, res) => {
    res.render('add', {page: "add"});
});

app.get('/photo/:id', (req, res) => {
    const id = req.params.id;
    
    if(mongoose.connection.readyState != 1){
        console.log("ERROR: Cannot display photo details, because connection with the database could not be estabilished!");
        res.render('500', {page: ""});
        return;
    }

    Photo.findById(id)
        .then((result) => {
            res.render('details', {page: "", photo: result});
        })
        .catch((err) => {
            if(req.headers['sec-fetch-dest'] == 'image')
            {
                console.log("ERROR: There was a GET request for an image from the server");
            }

            res.status(404).render('404', {page: ""});
        })
})

app.delete('/photo/:id', (req, res) => {
    const id = req.params.id;

    if(mongoose.connection.readyState != 1){
        console.log("ERROR: Cannot delete, because connection with the database could not be estabilished!");
        res.json({ redirect: `/photo/${id}` });
    }

    console.log("Removing a photo from the database...");
    Photo.findByIdAndDelete(id)
        .then((result) => {
            console.log(result);
            res.json({ redirect: '/' });
        })
        .catch((err) => {
            console.log("ERROR:\n\n");
            console.log(err);
        })
})

app.put('/photo/:id', (req, res) => {
    const id = req.params.id;

    if(mongoose.connection.readyState != 1){
        console.log("ERROR: Cannot update the photo, because connection with the database could not be estabilished!");
        res.json({ redirect: `/photo/${id}` });
        return;
    }

    console.log("Updating a photo...");
    console.log(req.body);
    
    Photo.findByIdAndUpdate(id, req.body)
        .then((result) => {
            console.log("Photo updated:");
            console.log(result);
            res.json({ redirect: `/photo/${id}` });
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/photo/:id/editOld', (req, res) => {
    const id = req.params.id;
    Photo.findById(id)
        .then((result) => {
            res.render('edit', {page: "", photo: result});
        })
        .catch((err) => {
            if(req.headers['sec-fetch-dest'] == 'image')
            {
                console.log("ERROR: There was a GET request for an image from the server");
            }

            res.status(404).render('404', {page: ""});
        })
})

app.post('/photo', (req, res) => {
    console.log("Adding a new photo to the database...");
    console.log(req.body);

    if(mongoose.connection.readyState != 1){
        console.log("ERROR: Cannot save the photo, because connection with the database could not be estabilished!");
        res.status(500).render('500', { page:"" });
        return;
    }
    
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
    res.status(404).render('404', {page: ""});
});