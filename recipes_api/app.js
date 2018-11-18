'use strict';

const config = require( "./configuration/config");
const db = require("./providers/database/mysql_provider")
const path = require("path")
const express = require('express')
const app = express();
const authentication = require('./controllers/authentication')
require("./utilities/logger");

const ingredient = require('./controllers/ingredient');
const shop_list = require('./controllers/shop_list')
const ingredient_list = require('./controllers/ingredient_list')
const instruction = require('./controllers/instruction')
const media = require('./controllers/media')
const recipe_steps = require('./controllers/recipe_steps')
const recipe = require('./controllers/recipe')
const myLogger = require('./middlewares/middleware');
const set_response_methods = require('./middlewares/set-response-methods');
const bodyParser = require('body-parser');



app.use(myLogger);
app.use(set_response_methods);
app.use(bodyParser.json())
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/api/v1/authentication', authentication);
app.use('/api/v1/ingredient',ingredient);
app.use('/api/v1/shop-list',shop_list)
app.use('/api/v1/ingredient-list',ingredient_list)
app.use('/api/v1/instruction',instruction)
app.use('/api/v1/media',media)
app.use('/api/v1/recipe-steps',recipe_steps)
app.use('/api/v1/recipe',recipe)
app.get('/', (req, res) => res.send('Hello World!'));


/*
logger.error("error",{"message":"it's an error !!!"});
logger.warn("warn");
logger.info("info");
logger.info("info");
logger.info("info");
logger.verbose("verbose");
logger.debug("debug");
logger.silly("silly");
*/

app.listen(3000);
console.log("port 3000, server started")