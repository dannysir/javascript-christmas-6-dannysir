import Menu from "../Constants/Menu.js";
import OrderedMenu from "./OrderedMenu.js";

class Order {
    #WEEKEND;
    #MENU;

    constructor(Menu, Weekend) {
        this.#WEEKEND = Weekend;
        this.#MENU = this.checkMenu(Menu);
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

    checkMenuType(Type) {
        const cnt = Menu.filter(value => {
            value.name
        });
    }
    calculateTotalPrice(order) {
        let totalPrice = 0;

        for (const item of order) {
            const menuItem = new OrderedMenu(item);
            totalPrice += menuItem.getPrice() * menuItem.getCnt();
        }

        return totalPrice.toLocaleString('en-US', { style: 'decimal'});
    }

    getMenu(){
        return this.#MENU;
    }
}

export default Order;