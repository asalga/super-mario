import Composition from './Compositor.js';
import TileCollider from './TileCollider.js';
import { Matrix } from './Math.js';

export default class Level {

    constructor() {
        this.comp = new Composition;
        this.entities = new Set;
        this.tiles = new Matrix;

        this.tileCollider = new TileCollider(this.tiles);
    }

    // update all the things in the level
    update(deltaTime) {
        this.entities.forEach(e => {
            e.update(deltaTime);
            // this.tileCollider.test(e);
            this.tileCollider.checkY(e);
        });
    }
}