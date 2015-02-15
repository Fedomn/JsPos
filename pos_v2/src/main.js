function printInventory(inputs) {
    var c = new CartCounting(loadAllItems(), loadPromotions(), inputs);
    console.log(c.output());
}