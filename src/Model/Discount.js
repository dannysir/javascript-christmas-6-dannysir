import OrderedMenu from "./OrderedMenu.js";
import Menu from "../Constants/Menu.js";
import constantForDiscount from "../Constants/ConstantsForDiscount.js";
class Discount {
    #LIST_STRING = "";
    #TOTAL_DISCOUNT = 0;
    #TOTAL_BENEFIT = 0;
    #GIFT = false;
    #REAL_COST;

    #DISCOUNT_
    constructor(Day, Order) {
        this.calculateDiscounts(Day, Order);
        this.#REAL_COST = Order.getTotalPrice() - this.#TOTAL_DISCOUNT;
    }

    calculateDiscounts(Day, Order) {
        if (Order.getTotalPrice() >= constantForDiscount.EVENT_LIMIT) {
            this.#LIST_STRING += this.calculateChristmasDiscount(Day.getDay());
            this.#LIST_STRING += this.calculateWeekendDiscount(Order.getMenu(), Day.getWeekend());
            this.#LIST_STRING += this.calculateSpecialDiscount(Day.getIsStar());
            this.#LIST_STRING += this.calculateGiftEvent(Order.getTotalPrice());
            this.#TOTAL_BENEFIT += this.calculateTotalBenefit();
        } else {
            this.#LIST_STRING = constantForDiscount.NOTHING;
        }
    }

    calculateWeekendDiscount(MENU, WEEKEND) {
        if (WEEKEND) {
            const DISCOUNT = this.weekendDiscount(MENU, constantForDiscount.MAIN);
            if (DISCOUNT > 0) return `주말 할인: -${this.formatDiscount(DISCOUNT)}원\n`
            return "";
        }
        const DISCOUNT = this.weekendDiscount(MENU, constantForDiscount.DESSERT);
        if (DISCOUNT > 0) return `평일 할인: -${this.formatDiscount(DISCOUNT)}원\n`
        return "";
    }

    weekendDiscount(MENU, type) {
        let discount = 0;
        MENU.forEach((v) => {
            const EachMenu = new OrderedMenu(v);
            if (EachMenu.getType() === type) {
                discount += EachMenu.getCnt() * constantForDiscount.WEEKEND_DISCOUNT;
                this.#TOTAL_DISCOUNT += EachMenu.getCnt() * constantForDiscount.WEEKEND_DISCOUNT;
            }
        });
        return discount;
    }

    calculateChristmasDiscount(Day) {
        if (Day <= constantForDiscount.CHRISTMAS) {
            const DAY_DISCOUNT = ((Day - 1) * 100) + 1000;
            this.#TOTAL_DISCOUNT += DAY_DISCOUNT;
            return `크리스마스 디데이 할인: -${this.formatDiscount(DAY_DISCOUNT)}원\n`;
        }
        return "";
    }

    calculateSpecialDiscount(isStar) {
        if (isStar) {
            this.#TOTAL_DISCOUNT += constantForDiscount.SPECIAL_DISCOUNT;
            return `특별 할인: -${this.formatDiscount(constantForDiscount.SPECIAL_DISCOUNT)}원\n`;
        }
        return "";
    }

    calculateGiftEvent(total) {
        if (total > 120000) {
            this.#GIFT = true;
            return `증정 이벤트: -${this.formatDiscount(Menu.find(({name}) => name === constantForDiscount.GIFT).price)}원\n`;
        }
        return "";
    }

    calculateTotalBenefit() {
        if (this.#GIFT) {
            return Menu.find(({name}) => name === constantForDiscount.GIFT).price + this.#TOTAL_DISCOUNT;
        }
        return this.#TOTAL_DISCOUNT;
    }
    getTotalBenefit() {
        return `-${this.formatDiscount(this.#TOTAL_BENEFIT)}원`;
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
        if (this.#GIFT) return `${constantForDiscount.GIFT} ${constantForDiscount.GIFT_HOW_MUCH}개`;
        return constantForDiscount.NOTHING;
    }

    getList() {
        return this.#LIST_STRING;
    }

    formatDiscount(value) {
        return value.toLocaleString('en-US', { style: 'decimal' });
    }
}

export default Discount;