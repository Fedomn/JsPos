function CartCounting(items, promotions, inputs) {
    this.cartItems = [];
    this.cartTotalPrice = 0;
    this.cartSavedPrice = 0;
    this.cartPromotionItemsPrice = 0;
    this.cartInitialize(items, promotions, inputs);
}

CartCounting.prototype.cartInitialize = function (items, promotions, inputs) {
    this.itemsInitialize(inputs, items, promotions);
    this.promotionsInitialize();
};


CartCounting.prototype.itemsInitialize = function (inputs, items, promotions) {
    var cartItems = this.cartItems;
    var group = _.groupBy(inputs);
    var map = _.map(group, function (value, key) {
        return {
            'barcode': key.slice(0, 10),
            'count': key.length == 10 ? value.length : key.slice(11)
        };
    });
    _.times(map.length, function (i) {
        var newItem = _.find(items, function (item) {
            return item.barcode === map[i].barcode;
        });
        if (newItem) {
            var good = new Item(newItem.barcode, newItem.name, newItem.unit, newItem.price);
            good.count = map[i].count;
            cartItems.push(good);
        }
    });
    _.times(cartItems.length, function (index) {
        if (_.find(promotions[0].barcodes, function (i) {
                return cartItems[index].barcode === i;
            })) {
            cartItems[index].promotion = true;
            cartItems[index].setFreeCount();
            cartItems[index].setFreeFare();
        }
    });
};

CartCounting.prototype.promotionsInitialize = function () {

};


CartCounting.prototype.output = function () {
    return '***<没钱赚商店>购物清单***\n' +
        '打印时间:' + this.getDateTime() + '\n' +
        '----------------------\n' +
        this.getBoughtItemsListStr() +
        '----------------------\n' +
        '挥泪赠送商品:\n' +
        this.getFreeItemsListStr() +
        '----------------------\n' +
        this.getStats() +
        '**********************';
};

CartCounting.prototype.getDateTime = function () {
    return moment().format('YYYY年MM月DD日 HH:mm:ss');
};

CartCounting.prototype.getBoughtItemsListStr = function () {
    var boughtListStr = '';
    _.forEach(this.cartItems, function (item) {
        boughtListStr += '名称:' + item.name +
        ',数量:' + item.count + item.unit +
        ',单价:' + item.price.toFixed(2) +
        '(元),小计:' + (item.count * item.price - item.freeFare).toFixed(2) + '(元)\n';
    });
    return boughtListStr;
};

CartCounting.prototype.getFreeItemsListStr = function () {
    var freeListStr = '';
    var freeList = this.getFreeItemsList();
    _.forEach(freeList, function (item) {
        freeListStr += '名称:' + item.name +
        ',数量:' + item.freeCount + item.unit + '\n';
    });
    return freeListStr;
};

CartCounting.prototype.getFreeItemsList = function () {
    return _.filter(this.cartItems, function (item) {
        return item.promotion === true;
    });
};

CartCounting.prototype.getStats = function () {
    this.cartTotalPrice = _.reduce(this.cartItems, function (sum, item) {
        return sum + item.count * item.price - item.freeFare;
    }, 0, this);

    this.cartSavedPrice = _.reduce(this.getFreeItemsList(), function (sum, item) {
        return sum + item.freeCount * item.price;
    }, 0, this);

    return '总计:' + this.cartTotalPrice.toFixed(2) + '(元)\n'
        + '节省:' + this.cartSavedPrice.toFixed(2) + '(元)\n';
};



