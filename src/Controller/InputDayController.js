import Date from "../Model/Date.js";
import inputView from "../View/InputView.js";
import {Console} from "@woowacourse/mission-utils";

const InputDayController = async () => {
    try{
        const TheDayWant = new Date(await inputView.readDate());
        return TheDayWant;
    }catch (e) {
        Console.print(e.message);
        return InputDayController();
    }
}
export default InputDayController;