import Camera from './Camera.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders.js';
import { createMario } from './Entities.js';
import { createDebugCollisionLayer, createCameraLayer } from './layers.js';
import { setupKeyBoard } from './input.js';
import { setupMouseControl } from './Debug.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise
    .all([
        createMario(),
        createMario(),
        loadLevel('1-1')
    ])
    .then(([mario, mario2,level]) => {
        const camera = new Camera();

        // level.comp.layers.push(
            // createDebugCollisionLayer(level, camera),
            // createCameraLayer(camera)
        // );

        setupMouseControl(canvas, camera, mario);

        mario2.pos.set(0, 64);
        level.entities.add(mario2);


        mario.pos.set(64, 64);
        level.entities.add(mario);

        const input = setupKeyBoard(mario);
        const input2 = setupKeyBoard(mario2);
        input.listenTo(window);
        input2.listenTo(window);

        const timer = new Timer();
        timer.update = function(deltaTime) {
            level.update(deltaTime);
            level.comp.draw(context, camera);
        };

        timer.start();
    });