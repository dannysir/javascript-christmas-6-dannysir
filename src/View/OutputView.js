import {Console} from "@woowacourse/mission-utils";

const OutputView = {
    printMenu(Menu) {
        Console.print("<주문 메뉴>");
        Console.print(Menu);
    },
    printFisrtOut(Day) {
        Console.print(`12월 ${Day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
    },
    printTotalCost(TotalCost) {
        Console.print(`<할인 전 총주문 금액>\n${TotalCost}원`);
    },
    // ...
}
export default OutputView;