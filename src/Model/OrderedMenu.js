import Menu from "../Constants/Menu.js";

class OrderedMenu {
    #NAME
    #COUNT
    #TYPE
    #PRICE
    constructor(OrderArray) {
        this.#NAME = OrderArray[0];
        this.#COUNT = parseInt(OrderArray[1]);
        this.#TYPE = this.checkType(OrderArray);
        this.#PRICE = this.checkPrice(OrderArray);
    }

    checkType(OrderArr) {
        return  Menu.find(({name}) => name === OrderArr[0]).type;
    }

    checkPrice(OrderArr) {
        return  Menu.find(({name}) => name === OrderArr[0]).price;
    }

    getName() {
        return this.#NAME;
    }

    getCnt() {
        return this.#COUNT;
    }

    getType(){
        return this.#TYPE;
    }

    getPrice(){
        return this.#PRICE;
    }
}

export default OrderedMenu;