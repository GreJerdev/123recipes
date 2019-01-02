"use strict";

module.exports = class IngredientService {

    constructor(instanceFectory) {
        this.instanceFectory = instanceFectory
        this.igredient_db_provider = this.instanceFectory.get('igredient_db_provider');
    }

    prefix(){return 'ingredient_';} 

    createIngredient() {

    }

    updateIngredient() {

    }

    deleteIngredient() {

    }

    getListIngredient(search_by, order_by, page_number, page_size, limit) {

    }

    async validateIngredients(ingredients) {
        try{

        }catch(err){
            
        }
    }

}


