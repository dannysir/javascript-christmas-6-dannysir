import errorMessage from "../Constants/ErrorMessage.js";
import constantsForDate from "../Constants/ConstantsForDate.js";

class Date {
    #DAY
    #IS_STAR
    #WEEKEND
    constructor(Day) {
        this.validator(Day);
        this.#DAY = parseInt(Day);
        this.#IS_STAR = this.checkStar(parseInt(Day));
        this.#WEEKEND = this.checkWeekEnd(Day);
    }

    validator(Day){
        const SPLIT_DAY = Day.split("");
        SPLIT_DAY.forEach((v) => {
            if (isNaN(v)) throw new Error(errorMessage.NOT_VALID_DAY);
        });
        if (parseInt(Day) < constantsForDate.DECEMBER_START || parseInt(Day) > constantsForDate.DECEMBER_END) throw new Error(errorMessage.NOT_VALID_DAY);

    }
    checkStar(Day) {
        return constantsForDate.STAR_DAY.includes(Day);
    }

    checkWeekEnd(Day) {
        if (constantsForDate.WEEK_END.includes(Day % 7)) return true;
        return false;
    }
    getDay(){
        return this.#DAY;
    }

    getIsStar(){
        return this.#IS_STAR;
    }

    getWeekend(){
        return this.#WEEKEND;
    }
}

export default Date;