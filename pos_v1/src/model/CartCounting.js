function CartCounting(item, promotion) {
    this.cartItem = item;
    this.cartPromotion = promotion;
    this.cartItemsSumPrice = 0;
    this.cartPromotionItemsPrice = 0;
}

CartCounting.prototype.getCartItemsList = function (inputs) {
    var list = [];
    var groupResult = _.groupBy(inputs);
    var mapResult = _.map(groupResult, function (value, key) {
        return {'barcode': key.slice(0,10),
                'count': key.length == 10 ? value.length : key.slice(11)};
    });
    _(mapResult.length).times(function (index) {
        var newItem = _.find(loadAllItems(), function (item) {
            return item.barcode === mapResult[index].barcode;
        });
        newItem.count = mapResult[index].count;
        list.push(newItem);
    });
    return list;
};

CartCounting.prototype.getCartPromotionItemsList = function (cartItemsList) {
    var list = [];
    _(loadPromotions()[0].barcodes.length).times(function (index) {
        var newItem = _.find(cartItemsList, function (item) {
            return item.barcode == loadPromotions()[0].barcodes[index];
        });
        if(newItem !== undefined) {
            list.push(newItem);
        }
    });
    return list;
};

CartCounting.prototype.cartItemsString = function (cartItemsList, cartPromotionItemsList) {
    var cartItemsString = '';
    for(var i = 0; i < cartItemsList.length; i++) {

        var itemSumPrice = cartItemsList[i].count * cartItemsList[i].price - this.getSavedMoney(cartItemsList[i], cartPromotionItemsList);
        this.cartItemsSumPrice += itemSumPrice;
        cartItemsString +=  '名称:' + cartItemsList[i].name +
                            ',数量:' + cartItemsList[i].count + cartItemsList[i].unit +
                            ',单价:' + cartItemsList[i].price.toFixed(2) +
                            '(元),小计:' + itemSumPrice.toFixed(2) + '(元)\n';
    }
    return cartItemsString + '----------------------\n';
};

CartCounting.prototype.getSavedMoney = function (cartItem, cartPromotionItemsList) {
    if(this.isPromotionItem(cartItem, cartPromotionItemsList)) {
        //return Math.floor(cartItem.count / 3) * cartItem.price;
        return this.getFreeItemCount(cartItem, cartPromotionItemsList) * cartItem.price;
    }
    return 0;
};

CartCounting.prototype.isPromotionItem = function (cartItem, cartPromotionItemsList) {
    if(_.find(cartPromotionItemsList, function (item) {
            return item.barcode === cartItem.barcode;
        })){
        return true;
    }
    return false;
};

CartCounting.prototype.getFreeItemCount = function (cartItem, cartPromotionItemsList) {
    if(this.isPromotionItem(cartItem, cartPromotionItemsList))
        return Math.floor(cartItem.count / 3);
};

CartCounting.prototype.cartPromotionItemsString = function (cartPromotionItemsList) {
    var cartPromotionItemsString = '挥泪赠送商品:\n';
    for(var i = 0; i < cartPromotionItemsList.length; i++) {
        if(this.isPromotionItem(cartPromotionItemsList[i], cartPromotionItemsList)) {
            cartPromotionItemsString += '名称:' + cartPromotionItemsList[i].name +
                                        ',数量:' + Math.floor(cartPromotionItemsList[i].count / 3) + cartPromotionItemsList[i].unit + '\n';
            this.cartPromotionItemsPrice += Math.floor(cartPromotionItemsList[i].count / 3) * cartPromotionItemsList[i].price;
        }
    }
    return cartPromotionItemsString + '----------------------\n';
};

CartCounting.prototype.priceCounting = function () {
    return '总计:' + this.cartItemsSumPrice.toFixed(2) + '(元)\n' +
            '节省:' + this.cartPromotionItemsPrice.toFixed(2) + '(元)\n' +
            '**********************';
};

