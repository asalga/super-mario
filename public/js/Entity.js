 import { Vec2 } from './Math.js';

export class Trait {
    constructor(name) {
        this.name = name;
    }
    update(deltaTime) {
        console.log('unhandled update call in Trait');
    }
}


export default class Entity {
    constructor() {
        this.pos = new Vec2;
        this.vel = new Vec2;
        this.size = new Vec2;

        this.traits = [];
    }

    update(deltaTime) {
        this.traits.forEach((t) => {
            t.update(this, deltaTime);
        });
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.name] = trait;
    }
}