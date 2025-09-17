// libraries
const express = require('express');
const path = require('path');
const fs = require('fs');
const fuse = require('fuse.js');
const homeRoutes = require('./app/routes/homeRoutes');
const steamJsonInit = require('./app/lib/steamJsonInit');

// app config
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));  // auto parse form data into object
app.use(express.json());  // automatically parse json request body into object

app.use('/', homeRoutes);

// on startup create games json 
steamJsonInit();

module.exports = app;

