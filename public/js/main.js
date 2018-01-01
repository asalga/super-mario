import Compositor from './Compositor.js';
import { loadLevel } from './loaders.js';
import { loadMarioSprite, loadBackgroundSprites } from './Sprites.js';
import createBackgroundLayer from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprites, pos) {
    return function drawSpriteLayer(context) {
        sprites.draw('idle', context, pos.x, pos.y);
    }
}

Promise
    .all([
        loadMarioSprite(),
        loadBackgroundSprites(),
        loadLevel('1-1')
    ])
    .then(([marioSprite, backgroundSprites, level]) => {

        const comp = new Compositor();
        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        comp.layers.push(backgroundLayer);

        const pos = {
            x: 64,
            y: 64
        };

        const spriteLayer = createSpriteLayer(marioSprite, pos);
        comp.layers.push(spriteLayer);

        function update() {
            comp.draw(context);

            marioSprite.draw('idle', context, pos.x, pos.y);
            pos.x += 2;
            pos.y += 2;
            requestAnimationFrame(update);
        }
        update();
    });