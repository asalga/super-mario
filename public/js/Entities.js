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

            let frames = ['run-1', 'run-2', 'run-3'];

            // route sprite name
            function routeFrame(mario){
                if(mario.go.direction !== 0){
                    let f = Math.ceil(mario.go.distance) % 3;
                    return frames[f];
                }
                return 'idle';
            }

            mario.draw = function(context) {
                sprite.draw(routeFrame(this), context, 0, 0);
            };

            return mario;
        });
}