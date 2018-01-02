export default class Timer {

    constructor(timeStep = 1 / 60) {

        let accTime = 0;
        let lastTime = 0;
        self = this;

        this.updateProxy = function(time){
        	// console.log(time);
            accTime += (time - lastTime) / 1000;

            while (accTime > timeStep) {
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