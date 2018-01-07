export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;
    const context = buffer.getContext('2d');

    // val, idx, arr
    level.tiles.forEach(function(tile, x, y) {
        sprites.drawTile(tile.name, context, x, y);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    }
}

// entities is a set
export function createSpriteLayer(entitySet) {
    return function(context) {
        entitySet.forEach(e => e.draw(context));
    }
}

export function createDebugCollisionLayer(level) {
    const resolvedTiles = [];
    const resolver = level.tileCollider.resolver;
    const tileSize = resolver.tileSize;
    const getByIndexOrig = resolver.getByIndex;

    resolver.getByIndex = function getByIndexSpy(x, y) {
        resolvedTiles.push({ x, y });
        return getByIndexOrig.call(resolver, x, y);
    };

    return function drawCollision(context) {

        resolvedTiles.forEach(({ x, y }) => {
            context.strokeStyle = 'blue';
            context.beginPath();
            context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = 'red';

        level.entities.forEach((e) => {
            context.beginPath();
            context.rect(e.pos.x, e.pos.y, e.size.x, e.size.y);
            context.stroke();
        });

        resolvedTiles.length = 0;
    };
};