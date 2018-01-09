import Entity from './Entity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import { loadSpriteSheet } from './loaders.js';

export function createMario() {

    return loadSpriteSheet('mario')
        .then(sprite => {
            let mario = new Entity;
            mario.size.set(16, 16);

            mario.addTrait(new Jump);
            mario.addTrait(new Go);

            mario.draw = function(context) {
                sprite.draw('run-1', context, 0, 0);
            };

            return mario;
        });
}