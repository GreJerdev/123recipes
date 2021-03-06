"use strict";

module.exports = class BuyList {

    constructor(buy_list = null) {

        this.id = 0;
        this.name = "";
        this.description = "";
        this.parent = null;
        this.create_at = 0;
        this.is_deleted = false;

        if (buy_list) {
            this.id = buy_list.id;
            this.name = buy_list.name;
            this.description = buy_list.description;
            this.parent = buy_list.parent;
            this.create_at = buy_list.create_at;
            this.is_deleted = buy_list.is_deleted || false;
        }
    }

    static parse(buy_list){
        return new BuyList(buy_list);
    }

    static parseList(buy_lists){
        let log_path = `BuyList/parseList`;
        try{
            return buy_lists.map(item=>BuyList.parse(item));
        }catch (err) {
            logger.err(`${log_path} error - ${err}`);
            throw err;
        }
    }

}
;
