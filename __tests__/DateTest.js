import Date from "../src/Model/Date.js";
import Order from "../src/Model/Order.js";
describe("Date Model 테스트", () => {
    test.each([10, 3])("별이 있는지 확인", async (inputs) => {
        const checkStar = new Date(inputs);
        await expect(checkStar.getIsStar()).toBe(true);
    });

    test.each([1, 2])("별이 있는지 확인", async (inputs) => {
        const checkStar = new Date(inputs);
        await expect(checkStar.getIsStar()).toBe(false);
    });

    test("메뉴 배열로 저장", () => {
        const MENU = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
        const isWeekEnd = true;
        const MyOrder = new Order(MENU, isWeekEnd);
        const ANSWER = [["티본스테이크", "1"], ["바비큐립", "1"], ["초코케이크", "2"], ["제로콜라", "1"]];
        expect(MyOrder.getMenu()).toEqual(ANSWER);
    });

    test("가격 출력", () => {
        const MENU = "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1";
        const isWeekEnd = true;
        const MyOrder = new Order(MENU, isWeekEnd);
        const ANSWER = "142,000";
        expect(MyOrder.calculateTotalPrice(MyOrder.getMenu())).toStrictEqual(ANSWER);
    });
});
