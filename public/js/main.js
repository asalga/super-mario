import Compositor from './Compositor.js';
import { loadLevel } from './loaders.js';
import { createMario } from './Entities.js';
import { loadBackgroundSprites } from './Sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import Timer from './Timer.js';
import Keyboard from './KeyboardState.js';

const input = new Keyboard();
input.addMapping(32, function(){
    console.log('test');
});
input.listenTo(window);

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise
    .all([
        createMario(),
        loadBackgroundSprites(),
        loadLevel('1-1')
    ])
    .then(([mario, backgroundSprites, level]) => {

        const gravity = 2000;
        mario.pos.set(64, 180);
        mario.vel.set(200, -600);

        const comp = new Compositor();
        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(mario);
        comp.layers.push(spriteLayer);

        const timer = new Timer();
        timer.update = function (deltaTime) {
            mario.update(deltaTime);
            mario.vel.y += gravity * deltaTime;
            comp.draw(context);
        };

        timer.start();
    });