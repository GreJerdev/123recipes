'use strict';

const express = require('express'),
router = express.Router();
const recipe_service = require('../services/recipe-service')

router.get('/', async (req, res) => {
    console.log("recipe get ")
    let recipe_service_ = new recipe_service();
    let recipe = await recipe_service_.create_recipe('3243232')
    return Promise.resolve( res.send(recipe));

})
router.post('/', async (req, res) => res.send('Hello World from recipe'))
router.put('/', async (req, res) => res.send('Hello World from recipe'))
router.delete('/', async (req, res) => res.send('Hello World from recipe'))



module.exports = router;