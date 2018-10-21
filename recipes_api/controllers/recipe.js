'use strict';

const express = require('express'),
router = express.Router();
const RecipeService = require('../services/recipe-service')

router.post('/', async (req, res) => {
  try{
    console.log("recipe get ")
    let recipe_service = new RecipeService();
    let recipe = req.body;
    console.log(recipe)
    recipe = await recipe_service.create_recipe(recipe);
    res.send(recipe);
  }catch(err){
    res.send(err);
  }
})
router.post('/', async (req, res) => res.send('Hello World from recipe'))
router.put('/', async (req, res) => res.send('Hello World from recipe'))
router.delete('/', async (req, res) => res.send('Hello World from recipe'))



module.exports = router;