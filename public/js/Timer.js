

export default class Timer {

    constructor(timeStep = 1 / 60) {

        let accTime = 0,
            lastTime = 0,
            self = this;

        this.updateProxy = function(now) {
            accTime += (now - lastTime) / 1000;

            // Prevent slowdown if game runs in background 
            // for a long time.

            // If we switch tabs, the simulation will continiue to run
            // which means, we may return to the simulation with several
            // minutes worth of accumulated time.
            //
            // We want to prevent the while loop from processing all this time.
            if(accTime > 1){
                console.warn(`accumulated time was ${accTime}`);
                accTime = 1;
            }

            let test = 0;
            while (accTime > timeStep) {
                test++;
                self.update(timeStep);
                accTime -= timeStep;
            }

            lastTime = now;
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