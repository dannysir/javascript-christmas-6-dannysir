import InputDayController from "./Controller/InputDayController.js";
import InputMenuController from "./Controller/InputMenuController.js";
import OutputView from "./View/OutputView.js";
class App {
  async run() {
    const MYDAY = await InputDayController();
    const MYORDER = await InputMenuController(MYDAY);
    OutputView.printFisrtOut(MYDAY.getDay());
    OutputView.printMenu(MYORDER.getMyOrder());
    OutputView.printTotalCost(MYORDER.calculateTotalPrice(MYORDER.getMenu()));
  }
}

export default App;
