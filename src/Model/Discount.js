import OrderedMenu from "./OrderedMenu.js";

class Discount {
    #TOTAL_PRICE;
    #WEEKEND;
    #DISCOUNT = 0;
    #LIST_STRING = "";
    #TOTAL_DISCOUNT = 0;
    #GIFT = 0;
    #GIFT_LIST;

    constructor(Day, Order) {
        this.#TOTAL_PRICE = Order.getTotalPrice();
        this.#WEEKEND = Day.getWeekend();
        if (Order.getTotalPrice() >= 10000) {
            this.#LIST_STRING += this.ChristmasDiscount(Day.getDay(), Day.getDdayDiscount());
            this.#LIST_STRING += this.countWeekEndDiscount(Order.getMenu());
            this.#LIST_STRING += this.specialDiscount(Day.getIsStar());
            this.#LIST_STRING += this.giftEvent(Order.getTotalPrice());
        }
        if (Order.getTotalPrice() < 10000) {
            this.#LIST_STRING = "없음";
            this.#GIFT_LIST = "없음";
        }

    }

    countWeekEndDiscount(MENU) {
        if (this.#WEEKEND) {
            this.weekendDiscount(MENU, "main");
            return `주말 할인 = ${this.#DISCOUNT.toLocaleString('en-US', {style: 'decimal'})}원\n`
        }
        this.weekendDiscount(MENU, "dessert");
        return `평일 할인 = ${this.#DISCOUNT.toLocaleString('en-US', {style: 'decimal'})}원\n`
    }

    weekendDiscount(MENU, type) {
        MENU.forEach((v) => {
            const EachMenu = new OrderedMenu(v);
            if (EachMenu.getType() === type) {
                this.#DISCOUNT += EachMenu.getCnt() * 2023;
                this.#TOTAL_DISCOUNT += EachMenu.getCnt() * 2023;
            }
        });
    }

    ChristmasDiscount(Day) {
        if (Day <= 25) {
            let DdayDiscount = ((Day - 1) * 100) + 1000;
            this.#TOTAL_DISCOUNT += DdayDiscount;
            return `크리스마스 디데이 할인: -${DdayDiscount.toLocaleString('en-US', {style: 'decimal'})}원\n`;
        }
    }

    specialDiscount(isStar) {
        const SPECIAL_DISCOUNT = 1000;
        if (isStar) {
            this.#TOTAL_DISCOUNT += SPECIAL_DISCOUNT;
            return `특별 할인: -${SPECIAL_DISCOUNT.toLocaleString('en-US', {style: 'decimal'})}원\n`;
        }
    }

    giftEvent(total) {
        if (total > 120000) {
            this.#GIFT_LIST = "샴페인 1개";
            this.#GIFT = 25000;
            return `증정 이벤트: -25,000원`;
        }
    }

    getTotalBenefit() {
        return `-${(this.#GIFT + this.#TOTAL_DISCOUNT).toLocaleString('en-US', {style: 'decimal'})}원`;
    }

    getRealCost() {
        return `${(this.#TOTAL_PRICE - this.#TOTAL_DISCOUNT).toLocaleString('en-US', {style: 'decimal'})}원`;
    }

    getBadge() {
        const BENEFIT = this.#GIFT + this.#TOTAL_DISCOUNT;
        if (BENEFIT >= 20000) return "산타";
        if (BENEFIT >= 10000) return "트리";
        if (BENEFIT >= 5000) return "별";
        return "없음";
    }

    getGiftList() {
        return this.#GIFT_LIST;
    }

    getList() {
        return this.#LIST_STRING;
    }
}

export default Discount;