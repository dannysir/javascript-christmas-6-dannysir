import Menu from "../Constants/Menu.js";
import OrderedMenu from "./OrderedMenu.js";

class Order {
    #MENU;
    #TOTAL_PRICE;
    constructor(Menu) {
        this.#MENU = this.checkMenu(Menu);
        this.#TOTAL_PRICE = this.calculateTotalPrice(this.#MENU);
    }

    checkMenu(Menu) {
        const MenuSplit = Menu.split(",").map((v)=>{
            return v.split("-");
        });
        return MenuSplit;
    }

    getMyOrder(){
        let makeStringMenu = "";
        this.#MENU.forEach((v) => {
            const EachMenu = new OrderedMenu(v);
            makeStringMenu += `${EachMenu.getName()} ${EachMenu.getCnt()}개\n`;
        });
        return makeStringMenu;
    }

    calculateTotalPrice(order) {
        let totalPrice = 0;

        for (const item of order) {
            const menuItem = new OrderedMenu(item);
            totalPrice += menuItem.getPrice() * menuItem.getCnt();
        }
        return totalPrice;
    }

    getTotalPrice(){
        return this.#TOTAL_PRICE;
    }

    getMenu(){
        return this.#MENU;
    }
}

export default Order;