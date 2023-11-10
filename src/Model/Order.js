import Menu from "../Constants/Menu.js";
import OrderedMenu from "./OrderedMenu.js";

class Order {
    #MENU;
    #TOTAL_PRICE;
    constructor(Menu) {
        this.#MENU = this.checkMenu(Menu);
        this.validator();
        this.#TOTAL_PRICE = this.calculateTotalPrice(this.#MENU);
    }

    validator() {
        let menuType = new Set([]);
        let cntMenu = 0;
        this.#MENU.forEach((v) => {
            const EACH_MENU = new OrderedMenu(v);
            menuType.add(EACH_MENU.getType());
            cntMenu += EACH_MENU.getCnt();
        });
        if (menuType.size === 1 && menuType[0] === "drink") throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        if (cntMenu >20) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        if (new Set([...this.#MENU]).size !== this.#MENU.length) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.")
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