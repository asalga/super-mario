import Entity from './Entity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import { loadSpriteSheet } from './loaders.js';
import { createAnim } from './anim.js';

export function createMario() {

    return loadSpriteSheet('mario')
        .then(sprite => {
            let mario = new Entity;
            mario.size.set(16, 16);

            mario.addTrait(new Jump);
            mario.addTrait(new Go);

            let resolveAnim = createAnim([1, 2, 3].map(v => 'run-' + v), 10);

            function routeFrame(mario) {
                if (mario.go.distance > 0) {
                    return resolveAnim(mario.go.distance);
                }
                return 'idle';
            }

            mario.draw = function(context) {
                sprite.draw(routeFrame(this), context, 0, 0, this.go.heading <0);
            };

            return mario;
        });
}