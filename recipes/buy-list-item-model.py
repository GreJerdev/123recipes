class BuyListItem:
    def __init__(self, item=None):
        self.id = ""
        self.buy_list_id = None
        self.note = []
        self.done = 0
        self.name = ""
        self.price = 0
        self.units = 0
        self.units_type = ""
        self.ingredient_id = None
        self.description = []
        self.image_url = ""
        self.create_at = 0
        self.is_deleted = False

        if item:
            self.id = item.get('id', "")
            self.buy_list_id = item.get('buy_list_id', None)
            self.note = item.get('note', [])
            self.done = item.get('done', 0)
            self.name = item.get('name', "")
            self.price = item.get('price', 0)
            self.units = item.get('units', 0)
            self.units_type = item.get('units_type', "")
            self.ingredient_id = item.get('ingredient_id', None)
            self.description = item.get('description', [])
            self.image_url = item.get('image_url', "")
            self.create_at = item.get('create_at', 0)
            self.is_deleted = item.get('is_deleted', False)

    @staticmethod
    def parse(item):
        log_path = "BuyListItem/parse"
        logger.info(f"{log_path} start/end")
        logger.verbose(f"{log_path} item to parse {item}")
        return BuyListItem(item)

    @staticmethod
    def parse_list(item_list):
        log_path = "BuyListItem/parseList"
        try:
            return [BuyListItem.parse(item) for item in item_list]
        except Exception as err:
            logger.error(f"{log_path} error - {err}")
            raise err

    @staticmethod
    def parse_list_from_input(items):
        log_path = "BuyListItem/parseListFromInput"
        logger.info(f"{log_path} start/end")
        if isinstance(items, list):
            return BuyListItem.parse_list(items)
        else:
            return BuyListItem.parse(items)
