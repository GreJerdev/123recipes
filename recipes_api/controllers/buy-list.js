'use strict';

const express = require('express');
const router = express.Router();
const BuyListService = require('../services/buy-list-service');
const BayList = require('../models/buy-list-model');

router.post('/', async (req, res) => {
    try {
        const method_name = 'buy-list/create';
        logger.info(`${method_name} - start`);
        let buy_list_service = new BuyListService();
        let buy_list = new BayList();
        buy_list.name = req.body.name;
        buy_list.description = req.body.description;
        buy_list.parent = req.body.parent || null;

        logger.silly(buy_list);
        let bay_list = await buy_list_service.createBuyList(buy_list);
        logger.info(`${method_name} - end`);
        res.done(bay_list);
    } catch (err) {
        logger.error(`${method_name} - error - ${err}`);
        res.error(err);
    }
});

router.get('/:bay_list_id', async (req, res) => {
    try {
        const method_name = 'buy-list/getById';
        logger.info(`${method_name} - start`);
        let buy_list_service = new BuyListService();
        let recipe_id = req.params['recipe_id'];
        logger.info(recipe_id);
        let recipe = await buy_list_service.getById(recipe_id);
        logger.info(`${method_name} - end`);

        res.done(recipe);
    } catch (err) {
        logger.error(`${method_name} - error - ${err}`);
        res.error(err);
    }
});

router.post('/:bay_list_id', async (req, res) => {
    const method_name = 'buy-list/update';
    logger.info(`${method_name} - start`);
    try {
        console.log("bay-list update");
        let buy_list_service = new BuyListService();
        logger.verbose(`${method_name} - request body req.body`);
        let recipe = await buy_list_service.updateBuyList(req.body);
        logger.info(`${method_name} - end`);
        res.done(recipe);
    } catch (err) {
        logger.error(`${method_name} - error - ${err}`);
        res.error(err);
    }
});

router.get('/', async (req, res) => {
    const method_name = 'buy-list/getPage';
    logger.info(`${method_name} - start`);
    try {
        console.log("bay-list list get ");
        let buy_list_service = new BuyListService();
        let search_by = req.query['search'];
        let order_by = req.query['order'];
        let page_number = Number(req.query['page_number']);
        let page_size = Number(req.query['page_size']);
        let buy_lists = await buy_list_service.getListBuyList(search_by, order_by, page_number, page_size);
        logger.info(`${method_name} - end`);
        res.done(BayList.parseList(buy_lists));
    } catch (err) {
        logger.error(`${method_name} - error - ${err}`);
        res.error(err);
    }
});

router.delete('/:buy_list_id', async (req, res) => {
    const method_name = 'buy-list/delete';
    logger.info(`${method_name} - start`);
    try {
        console.log("recipe get ");
        let buy_list_service = new BuyListService();
        let buy_list_id = req.params['buy_list_id'];
        console.log(buy_list_id);
        let recipe = await buy_list_service.deleteBuyList(buy_list_id);
        res.done(BuyList.parseList(recipe));
    } catch (err) {
        logger.error(`${method_name} - error - ${err}`);
        res.error(err);
    }
});


router.post('/:buy_list_id/items', async (req, res) => {
    try {
        logger.info("recipe get ");
        let buy_list_service = new BuyListService();
        let recipe_id = req.params['recipe_id'];
        logger.info(recipe_id);
        //   let recipe = await buy_list_service.(recipe_id);
        res.done(recipe);
    } catch (err) {
        logger.error(`${method_name} - error - ${err}`);
        res.error(err);
    }
});


module.exports = router;