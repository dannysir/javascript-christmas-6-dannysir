class Date {
    #DAY
    #IS_STAR
    constructor(Day) {
        this.#DAY = parseInt(Day);
        this.#IS_STAR = this.checkStar(parseInt(Day));
    }

    checkStar(Day) {
        const starDay = [3, 10, 17, 24, 25, 31];
        return starDay.includes(Day);
    }

    getDdayDiscount() {
        if (this.#DAY <= 25) {
            return ((this.#DAY - 1) * 1000) + 1000;
        }
        return 0;
    }

    getDay(){
        return this.#DAY;
    }

    getIsStar(){
        return this.#IS_STAR;
    }
}

export default Date;