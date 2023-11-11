import Date from "../src/Model/Date.js";
import Order from "../src/Model/Order.js";
describe("Date Model 테스트", () => {
    test.each(["10", "3"])("별이 있는지 확인", async (inputs) => {
        const checkStar = new Date(inputs);
        await expect(checkStar.getIsStar()).toBe(true);
    });

    test.each(["1", "2"])("별이 없는지 확인", async (inputs) => {
        const checkStar = new Date(inputs);
        await expect(checkStar.getIsStar()).toBe(false);
    });

    test.each(["0", "41", "1.1", "1a"])("예외처리 - 옳지 않은 입력", (inputs) => {
        expect(() => {
            new Date(inputs)
        }).toThrow("[ERROR]");
    });
});
