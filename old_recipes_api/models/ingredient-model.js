"use strict";


module.exports = class Ingredient{

    constructor(){
        this.id = 0;
        this.name = "";
        this.measuring_unit= "";
        this.measuring_size = 0;
        this.is_deleted = 0;
        this.price = 0;
        this.price_currency_iso3 = "USD";
    }
}
