import Date from "../src/Model/Date.js";
describe("Date Model 테스트", () => {
    test.each(["10", "3"])("별이 있는지 확인", async (inputs) => {
        const checkStar = new Date(inputs);
        await expect(checkStar.getIsStar()).toBe(true);
    });

    test.each(["1", "2"])("별이 없는지 확인", async (inputs) => {
        const checkStar = new Date(inputs);
        await expect(checkStar.getIsStar()).toBe(false);
    });

});
