"use strict";

let db = require('../mongodb_provider')();
let IngredientList = require("../../../models/ingredient-list-model");

module.exports = class IngredientListProvider{

    constructor(){

    }

    async createIngredientList(ingredient_list ,conn = null){
        let log_path = 'IngredientListProvider/createIngredientList - start';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async updateIngredientList(ingredient_list ,conn = null){
        let log_path = 'IngredientListProvider/updateIngredientList - start';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async deleteIngredientList(ingredient_list_id ,conn = null){
        let log_path = 'IngredientListProvider/deleteIngredientList - start';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getListIngredientList(search_by, order_by, page_number, page_size, limit, conn = null){
        let log_path = 'IngredientListProvider/getListIngredientList - start';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getIngredientList(ingredient_list_id,conn = null){
        let log_path = 'IngredientListProvider/getIngredientList - start';
        try {
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

};


