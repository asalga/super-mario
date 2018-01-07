import { loadImage } from './loaders.js';
import SpriteSheet from './SpriteSheet.js';

export function loadMarioSprite() {
    return loadImage('/image/characters.gif')
        .then(function(image) {
            const sheet = new SpriteSheet(image, 16, 16);
            sheet.define('idle', 276, 44, 16, 16);
            return sheet;
        });
}
