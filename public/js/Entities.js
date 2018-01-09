import Entity from './Entity.js';
import { loadSpriteSheet } from './loaders.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';

export function createMario() {

    return loadSpriteSheet('mario')
        .then(sprite => {
            const mario = new Entity;
            mario.size.set(16, 16);

            mario.addTrait(new Jump);
            mario.addTrait(new Go);

            mario.draw = function(context) {
                sprite.draw('idle', context, 0, 0);
            };

            return mario;
        });
}