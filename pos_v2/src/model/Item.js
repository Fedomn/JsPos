function Item(barcode, name, unit, price) {
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price || 0.00;
    this.count = 0;
    this.promotion = false;
    this.freeCount = 0;
    this.freeFare = 0;
}

Item.prototype.setFreeCount = function () {
    this.freeCount = Math.floor(this.count / 3);
};

Item.prototype.setFreeFare = function () {
    this.freeFare = this.freeCount * this.price;
};