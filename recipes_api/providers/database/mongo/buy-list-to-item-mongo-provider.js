"use strict";

let db = require('../mongodb_provider')();
let BuyListItem = require("../../../models/buy-list-to-item-model");

module.exports = class buyListItemsProvider {
  constructor() { }

  async addItemToList(item_id, list_id, type, quantity, unit, conn = null) {
    let log_path = "buy_list_to_item_db_provider/createBuyListToItem -";
    let is_external_connection = true;
    try {
      return Promise.resolve(result);
    } catch (err) {
      if (!is_external_connection) {
        mysql_provider.rollbackTransaction(conn);
      }
      console.log(err);
      return Promise.reject(err);
    }
  }

  async updateBuyItemInList(item_id, list_id, type, quantity, unit, bought, conn = null) {
    let log_path = "buy_list_to_item_db_provider/updateBuyListToItem -";
    let is_external_connection = true;
   try {
      return Promise.resolve(result);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async removeItemFromList(item_id, list_id, conn = null) {
    let log_path = "buy_list_to_item_db_provider/deleteBuyListToItem -";

    try {
      return Promise.resolve(result);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async getListItems(list_id, conn = null) {
    let log_path = "buy_list_to_item_db_provider/getItemsByListId -";
    try {
      return Promise.resolve(result);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
};

