import Date from "../Model/Date.js";
import inputView from "../View/InputView.js";
import {Console} from "@woowacourse/mission-utils";
import Order from "../Model/Order.js";

const inputMenuController = async (Date) => {
    try{
        const MENU = new Order(await inputView.readMenu(), Date.getWeekend());
        return MENU;
    }catch (e) {
        Console.print("[ERROR] 메뉴 형식대로 작성해주세요");
        await inputMenuController();
    }
}
export default inputMenuController;