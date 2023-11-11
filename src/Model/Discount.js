import OrderedMenu from "./OrderedMenu.js";

class Discount {
    #LIST_STRING = "";
    #TOTAL_DISCOUNT = 0;
    #TOTAL_BENEFIT = 0;
    #GIFT = false;
    #REAL_COST;

    constructor(Day, Order) {
        if (Order.getTotalPrice() >= 10000) {
            this.#LIST_STRING += this.ChristmasDiscount(Day.getDay());
            this.#LIST_STRING += this.countWeekEndDiscount(Order.getMenu(), Day.getWeekend());
            this.#LIST_STRING += this.specialDiscount(Day.getIsStar());
            this.#LIST_STRING += this.giftEvent(Order.getTotalPrice());
            this.#TOTAL_BENEFIT += this.calculateTotalBenefit();
        }
        if (Order.getTotalPrice() < 10000) {
            this.#LIST_STRING = "없음";
        }
        this.#REAL_COST = Order.getTotalPrice() - this.#TOTAL_DISCOUNT;
    }

    countWeekEndDiscount(MENU, WEEKEND) {
        if (WEEKEND) {
            const DISCOUNT = this.weekendDiscount(MENU, "main");
            return `주말 할인: -${DISCOUNT.toLocaleString('en-US', {style: 'decimal'})}원\n`
        }
        const DISCOUNT = this.weekendDiscount(MENU, "dessert");
        return `평일 할인: -${DISCOUNT.toLocaleString('en-US', {style: 'decimal'})}원\n`
    }

    weekendDiscount(MENU, type) {
        let discount = 0;
        MENU.forEach((v) => {
            const EachMenu = new OrderedMenu(v);
            if (EachMenu.getType() === type) {
                discount += EachMenu.getCnt() * 2023;
                this.#TOTAL_DISCOUNT += EachMenu.getCnt() * 2023;
            }
        });
        return discount;
    }

    ChristmasDiscount(Day) {
        if (Day <= 25) {
            const DAY_DISCOUNT = ((Day - 1) * 100) + 1000;
            this.#TOTAL_DISCOUNT += DAY_DISCOUNT;
            return `크리스마스 디데이 할인: -${DAY_DISCOUNT.toLocaleString('en-US', {style: 'decimal'})}원\n`;
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
            this.#GIFT = true;
            return `증정 이벤트: -25,000원`;
        }
    }

    calculateTotalBenefit() {
        if (this.#GIFT) {
            return 25000 + this.#TOTAL_DISCOUNT;
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
        if (this.#TOTAL_BENEFIT >= 20000) return "산타";
        if (this.#TOTAL_BENEFIT >= 10000) return "트리";
        if (this.#TOTAL_BENEFIT >= 5000) return "별";
        return "없음";
    }

    getGiftList() {
        if (this.#GIFT) return "샴페인 1개";
        return "없음";
    }

    getList() {
        return this.#LIST_STRING;
    }
}

export default Discount;