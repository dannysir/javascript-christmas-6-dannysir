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


});
