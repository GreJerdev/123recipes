"use strict";

require('../utilities/logger');

const uuid = require('uuid/v4');
let buy_list_db_provider = require("./buy_list-provider");


//create test

async function create_puy_list() {
    let db_provider = new buy_list_db_provider();
    let p = await db_provider.createBuyList(uuid(), "name", "description", null, null);
    console.log(p);
    return Promise.resolve(p);
}

//get test

async function get_puy_list(id) {
    let db_provider = new buy_list_db_provider();
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