"use strict";


module.exports = class BuyListItem{

    constructor(){
        this.id = 0;
        this.buy_list_id = 0;
        this.item_id = 0;
        this.note = "";
        this.item_fulfitted = 0;
        this.price = 0;
    }
}


module.exports = class BuyItem{

    constructor(){
        this.buy_list_id = 0;
        this.item_id = 0;
        this.item_type = "";
        this.name = "";
        this.description = "";
        this.image_url = "";
        this.identity_code = "";
    }
}
