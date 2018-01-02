export default class Compositor {
    constructor() {
        this.layers = [];
    }

    draw(context) {
        this.layers.forEach(
            function(layerFunc) {
                layerFunc(context);
            }
        );
    }
}