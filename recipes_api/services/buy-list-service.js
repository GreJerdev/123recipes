"use strict";


const BuyList = require('../models/buy-list-model');
let buyListDBProvider = require("../providers/buy-list-provider");


module.exports = class BuyListService {

    constructor(db_provider = null) {
        this.db_provider = db_provider || new buyListDBProvider();
    }

    prefix() {
        return 'bl_';
    }

    async createBuyList(buy_list) {

        try {
            return await this.db_provider.createBuyList(buy_list);
        } catch (err) {

        }

    }

    updateBuyList() {

    }

    deleteBuyList() {

    }

    getListBuyList(search_by, order_by, page_number, page_size, limit) {

    }

}


