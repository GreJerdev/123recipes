"use strict";

module.exports = class BuyListService{

    constructor(){
        let recipe_db = null;
        let ingredients_db_provider = null;

        if (dbproviders){
            recipe_db = db_providers.recipe;
            ingredients_db_provider =  db_providers.ingredients
        }
        this.ingredients_service = (services && services.ingredient)? services.ingredient : new ingredient_service(ingredients_db_provider);
        this.recipe_db_provider = recipe_db_provider || new recipe_db_provider()
    }
    
    prefix(){return 'bl_';} 

    createBuyList(){

    }

    updateBuyList(){

    }

    deleteBuyList(){

    }

    getListBuyList(search_by, order_by, page_number, page_size, limit){

    }

}


