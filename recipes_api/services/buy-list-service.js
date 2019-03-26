"use strict";


const BuyList = require('../models/buy-list-model');
let buyListDBProvider = require("../providers/buy-list-provider");
let uuid =  require('uuid').v4;

module.exports = class BuyListService {

    constructor(db_provider = null) {
        this.db_provider = db_provider || new buyListDBProvider();
    }

    prefix() {
        return 'bl_';
    }

    async createBuyList(buy_list) {
        let method_name = 'BuyListService/createBuyList';
        try {
            buy_list.id = uuid();
            buy_list.create_at = new Date().getTime();
            return await this.db_provider.createBuyList(buy_list);
        } catch (err) {
        logger.error(`${method_name} - error Fails to create buy_list ${err}`);
        }

    }

    updateBuyList() {

    }

    deleteBuyList() {

    }

    getListBuyList(search_by, order_by, page_number, page_size, limit) {

    }

}


