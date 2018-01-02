export default class Timer {

    constructor(timeStep = 1 / 60) {

        let accTime = 0,
            lastTime = 0,
            self = this;

        this.updateProxy = function(time) {
            accTime += (time - lastTime) / 1000;

            let test = 0;
            while (accTime > timeStep) {
                test++;
                self.update(timeStep);
                accTime -= timeStep;
            }

            lastTime = time;
            self.enqueue();
        };
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }
}