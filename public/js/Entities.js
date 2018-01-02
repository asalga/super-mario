import Entity from './Entity.js';
import { loadMarioSprite } from './Sprites.js';

export function createMario() {

    return loadMarioSprite()
    .then(sprite => {
        const mario = new Entity();
        mario.pos.set(64, 180);
        mario.vel.set(2, -10);

        mario.update = function() {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        };

        mario.draw = function(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        return mario;
    });
}