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
            if (isNaN(v)) throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
        });
        if (parseInt(Day) < 1 || parseInt(Day) > 31) throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");

    }
    checkStar(Day) {
        const starDay = [3, 10, 17, 24, 25, 31];
        return starDay.includes(Day);
    }

    checkWeekEnd(Day) {
        if (Day % 7 === 1 || Day % 7 === 2) return true;
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