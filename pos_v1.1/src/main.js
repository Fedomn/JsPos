function printInventory(inputs) {
    var c = new CartCounting();
    var cartItemsList = c.getCartItemsList(inputs);
    var cartPromotionItemsList = c.getCartPromotionItemsList(cartItemsList);

    var formattedDateString = moment().format('YYYY年MM月DD日 HH:mm:ss');

    console.log('***<没钱赚商店>购物清单***\n' +
                '打印时间:' + formattedDateString + '\n' +
                '----------------------\n' +
                c.cartItemsString(cartItemsList, cartPromotionItemsList) +
                c.cartPromotionItemsString(cartPromotionItemsList) +
                c.priceCounting());
}