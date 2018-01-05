import TileResolver from './TileResolver.js';

export default class TileCollider {
    constructor(matrix) {
        this.resolver = new TileResolver(matrix, 16);
    }

    test(entity) {
        const match = this.resolver.matchByPosition(entity.pos.x, entity.pos.y);
        if (match) {
            console.log(match, match.tile);
        }
    }
}