"use strict";


module.exports = class BuyListItem{

    constructor(item = null){
        this.id = "";
        this.buy_list_id = null;
        this.note = [];
        this.fulfitted = 0;
        this.name = "";
        this.price = 0;
        this.units = 0;
        this.units_type = "";
        this.ingredient_id = null;
        this.description = [];
        this.image_url = "";
        this.create_at = 0;
        this.is_deleted = false;

        if (item) {
            this.id = item.id;
            this.buy_list_id = item.buy_list_id;
            this.note = item.note;
            this.fulfitted = item.fulfitted;
            this.name = item.name;
            this.price = item.price;
            this.units = item.units;
            this.units_type = item.units_type;
            this.ingredient_id = item.ingredient_id;
            this.description = item.description;
            this.image_url = item.image_url;
            this.create_at = item.create_at;
            this.is_deleted = item.is_deleted;
        }
    }

    static parse(item){
        let log_path = `BuyListItem/parse`;
        logger.info(`${log_path} start/end`);
        logger.verbose(`${log_path} item to parse ${item}`);
        return new BuyListItem(item);
    }

    static parseList(item_list){
        let log_path = `BuyListItem/parseList`;
        try{
            return item_list.map(item=>BuyListItem.parse(item));
        }catch (err) {
            logger.error(`${log_path} error - ${err}`);
            throw err;
        }
    }

    static parseListFromInput(items){
        let log_path = `BuyListItem/parseListFromInput`;
        logger.info(`${log_path} start/end`);
        if(Array.isArray(items)){
            return BuyListItem.parseList(items);
        }else{
            return BuyListItem.parse(items);
        }
    }
};

