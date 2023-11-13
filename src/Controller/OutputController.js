import OutputView from "../View/OutputView.js";
import Discount from "../Model/Discount.js";

const OutputController = (Day, Order) => {
    OutputView.printFisrtOut(Day.getDay());
    OutputView.printMenu(Order.getMyOrder());
    OutputView.printTotalCost(Order.calculateTotalPrice(Order.getMenu()).toLocaleString('en-US', { style: 'decimal'}));

    const DISCOUNT = new Discount(Day, Order);
    OutputView.printGift(DISCOUNT.getGiftList());
    OutputView.printList(DISCOUNT.getList());
    OutputView.printTotalDiscount(DISCOUNT.getTotalBenefit());
    OutputView.printRealCost(DISCOUNT.getRealCost());
    OutputView.printBadge(DISCOUNT.getBadge());
};

export default OutputController;