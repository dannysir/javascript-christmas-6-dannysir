import InputDayController from "./Controller/InputDayController.js";
import InputMenuController from "./Controller/InputMenuController.js";
import OutputController from "./Controller/OutputController.js";
class App {
  async run() {
    const MY_DAY = await InputDayController();
    const MY_ORDER = await InputMenuController();
    OutputController(MY_DAY, MY_ORDER);
  }
}

export default App;
