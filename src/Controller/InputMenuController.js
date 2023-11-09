import Date from "../Model/Date.js";
import inputView from "../View/InputView.js";
import {Console} from "@woowacourse/mission-utils";
import Order from "../Model/Order.js";

const inputMenuController = async () => {
    try{
        const MENU = new Order(await inputView.readMenu());
        return MENU;
    }catch (e) {
        Console.print("[ERROR] 메뉴 형식대로 작성해주세요");
        return inputMenuController();
    }
}
export default inputMenuController;