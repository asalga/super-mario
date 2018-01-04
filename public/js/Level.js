import Composition from './Compositor.js';
import { Matrix } from './Math.js';

export default class Level {

    constructor() {
        this.comp = new Composition;
        this.entities = new Set;
        this.tiles = new Matrix;
    }

    update(deltaTime) {
        this.entities.forEach(e => {
            e.update(deltaTime);
        });
    }
}