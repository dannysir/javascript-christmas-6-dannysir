import InputDayController from "./Controller/InputDayController.js";
import InputMenuController from "./Controller/InputMenuController.js";
import OutputView from "./View/OutputView.js";
import Discount from "./Model/Discount.js";
class App {
  async run() {
    const MY_DAY = await InputDayController();
    const MY_ORDER = await InputMenuController();
    OutputView.printFisrtOut(MY_DAY.getDay());
    OutputView.printMenu(MY_ORDER.getMyOrder());
    OutputView.printTotalCost(MY_ORDER.calculateTotalPrice(MY_ORDER.getMenu()).toLocaleString('en-US', { style: 'decimal'}));

    const DISCOUNT = new Discount(MY_DAY, MY_ORDER);
    OutputView.printGift(DISCOUNT.getGiftList());
    OutputView.printList(DISCOUNT.getList());
    OutputView.printTotalDiscount(DISCOUNT.getTotalBenefit());
    OutputView.printRealCost(DISCOUNT.getRealCost());
    OutputView.printBadge(DISCOUNT.getBadge());
  }
}

export default App;
