"use strict";

module.exports = class ingredient {

    constructor(instanceFectory) {
        this.instanceFectory = instanceFectory
        this.igredient_db_provider = this.instanceFectory.get('igredient_db_provider');
    }

    create_ingredient() {

    }

    update_ingredient() {

    }

    delete_ingredient() {

    }

    get_list_ingredient(search_by, order_by, page_number, page_size, limit) {

    }

    async validateIngredients(ingredients) {
        try{

        }catch(err){
            
        }
    }

}


