'use strict';

const express = require('express')
const router = express.Router();
const BuyListService = require('../services/buy-list-service');
const BayList = require('../models/buy-list-model');

router.post('/', async (req, res) => {
    try {
        logger.info("recipe get ");
        let buy_list_service = new BuyListService();
        let buy_list = new BayList();
        buy_list.name = req.body.name;
        buy_list.description = req.body.description;
        buy_list.parent = req.body.parent || null;

        logger.silly(buy_list);
        let bay_list = await buy_list_service.createBuyList(buy_list);
        res.done(bay_list);
    } catch (err) {
        res.error(err);
    }
});

router.get('/:bay_list_id', async (req, res) => {
    try {
        logger.info("bay_list get ")
        let buy_list_service = new BuyListService();
        let recipe_id = req.params['recipe_id'];
        logger.info(recipe_id)
        let recipe = await buy_list_service.get_recipe_by_id(recipe_id);
        res.done(recipe);
    } catch (err) {
        res.ERROR(err);
    }
})

router.post('/:bay_list_id', async (req, res) => {
    try {
        console.log("bay-list update");
        let buy_list_service = new BuyListService();
        req.body.id = req.params['recipe_id'];
        console.log(req.body)
        let recipe = await buy_list_service.update_recipe(req.body);
        res.done(recipe);
    } catch (err) {
        res.ERROR(err);
    }
});

router.get('/', async (req, res) => {
    try {
        console.log("bay-list list get ");
        let buy_list_service = new BuyListService();
        let recipe_id = req.params['recipe_id'];
        console.log(recipe_id)
        let recipe = await buy_list_service.getListBuyList(recipe_id);
        res.done(recipe);
    } catch (err) {
        res.ERROR(err);
    }
});

router.delete('/:buy_list_id', async (req, res) => {
    try {
        console.log("recipe get ")
        let buy_list_service = new BuyListService();
        let buy_list_id = req.params['buy_list_id'];
        console.log(buy_list_id)
        let recipe = await buy_list_service.deleteBuyList(buy_list_id);
        res.done(recipe);
    } catch (err) {
        res.ERROR(err);
    }
});


router.post('/:buy_list_id/update-items', async (req, res) => {
    try {
        logger.info("recipe get ");
        let buy_list_service = new BuyListService();
        let recipe_id = req.params['recipe_id'];
        logger.info(recipe_id);
        let recipe = await buy_list_service.get_recipe_by_id(recipe_id);
        res.done(recipe);
    } catch (err) {
        res.ERROR(err);
    }
})


module.exports = router;