import TileResolver from './TileResolver.js';

export default class TileCollider {
    constructor(matrix) {
        this.resolver = new TileResolver(matrix, 16);
    }

    checkY(entity) {
        // const match = this.resolver.searchByPosition(entity.pos.x, entity.pos.y);
        const matches = this.resolver.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            entity.pos.y, entity.pos.y + entity.size.y);

        matches.forEach(m => {

            if (m.tile.name !== 'ground') {
                return;
            }

            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > m.y1) {
                    entity.pos.y = m.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            } else if (entity.vel.y < 0) {
                // console.log(entity.pos.y, m.y2);
                if (entity.pos.y < m.y2) {
                    entity.pos.y = m.y2;
                    entity.vel.y = 0;
                }
            }
        });
    }

    test(entity) {
        this.checkY(entity);
    }
}