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

    getMenu(){
        return this.#MENU;
    }
}

export default Order;