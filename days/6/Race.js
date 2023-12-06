export class Race {
    time;
    distance;
    solutions;

    constructor(time, distance) {
        this.time = time;
        this.distance = distance;
        this.solutions = [];
    }


    setSolutions = () => {
        for (let timeHeld = 0; timeHeld <= this.time; timeHeld++) {
            const speedWhenReleased = timeHeld;
            const remainingTime = this.time - timeHeld;
            if (speedWhenReleased * remainingTime > this.distance) {
                this.solutions.push(timeHeld);
            }
        }
    }


}
