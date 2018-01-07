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
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);
        });
    }
}