import Keyboard from './KeyboardState.js';

export function setupKeyBoard(entity) {
    
    const input = new Keyboard();

    input.addMapping('Space', function(keyState) {
        if (keyState === 1) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping('ArrowLeft', function(keyState) {
        entity.go.direction = -keyState;
    });
    input.addMapping('ArrowRight', function(keyState) {
        entity.go.direction = keyState;
    });

    return input;
}