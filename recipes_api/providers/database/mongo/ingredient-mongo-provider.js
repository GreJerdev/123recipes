"use strict";

let db = require('../mongodb_provider')();
let Ingredient = require("../../../models/ingredient-model");

module.exports = class IngredientProvider {

    constructor() {

    }

   async createIngredient(id, name, measuring_unit, measuring_size, price, price_currency_iso3, conn = null) {
        let log_path = 'IngredientProvider/createIngredient -';
        try {
             return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

   async  updateIngredient(id, name, measuring_unit, measuring_size, price, price_currency_iso3,  conn = null) {
        let log_path = 'IngredientProvider/updateIngredient -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async deleteIngredient(id) {
        let log_path = 'IngredientProvider/deleteIngredient -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getListIngredient(search_by, order_by, page_number, page_size, limit) {
        let log_path = 'IngredientProvider/getListIngredient -';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

}


