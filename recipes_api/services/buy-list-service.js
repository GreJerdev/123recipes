"use strict";


const BuyList = require('../models/buy-list-model');
let buyListDBProvider = require("../providers/buy-list-provider");
let uuid = require('uuid').v4;

module.exports = class BuyListService {

    constructor(db_provider = null) {
        this.db_provider = db_provider || new buyListDBProvider();
    }

    async createBuyList(buy_list) {
        let method_name = 'BuyListService/createBuyList';
        logger.info(`${method_name} - start`);
        try {
            logger.verbose(`${method_name} - parameter - buy_list - ${buy_list}`);
            buy_list.id = uuid();
            buy_list.create_at = new Date().getTime();
            logger.verbose(`${method_name} - parameter - buy_list - ${buy_list}`);
            logger.verbose(`${method_name} - calling buyListDBProvider/createBuyList`);
            buy_list = await this.db_provider.createBuyList(buy_list);
            logger.info(`${method_name} - end`);
            return Promise.resolve(buy_list);
        } catch (err) {
            logger.error(`${method_name} - error Fails to create buy_list ${err}`);
            return Promise.reject(err);
        }
    }

    async updateBuyList(buy_list) {
        let method_name = 'BuyListService/updateBuyList';
        logger.info(`${method_name} - start`);
        try {
            logger.verbose(`${method_name} - parameter - buy_list - ${buy_list}`);
            logger.verbose(`${method_name} - calling buyListDBProvider/createBuyList`);
            let buy_list_updated = await this.db_provider.updateBuyList(buy_list);
            logger.info(`${method_name} - end`);
            return Promise.resolve(buy_list_updated);
        } catch (err) {
            logger.error(`${method_name} - error Fails to create buy_list ${err}`);
            return Promise.reject(err);
        }
    }

    async getById(buy_list_id) {
        let method_name = 'BuyListService/getById';
        logger.info(`${method_name} - start`);
        try {
            logger.verbose(`${method_name} - parameter - buy_list_id - ${buy_list_id}`);
            logger.verbose(`${method_name} - calling buyListDBProvider/getBuyListById`);
            let buy_list = await this.db_provider.getBuyListById(buy_list_id);
            logger.info(`${method_name} - end`);
            return buy_list;
        } catch (err) {
            logger.error(`${method_name} - error Fails to create buy_list ${err}`);
            return Promise.reject(err);
        }
    }

    async deleteBuyList() {
        let method_name = 'BuyListService/deleteBuyList';
        logger.info(`${method_name} - start`);
        try {
            logger.verbose(`${method_name} - parameter - buy_list_id - ${buy_list_id}`);
            logger.verbose(`${method_name} - calling buyListDBProvider/deleteBuyList`);
            let buy_list = await this.db_provider.deleteBuyList(buy_list_id);
            logger.info(`${method_name} - end`);
            return buy_list;
        } catch (err) {
            logger.error(`${method_name} - error Fails to create buy_list ${err}`);
            return Promise.reject(err);
        }
    }

    async getListBuyList(search_by, order_by, page_number, page_size) {
        let method_name = 'BuyListService/createBuyList';
        logger.info(`${method_name} - start`);
        try {
            //logger.verbose(`${method_name} - parameter - buy_list - ${search_by, order_by, page_number, page_size}`);
            logger.verbose(`${method_name} - calling buyListDBProvider/getListOfBuyList`);
            let buy_lists = await this.db_provider.getListOfBuyList(search_by, order_by, page_number, page_size);

            logger.info(`${method_name} - end`);
            return Promise.resolve(buy_lists);
        } catch (err) {
            logger.error(`${method_name} - error Fails to create buy_list ${err}`);
            return Promise.reject(err);
        }
    }

};


