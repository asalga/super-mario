import Camera from './Camera.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders.js';
import { createMario } from './Entities.js';
import { createDebugCollisionLayer } from './layers.js';
import { setupKeyBoard } from './input.js';
import { setupMouseControl } from './Debug.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise
    .all([
        createMario(),
        loadLevel('1-1')
    ])
    .then(([mario, level]) => {
        const camera = new Camera();
        window.camera = camera;

        level.comp.layers.push(createDebugCollisionLayer(level, camera));
        setupMouseControl(canvas, camera, mario);

        mario.pos.set(64, 64);
        level.entities.add(mario);

        const input = setupKeyBoard(mario);
        input.listenTo(window);

        const timer = new Timer();
        timer.update = function(deltaTime) {
            level.update(deltaTime);
            level.comp.draw(context, camera);
        };

        timer.start();
    });