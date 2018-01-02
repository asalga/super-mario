import Entity from './Entity.js';
import { loadMarioSprite } from './Sprites.js';

export function createMario() {

    return loadMarioSprite()
    .then(sprite => {
        const mario = new Entity();
       
        mario.update = function(delta) {
            this.pos.x += this.vel.x * delta;
            this.pos.y += this.vel.y * delta;
        };

        mario.draw = function(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        return mario;
    });
}