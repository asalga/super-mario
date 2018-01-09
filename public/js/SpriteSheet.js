export default class SpriteSheet {

    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map;
    }

    define(name, x, y, width, height) {
        let buffs = [false, true].map(flip => {
            const buffer = document.createElement('canvas');
            [buffer.width, buffer.height] = [width, height];
            const ctx = buffer.getContext('2d');

            if (flip) {
                ctx.scale(-1, 1);
                ctx.translate(-width, 0);
            }

            ctx.drawImage(
                this.image,
                x, y,
                width, height,
                0, 0,
                width, height);

            return buffer;
        });
        this.tiles.set(name, buffs);
    }

    defineTile(name, x, y) {
        this.define(name,
            x * this.width, y * this.height,
            this.width, this.height);
    }

    draw(name, context, x, y, flip = false) {
        const buffer = this.tiles.get(name)[flip ? 1 : 0];
        context.drawImage(buffer, x, y);
    }

    drawTileAtIndex(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}