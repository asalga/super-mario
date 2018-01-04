export default class Compositor {
    constructor() {
        this.layers = [];
    }

    draw(context) {
        this.layers.forEach(layerFunc => layerFunc(context));
    }
}