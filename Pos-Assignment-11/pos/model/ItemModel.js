export default class itemModel {

    constructor(id, name, price, qty, description) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._qty = qty;
        this._description = description;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }
}