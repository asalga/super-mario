export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 2048;
    buffer.height = 240;
    const context = buffer.getContext('2d');

    // val, idx, arr
    level.tiles.forEach(function(tile, x, y) {
        sprites.drawTile(tile.name, context, x, y);
    });

    return function drawBackgroundLayer(context, camera) {
        context.drawImage(buffer, -camera.pos.x, -camera.pos.y);
    }
}

export function createSpriteLayer(entitySet, size = 64) {

    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = size;
    spriteBuffer.height = size;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    return function(context, camera) {
        entitySet.forEach((entity) => {
            entity.draw(spriteBufferContext);

            context.drawImage(spriteBuffer, entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y);
        });
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

    return function drawCollision(context, camera) {

        resolvedTiles.forEach(({ x, y }) => {
            context.strokeStyle = 'blue';
            context.beginPath();
            context.rect(
                x * tileSize - camera.pos.x,
                y * tileSize - camera.pos.y,
                tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = 'red';

        level.entities.forEach((e) => {
            context.beginPath();
            context.rect(
                e.pos.x - camera.pos.x,
                e.pos.y - camera.pos.y,
                e.size.x, e.size.y);
            context.stroke();
        });

        resolvedTiles.length = 0;
    };
};