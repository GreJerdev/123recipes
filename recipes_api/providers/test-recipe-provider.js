"use strict";

require('../utilities/logger');


const  BuyList = require('../models/buy-list-model');
const uuid = require('uuid/v4');
let buyListDBProvider = require("./buy-list-provider");


//create test

async function createBuyList(buy_list) {
    let db_provider = new buyListDBProvider();

    let p = await db_provider.createBuyList(buy_list);
    console.log(p);
    return Promise.resolve(p);
}

//get test

async function getBuyList(id) {
    let db_provider = new buyListDBProvider();
    let p = await db_provider.getBuyListById(id, null);
    console.log(p);
    return Promise.resolve(p);
}


async function test_pay_list() {
    console.log("create start");
    let puy_list = await create_puy_list();

    console.log(puy_list);

    console.log("create end");

    console.log("get start");

    let puy_list_get_result = await get_puy_list(puy_list.id);

    console.log(puy_list_get_result);
    console.log("get end");
}

test_pay_list();