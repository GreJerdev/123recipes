"use strict";

let configuration = require('../../configuration/config');
let mongo_buy_list_provider = require('./mongo/buy-list-mongo-provider');
let mongo_buy_to_item_provider = require('./mongo/buy-list-to-item-mongo-provider');
let mongo_comment_provider = require('./mongo/comment-mongo-provider');
let mongo_ingredient_list_provider = require('./mongo/ingredient-list-mongo-provider');
let mongo_ingredient_provider = require('./mongo/ingredient-mongo-provider');
let mongo_instruction_provider = require('./mongo/instruction-mongo-provider');
let mongo_media_provider = require('./mongo/media-mongo-provider');
let mongo_recipe_provider = require('./mongo/recipe-mongo-provider');
let mongo_recipe_step_provider = require('./mongo/recipe-step-mongo-provider');


module.exports = function () {

    function getObjectDBProvider(object_name)
    {
        switch (object_name) {
            case 'buy_list':
                return new mongo_buy_list_provider();
                break;
            case 'buy_to_items':
                return new mongo_buy_to_item_provider();
                break;
            case 'comment':
                return new mongo_comment_provider();
                break;
            case 'ingredient_list':
                return new mongo_ingredient_list_provider();
                break;
            case 'ingredient':
                return new mongo_ingredient_provider();
                break;
            case 'instruction':
                return new mongo_instruction_provider();
                break;
            case 'media':
                return new mongo_media_provider();
                break;
            case 'recipe':
                return new mongo_recipe_provider();
                break;
            case 'recipe_step':
                return new mongo_recipe_step_provider();
                break;
        }
    }
    return {"getObjectDBProvider":getObjectDBProvider};
}();