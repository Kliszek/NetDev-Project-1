const express = require('express');
const app = express();

//listen for request on port 3000
app.listen(3000);

//Main page
app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname } );
});

//404
app.use((req,res) => {
    res.sendFile('./views/404.html', { root: __dirname });
});