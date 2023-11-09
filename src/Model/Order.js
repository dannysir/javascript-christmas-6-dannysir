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
    getMenu(){
        return this.#MENU;
    }
}

export default Order;