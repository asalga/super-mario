import { Trait } from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('go');

        this.direction = 0;
        this.speed = 6000;
    }

    update(entity, deltaTime) {
        entity.vel.x = this.direction * this.speed * deltaTime;
    }
}