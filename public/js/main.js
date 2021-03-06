import Camera from './Camera.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders.js';
import { createMario } from './Entities.js';
// import { createDebugCollisionLayer, createCameraLayer } from './layers.js';
import { setupKeyBoard } from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise
    .all([
        createMario(),
        loadLevel('1-1')
    ])
    .then(([mario, level]) => {
        const camera = new Camera();

        // level.comp.layers.push(createDebugCollisionLayer(level, camera),createCameraLayer(camera));
        // setupMouseControl(canvas, camera, mario);

        mario.pos.set(64, 64);
        level.entities.add(mario);

        const input = setupKeyBoard(mario);
        input.listenTo(window);

        const timer = new Timer();
        timer.update = function(deltaTime) {
            level.update(deltaTime);

            if (mario.pos.x > 100) {
                camera.pos.x = mario.pos.x - 100;
            }

            level.comp.draw(context, camera);
        };

        timer.start();
    });