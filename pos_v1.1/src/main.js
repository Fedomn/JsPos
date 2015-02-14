function printInventory(inputs) {
    var c = new CartCounting();
    var cartItemsList = c.getCartItemsList(inputs);
    var cartPromotionItemsList = c.getCartPromotionItemsList(cartItemsList);

    var dateDigitToString = function (num) {
        return num < 10 ? '0' + num : num;
    };
    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

    console.log('***<没钱赚商店>购物清单***\n' +
                '打印时间:' + formattedDateString + '\n' +
                '----------------------\n' +
                c.cartItemsString(cartItemsList, cartPromotionItemsList) +
                c.cartPromotionItemsString(cartPromotionItemsList) +
                c.priceCounting());
}