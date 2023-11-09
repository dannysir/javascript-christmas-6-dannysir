import Date from "../Model/Date.js";
import inputView from "../View/InputView.js";
import {Console} from "@woowacourse/mission-utils";

const InputDayController = async () => {
    try{
        const TheDayWant = new Date(await inputView.readDate());
        return TheDayWant;
    }catch (e) {
        Console.print("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
        return InputDayController();
    }
}
export default InputDayController;