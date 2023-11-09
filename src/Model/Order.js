import Menu from "../Constants/Menu.js";

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
            makeStringMenu += `${v[0]} ${v[1]}개\n`;
        });
        return makeStringMenu;
    }

    calculateTotalPrice(order) {
        let totalPrice = 0;

        for (const item of order) {
            const menuItem = Menu.find(menuItem => menuItem.name === item[0]);
            if (menuItem) {
                totalPrice += menuItem.price * parseInt(item[1], 10);
            }
        }

        return totalPrice.toLocaleString('en-US', { style: 'decimal'});
    }

    getMenu(){
        return this.#MENU;
    }
}

export default Order;