function ItemRepository(item, promotion, count){
    this.item = item;
    this.promotion = promotion;
    this.count = count;
}


ItemRepository.getNoPromotionResult = function (inputs) {
    var returnList = [];
    var groupResult = _.groupBy(inputs);
    var mapResult = _.map(groupResult, function(value, key){
        return {'barcode': key.slice(0,10),
                'count': key.length == 10 ? value.length : key.slice(11)};
    });
    _(mapResult.length).times(function (index) {
        var newItem = _.find(loadAllItems(), function (item) {
            return item.barcode === mapResult[index].barcode;
        });
        newItem.count = mapResult[index].count;
        returnList.push(newItem);
    });
    return returnList;
};

ItemRepository.getPromotionResult = function (inputs) {
    var result = ItemRepository.getNoPromotionResult(inputs);

};