import os

file_list = ['buy_list_to_item', 'buy_list','comment','ingredient_list','ingredient','instruction','media','recipe','recipe_steps']
path = 'D:/Projects/git/123recipes/recipes_api/models'

template1 = '''"use strict";

module.exports = class %s{

    constructor(){

    }

    create_%s(){

    }

    update_%s(){

    }

    delete_%s(){

    }

    get_list_%s(search_by, order_by, page_number, page_size, limit){

    }

}


'''

template2 = '''"use strict";


module.exports = class %s{

    constructor(){

    }
}
'''

for file_name in file_list:
    full_path = os.path.join(path, '.'.join((file_name, 'js')))
    
    
    fo = open(full_path,'w')
    file_data = template2 % (file_name)
    print(file_data)
    fo.write(file_data)
    fo.close()