function printInventory(inputs) {
    var c = new CartCounting();
    var cartItemsList = c.getCartItemsList(inputs);
    var cartPromotionItemsList = c.getCartPromotionItemsList(cartItemsList);
    console.log('***<没钱赚商店>购物清单***\n' + c.cartItemsString(cartItemsList, cartPromotionItemsList)
    + c.cartPromotionItemsString(cartPromotionItemsList) + c.priceCounting());
}