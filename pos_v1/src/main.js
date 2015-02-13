function printInventory(inputs) {
    var res = ItemRepository.getNoPromotionResult(inputs);

    console.info(res);
}
