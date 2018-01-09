import Level from './Level.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import SpriteSheet from './SpriteSheet.js';
import { createAnim } from './anim.js';

export function loadJson(url) {
    return fetch(url).then(r => r.json());
}

export function loadImage(url) {
    return new Promise(function(resolve) {
        const image = new Image();

        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

/*
 */
export function loadSpriteSheet(name) {
    return loadJson(`/sprites/${name}.json`)
        .then(sheetSpec => Promise.all([
            sheetSpec,
            loadImage(sheetSpec.imageURL)
        ]))
        .then(([sheetSpec, image]) => {
            const sprites = new SpriteSheet(
                image,
                sheetSpec.tileW,
                sheetSpec.tileH);

            if (sheetSpec.tiles) {
                sheetSpec.tiles.forEach(sprite => {
                    sprites.defineTile(
                        sprite.name,
                        sprite.index[0],
                        sprite.index[1]);
                });
            }

            if (sheetSpec.frames) {
                sheetSpec.frames.forEach(frameSpec => {
                    sprites.define(frameSpec.name, ...frameSpec.rect);
                });
            }

            if (sheetSpec.animations) {
                sheetSpec.animations.forEach(animSpec => {
                    const anim = createAnim(animSpec.frames, animSpec.frameLength);
                    sprites.defineAnim(animSpec.name, anim);
                });
            }

            // console.log(sprites );
            return sprites;
        });
}

function createTiles(level, backgrounds) {

    function applyRange(background, xStart, xLen, yStart, yLen) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;

        background.ranges.forEach(range => {
            for (let x = xStart; x < xEnd; ++x) {
                for (let y = yStart; y < yEnd; ++y) {
                    level.tiles.set(x, y, {
                        name: background.tile,
                        type: background.type
                    });
                }
            }
        });
    }

    backgrounds.forEach(bk => {
        bk.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(bk, xStart, xLen, yStart, yLen);
            } else if (range.length === 3) {
                const [xStart, xLen, yStart] = range;
                applyRange(bk, xStart, xLen, yStart, 1);
            } else if (range.length === 2) {
                const [xStart, yStart] = range;
                applyRange(bk, xStart, 1, yStart, 1);
            }
        });
    });
}

export function loadLevel(name) {
    return loadJson(`/levels/${name}.json`)
        .then(levelSpec => Promise.all([
            levelSpec,
            loadSpriteSheet(levelSpec.spriteSheet)
        ]))
        .then(([levelSpec, backgroundSprites]) => {
            const level = new Level();

            createTiles(level, levelSpec.backgrounds);

            const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
            level.comp.layers.push(backgroundLayer);

            const spriteLayer = createSpriteLayer(level.entities, 64);
            level.comp.layers.push(spriteLayer);

            return level;
        });
}