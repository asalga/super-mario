import Compositor from './Compositor.js';
import { loadLevel } from './loaders.js';
import { createMario } from './Entities.js';
import { loadBackgroundSprites } from './Sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise
    .all([
        createMario(),
        loadBackgroundSprites(),
        loadLevel('1-1')
    ])
    .then(([mario, backgroundSprites, level]) => {

        const gravity = 0.5;

        const comp = new Compositor();
        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        // comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(mario);
        comp.layers.push(spriteLayer);

        function update() {
            comp.draw(context);

            mario.update();
            mario.draw(context);
            mario.vel.y += gravity;
            // setTimeout(update, 1000/144);
            requestAnimationFrame(update);
        }
        update();
    });



