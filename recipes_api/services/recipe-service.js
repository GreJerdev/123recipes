"use strict";

const recipe_model = require('../models/recipe-model')
const recipe_db_provider =  require('../providers/recipe-db-provider')

module.exports = class recipe{

    constructor(){

    }

    async create_recipe(){
        console.log("create_recipe()")
        return Promise.resolve(new recipe_model());
    }

    async update_recipe(){

    }

    async delete_recipe(){

    }

    async get_list_recipe(search_by, order_by, page_number, page_size, limit){

    }

}


