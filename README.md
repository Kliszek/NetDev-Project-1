# WebDev-Project-1 - Small photo browser
A project I realized to learn Node.js and some technologies connected with network development.

### What is it?
This web application is a service for uploading and browsing photos.
It has some basic functionalities:
* It allows the user to browse the recent photos and view their information such as description, author and the upload date
* The user can upload his own photos to the database
* It is possible to mark chosen photos as favourites and then filter them
* It is possible to edit information on photos that were already uploaded
* The site is **fully responsive**
* The site manages some basic exceptions like 404 and 500 errors.


### Technologies used

* Node.js with Express (GET, POST, PUT, DELETE requests)
* EJS (with partials)
* Frontend JavaScript (with fetch API)
* TailWindCSS
* MongoDB database with mongoose


### How to launch it

Before launching the project, make sure you have nodejs and npm installed on your computer.
Then, download the files and update all the nodejs packages, by running

    npm install

Then, run

    npm run build-css
    
to start a script that will build the CSS file from TailWindCSS template.

After this you can run the project, by running

    node ./index.js

or

    npx nodemon ./index.js

and you can access the website at localhost:3000.
