class BuyList :
    def __init__(self, buy_list = None):

        self.id = 0
        self.name = ""
        self.description = ""
        self.parent = null
        self.create_at = 0
        self.is_deleted = false

        if (buy_list) :
            self.id = buy_list.id
            self.name = buy_list.name
            self.description = buy_list.description
            self.parent = buy_list.parent
            self.create_at = buy_list.create_at
            self.is_deleted = buy_list.is_deleted or False
        
    
    @staticmethod
    def parse( buy_list):
        return BuyList(buy_list)
    

    def parseList(self, buy_lists):
        try:
            return map ( BuyList.parse,buy_lists)
        
        except Exception as err:
            logger.err(f'{log_path} error - {err}')
            raise err
        