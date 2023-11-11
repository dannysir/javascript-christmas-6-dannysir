import OrderedMenu from "./OrderedMenu.js";
import Menu from "../Constants/Menu.js";
import constantForDiscount from "../Constants/ConstantsForDiscount.js";
class Discount {
    #LIST_STRING = "";
    #TOTAL_DISCOUNT = 0;
    #TOTAL_BENEFIT = 0;
    #GIFT = false;
    #REAL_COST;

    constructor(Day, Order) {
        if (Order.getTotalPrice() >= constantForDiscount.EVENT_LIMIT) {
            this.#LIST_STRING += this.ChristmasDiscount(Day.getDay());
            this.#LIST_STRING += this.countWeekEndDiscount(Order.getMenu(), Day.getWeekend());
            this.#LIST_STRING += this.specialDiscount(Day.getIsStar());
            this.#LIST_STRING += this.giftEvent(Order.getTotalPrice());
            this.#TOTAL_BENEFIT += this.calculateTotalBenefit();
        }
        if (Order.getTotalPrice() < constantForDiscount.EVENT_LIMIT) {
            this.#LIST_STRING = constantForDiscount.NOTHING;
        }
        this.#REAL_COST = Order.getTotalPrice() - this.#TOTAL_DISCOUNT;
    }

    countWeekEndDiscount(MENU, WEEKEND) {
        if (WEEKEND) {
            const DISCOUNT = this.weekendDiscount(MENU, constantForDiscount.MAIN);
            return `주말 할인: -${DISCOUNT.toLocaleString('en-US', {style: 'decimal'})}원\n`
        }
        const DISCOUNT = this.weekendDiscount(MENU, constantForDiscount.DESSERT);
        return `평일 할인: -${DISCOUNT.toLocaleString('en-US', {style: 'decimal'})}원\n`
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

    ChristmasDiscount(Day) {
        if (Day <= constantForDiscount.CHRISTMAS) {
            const DAY_DISCOUNT = ((Day - 1) * 100) + 1000;
            this.#TOTAL_DISCOUNT += DAY_DISCOUNT;
            return `크리스마스 디데이 할인: -${DAY_DISCOUNT.toLocaleString('en-US', {style: 'decimal'})}원\n`;
        }
    }

    specialDiscount(isStar) {
        if (isStar) {
            this.#TOTAL_DISCOUNT += constantForDiscount.SPECIAL_DISCOUNT;
            return `특별 할인: -${constantForDiscount.SPECIAL_DISCOUNT.toLocaleString('en-US', {style: 'decimal'})}원\n`;
        }
    }

    giftEvent(total) {
        if (total > 120000) {
            this.#GIFT = true;
            return `증정 이벤트: -${Menu.find(({name}) => name === "샴페인").price.toLocaleString('en-US', {style: 'decimal'})}원\n`;
        }
    }

    calculateTotalBenefit() {
        if (this.#GIFT) {
            return Menu.find(({name}) => name === "샴페인").price + this.#TOTAL_DISCOUNT;
        }
        return this.#TOTAL_DISCOUNT;
    }
    getTotalBenefit() {
        return `-${(this.#TOTAL_BENEFIT).toLocaleString('en-US', {style: 'decimal'})}원`;
    }

    getRealCost() {
        return `${this.#REAL_COST.toLocaleString('en-US', {style: 'decimal'})}원`;
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
}

export default Discount;