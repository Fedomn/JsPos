function printInventory(inputs) {
    var inventorySumPrice = 0;
    var inventoryPrintResult = '';
    var allItems = loadAllItems();

    var groupResult = _.groupBy(inputs);
    var mapResult = _.map(groupResult, function(value, key) {
        var item = _.find(allItems, function(item){return item.barcode == key;});
        return {'barcode': key, 'count': value.length, 'name': item.name, 'price': item.price, 'unit': item.unit};
    });

    for (var item = 0; item < mapResult.length; item++) {
        var itemSumPrice = mapResult[item].count * mapResult[item].price;
        inventorySumPrice += itemSumPrice;

        inventoryPrintResult += '名称:' + mapResult[item].name +
                                ',数量:' + mapResult[item].count + mapResult[item].unit +
                                ',单价:' + mapResult[item].price +
                                '.00(元),小计:' +
                                itemSumPrice + '.00(元)\n';
    }

    inventoryPrintResult = '***<没钱赚商店>购物清单***\n' +
                            inventoryPrintResult +
                            '----------------------\n' +
                            '总计:' + inventorySumPrice + '.00(元)\n' +
                            '**********************';

    console.info(inventoryPrintResult);
    console.log(inventoryPrintResult);
}