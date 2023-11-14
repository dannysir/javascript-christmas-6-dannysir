import OrderedMenu from "./OrderedMenu.js";
import Menu from "../Constants/Menu.js";
import constantForDiscount from "../Constants/ConstantsForDiscount.js";
import constantsForDiscount from "../Constants/ConstantsForDiscount.js";
class Discount {
    #TOTAL_BENEFIT = 0;
    #REAL_COST;

    #DISCOUNT;
    constructor(Day, Order) {
        this.#DISCOUNT = [0, 0, 0, 0, 0];
        this.calculateDiscounts(Day, Order);
        this.#REAL_COST = Order.getTotalPrice() - (this.#TOTAL_BENEFIT - this.#DISCOUNT[4]);
    }

    calculateDiscounts(Day, Order) {
        if (Order.getTotalPrice() >= constantForDiscount.EVENT_LIMIT) {
            this.calculateChristmasDiscount(Day.getDay());
            this.calculateWeekendDiscount(Order.getMenu(), Day.getWeekend());
            this.calculateSpecialDiscount(Day.getIsStar());
            this.calculateGiftEvent(Order.getTotalPrice());
            this.#TOTAL_BENEFIT += this.calculateTotalBenefit();
        }
    }

    getDiscountList() {
        let discount_List = "";
        if (this.#DISCOUNT[0] > 0) discount_List += `크리스마스 디데이 할인: -${this.formatDiscount(this.#DISCOUNT[0])}원\n`;
        if (this.#DISCOUNT[1] > 0) discount_List += `주말 할인: -${this.formatDiscount(this.#DISCOUNT[1])}원\n`;
        if (this.#DISCOUNT[2] > 0) discount_List += `평일 할인: -${this.formatDiscount(this.#DISCOUNT[2])}원\n`;
        if (this.#DISCOUNT[3] > 0) discount_List += `특별 할인: -${this.formatDiscount(constantForDiscount.SPECIAL_DISCOUNT)}원\n`;
        if (this.#DISCOUNT[4] > 0) discount_List += `증정 이벤트: -${this.formatDiscount(Menu.find(({name}) => name === constantForDiscount.GIFT).price)}원\n`;
        if (discount_List.length === 0) discount_List = constantsForDiscount.NOTHING;
        return discount_List;
    }

    calculateChristmasDiscount(Day) {
        if (Day <= constantForDiscount.CHRISTMAS) {
            this.#DISCOUNT[0] = ((Day - 1) * 100) + 1000;
        }
    }

    calculateWeekendDiscount(MENU, WEEKEND) {
        if (WEEKEND) {
            this.#DISCOUNT[1] = this.weekendDiscount(MENU, constantForDiscount.MAIN);
        }
        this.#DISCOUNT[2] = this.weekendDiscount(MENU, constantForDiscount.DESSERT);
    }

    weekendDiscount(MENU, type) {
        let discount = 0;
        MENU.forEach((v) => {
            const EachMenu = new OrderedMenu(v);
            if (EachMenu.getType() === type) {
                discount += EachMenu.getCnt() * constantForDiscount.WEEKEND_DISCOUNT;
            }
        });
        return discount;
    }

    calculateSpecialDiscount(isStar) {
        if (isStar) {
            this.#DISCOUNT[3] = constantForDiscount.SPECIAL_DISCOUNT;
        }
    }

    calculateGiftEvent(total) {
        if (total > 120000) {
            this.#DISCOUNT[4] = Menu.find(({name}) => name === constantForDiscount.GIFT).price;
        }
    }

    calculateTotalBenefit() {
        return this.#DISCOUNT.reduce((a, b) => a + b);
    }

    getTotalBenefit() {
        if (this.#TOTAL_BENEFIT > 0) return `-${this.formatDiscount(this.#TOTAL_BENEFIT)}원`;
        return `${this.formatDiscount(this.#TOTAL_BENEFIT)}원`;
    }

    getRealCost() {
        return `${this.formatDiscount(this.#REAL_COST)}원`;
    }

    getBadge() {
        if (this.#TOTAL_BENEFIT >= constantForDiscount.BADGE_SANTA_LIMIT) return constantForDiscount.BADGE_SANTA;
        if (this.#TOTAL_BENEFIT >= constantForDiscount.BADGE_TREE_LIMIT) return constantForDiscount.BADGE_TREE;
        if (this.#TOTAL_BENEFIT >= constantForDiscount.BADGE_STAR_LIMIT) return constantForDiscount.BADGE_STAR;
        return constantForDiscount.NOTHING;
    }

    getGiftList() {
        if (this.#DISCOUNT[4] > 0) return `${constantForDiscount.GIFT} ${constantForDiscount.GIFT_HOW_MUCH}개`;
        return constantForDiscount.NOTHING;
    }

    formatDiscount(value) {
        return value.toLocaleString('en-US', { style: 'decimal' });
    }
}

export default Discount;