import { loadLevel } from './loaders.js';
import { createMario } from './Entities.js';
import Timer from './Timer.js';
import Keyboard from './KeyboardState.js';
import { createDebugCollisionLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise
    .all([
        createMario(),
        loadLevel('1-1')
    ])
    .then(([mario, level]) => {

        level.entities.add(mario);

        const SPACE = 32;
        const input = new Keyboard();
        input.addMapping(SPACE, function(keyState) {
            if (keyState === 1) {
                mario.jump.start();
            } else {
                mario.jump.cancel();
            }
        });
        input.listenTo(window);

        // debug
        ['mousedown', 'mousemove'].forEach(eventName => {
            canvas.addEventListener(eventName, e => {

                if (e.buttons === 1) {
                    mario.vel.set(0, 0);
                    mario.pos.set(e.offsetX, e.offsetY);
                }
            });
        });
        
        level.comp.layers.push(createDebugCollisionLayer(level));
        
        const gravity = 2000;
        mario.pos.set(64, 64);

        const timer = new Timer();
        timer.update = function(deltaTime) {
            level.update(deltaTime);
            mario.vel.y += gravity * deltaTime;
            level.comp.draw(context);
        };


        timer.start();
    });