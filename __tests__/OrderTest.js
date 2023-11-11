import Order from "../src/Model/Order.js";

describe("Order Model 테스트", () => {
    test("메뉴 배열로 저장", () => {
        const MENU = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
        const MyOrder = new Order(MENU);
        const ANSWER = [["티본스테이크", "1"], ["바비큐립", "1"], ["초코케이크", "2"], ["제로콜라", "1"]];
        expect(MyOrder.getMenu()).toEqual(ANSWER);
    });

    test("가격 출력", () => {
        const MENU = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
        const MyOrder = new Order(MENU);
        const ANSWER = 142000;
        expect(MyOrder.getTotalPrice()).toStrictEqual(ANSWER);
    });

    test("메뉴에 없는 주문", () => {
        const MENU = "토스트-1,바비큐립-1,초코케이크-2,제로콜라-1";
        expect(() => {
            new Order(MENU)
        }).toThrow("[ERROR]");
    });

    test.each([
        "토스트-1,바비큐립-1,초코케이크-2,제로콜라-1",
        "티본스테이크-1a,바비큐립-1,초코케이크-2,제로콜라-1",
        "티본스테이크-1,바비큐립-1,초코케이크-2,티본스테이크-1",
        "티본스테이크-1.9,바비큐립-1,초코케이크-2,제로콜라-1",
        "티본스테이크-0,바비큐립-1,초코케이크-2,제로콜라-1",
        "티본스테이크-10,바비큐립-5,초코케이크-2,제로콜라-4",
    ])("예외처리 - 옳지 않은 주문", (inputs) => {
        expect(() => {
            new Order(inputs)
        }).toThrow("[ERROR]");
    });

    test("음료만 주문", () => {
        const MENU = "제로콜라-4";
        expect(() => {
            new Order(MENU)
        }).toThrow("[ERROR]");
    });
});
