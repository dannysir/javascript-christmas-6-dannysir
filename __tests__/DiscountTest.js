import Date from "../src/Model/Date.js";
import Order from "../src/Model/Order.js";
import Discount from "../src/Model/Discount.js";

describe("Discount Model 테스트", () => {
    test("평일 할인 출력", () => {
        const MENU = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
        const ANSWER = "평일 할인: -4,046원";
        const DAY = "3";
        const ReserveDay = new Date(DAY);
        const MyOrder = new Order(MENU);
        const MyDiscount = new Discount(ReserveDay, MyOrder)
        expect(MyDiscount.getList()).toContain(ANSWER);
    });

    test("크리스마스 디데이 할인 출력", () => {
        const MENU = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
        const ANSWER = "크리스마스 디데이 할인: -1,200원";
        const DAY = "3";
        const ReserveDay = new Date(DAY);
        const MyOrder = new Order(MENU);
        const MyDiscount = new Discount(ReserveDay, MyOrder)
        expect(MyDiscount.getList()).toContain(ANSWER);
    });

    test("특별 할인 출력", () => {
        const MENU = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
        const ANSWER = "특별 할인: -1,000원";
        const DAY = "3";
        const ReserveDay = new Date(DAY);
        const MyOrder = new Order(MENU);
        const MyDiscount = new Discount(ReserveDay, MyOrder)
        expect(MyDiscount.getList()).toContain(ANSWER);
    });

    test("증정 이벤트 출력", () => {
        const MENU = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
        const ANSWER = "증정 이벤트: -25,000원";
        const DAY = "3";
        const ReserveDay = new Date(DAY);
        const MyOrder = new Order(MENU);
        const MyDiscount = new Discount(ReserveDay, MyOrder)
        expect(MyDiscount.getList()).toContain(ANSWER);
    });

    test("총 혜택 금액 출력", () => {
        const MENU = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
        const ANSWER = "-31,246원";
        const DAY = "3";
        const ReserveDay = new Date(DAY);
        const MyOrder = new Order(MENU);
        const MyDiscount = new Discount(ReserveDay, MyOrder)
        expect(MyDiscount.getTotalBenefit()).toContain(ANSWER);
    });

    test("할인 후 예상 걸제 금액 출력", () => {
        const MENU = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
        const ANSWER = "135,754원";
        const DAY = "3";
        const ReserveDay = new Date(DAY);
        const MyOrder = new Order(MENU);
        const MyDiscount = new Discount(ReserveDay, MyOrder)
        expect(MyDiscount.getRealCost()).toContain(ANSWER);
    });

    test("배지 출력", () => {
        const MENU = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
        const ANSWER = "산타";
        const DAY = "3";
        const ReserveDay = new Date(DAY);
        const MyOrder = new Order(MENU);
        const MyDiscount = new Discount(ReserveDay, MyOrder)
        expect(MyDiscount.getBadge()).toContain(ANSWER);
    });
});
