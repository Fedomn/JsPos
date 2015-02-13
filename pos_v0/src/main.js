function printInventory(inputs) {
    var inventorySumPrice = 0;
    var inventoryPrintResult = '';

    for (var item = 0; item < inputs.length; item++) {
        var itemSumPrice = inputs[item].count * inputs[item].price;
        inventorySumPrice += itemSumPrice;

        inventoryPrintResult += '名称:' + inputs[item].name +
                                ',数量:' + inputs[item].count + inputs[item].unit +
                                ',单价:' + inputs[item].price +
                                '.00(元),小计:' +
                                itemSumPrice + '.00(元)\n';
    }

    inventoryPrintResult =  '***<没钱赚商店>购物清单***\n' +
                            inventoryPrintResult +
                            '----------------------\n' +
                            '总计:'+inventorySumPrice+'.00(元)\n' +
                            '**********************';

    console.info(inventoryPrintResult);
    console.log(inventoryPrintResult);
}