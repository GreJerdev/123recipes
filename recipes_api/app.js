'use strict';

const express = require('express')
const app = express()
const recipe = require('./controllers/recipe')
const authentication = require('./controllers/authentication')
const path = require("path")

console.log(__dirname);
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/recipe', recipe);
app.use('/authentication', authentication);
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000);
