import Menu from "../Constants/Menu.js";
import errorMessage from "../Constants/ErrorMessage.js";

class OrderedMenu {
    #NAME
    #COUNT
    #TYPE
    #PRICE
    constructor(OrderArray) {
        this.validator(OrderArray);
        this.#NAME = OrderArray[0];
        this.#COUNT = parseInt(OrderArray[1]);
        this.#TYPE = this.checkType(OrderArray);
        this.#PRICE = this.checkPrice(OrderArray);
    }

    validator(OrderArray) {
        if (!Menu.some((v) => v.name === OrderArray[0])) {
            throw new Error(errorMessage.NOT_VALID_ORDER);
        }
        OrderArray[1].split("").forEach(v => {
            if (isNaN(v)) throw new Error(errorMessage.NOT_VALID_ORDER);
        });
        if (parseInt(OrderArray[1]) < 1) throw new Error(errorMessage.NOT_VALID_ORDER);

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