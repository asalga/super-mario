const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {

    constructor() {
        // Holds current state of a given key
        this.keyStates = new Map;

        // Holds a callback for a given keycode
        this.keyMap = new Map;
    }

    addMapping(keyCode, callback) {
        this.keyMap.set(keyCode, callback);
    }

    handleEvent(event) {
        const { keyCode } = event;

        if (!this.keyMap.has(keyCode)) {
            return;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(keyCode) === keyState) {
            return;
            // this.keyMap.get(keyCode)();
        }

        this.keyStates.set(keyCode, keyState);
        console.log(this.keyStates);

        this.keyMap.get(keyCode)(keyState);
    }

    listenTo(window) {

    	let self = this;
        ['keyup', 'keydown'].forEach(function(eventName) {
            window.addEventListener(eventName, (event) => {
                self.handleEvent(event);
            });
        });
    }
}