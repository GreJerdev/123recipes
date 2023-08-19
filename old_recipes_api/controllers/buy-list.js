'use strict';

const express = require('express');
const router = express.Router();
const BuyListService = require('../services/buy-list-service');
const BayList = require('../models/buy-list-model');

const buy_list_service =  new BuyListService();

router.post('/', async (req, res) => {
    const method_name = 'buy-list/create';
    try {
        logger.info(`${method_name} - start`);
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
        return res.error(err);
    }
});

router.get('/:bay_list_id', async (req, res) => {
    const method_name = 'buy-list/getById';
    try {
        logger.info(`${method_name} - start`);

        let id = req.params['bay_list_id'];
        logger.info(id);
        let recipe = await buy_list_service.getById(id);
        logger.info(`${method_name} - end`);

        res.done(recipe);
    } catch (err) {
        logger.error(`${method_name} - error - ${err}`);
        return res.error(err);
    }
});

router.post('/:bay_list_id', async (req, res) => {
    const method_name = 'buy-list/update';
    logger.info(`${method_name} - start`);
    try {
        let id = req.params['bay_list_id'];

        logger.verbose(`${method_name} - request body req.body`);
        let values = {... req.body, ...{"id": id}};
        let bay_list = await buy_list_service.updateBuyList(values);
        logger.info(`${method_name} - end`);
        res.done(bay_list);
    } catch (err) {
        logger.error(`${method_name} - error - ${err}`);
        return res.error(err);
    }
});

router.get('/', async (req, res) => {
    const method_name = 'buy-list/getPage';
    logger.info(`${method_name} - start`);
    try {
        console.log("bay-list list get ");

        let search_by = req.query['search'];
        let order_by = req.query['order'];
        let page_number = Number(req.query['page_number']);
        let page_size = Number(req.query['page_size']);
        let buy_lists = await buy_list_service.getListBuyList(search_by, order_by, page_number, page_size);
        logger.info(`${method_name} - end`);
        res.done(BayList.parseList(buy_lists));
    } catch (err) {
        logger.error(`${method_name} - error - ${err}`);
        return res.error(err);
    }
});

router.delete('/:buy_list_id', async (req, res) => {
    const method_name = 'buy-list/delete';
    logger.info(`${method_name} - start`);
    try {

        let buy_list_id = req.params['buy_list_id'];
        await buy_list_service.deleteBuyList(buy_list_id);
        res.done(true);
    } catch (err) {
        logger.error(`${method_name} - error - ${err}`);
        return res.error(err);
    }
});


router.post('/:buy_list_id/items', async (req, res) => {
    const method_name = 'buy-list/buy_list_id/items';
    try {
        logger.info("recipe get ");

        let recipe_id = req.params['recipe_id'];
        logger.info(recipe_id);
        const items = req.body;
        let buy_list = await buy_list_service.addItems(buy_list_id,items);
        res.done(buy_list);
    } catch (err) {
        logger.error(`${method_name} - error - ${err}`);
        return res.error(err);
    }
});

router.post('/:buy_list_id/item', async (req, res) => {
    const method_name = 'buy-list/buy_list_id/items';
    try {
        logger.info(`${method_name} - items - ${items}`);

        let buy_list_id = req.params['buy_list_id'];
        logger.info(recipe_id);
        const item = req.body;
        let buy_list = await buy_list_service.addItems(buy_list_id,[item]);
        res.done(buy_list);
    } catch (err) {
        logger.error(`${method_name} - error - ${err}`);
        return res.error(err);
    }
});
module.exports = router;