export function createBackgroundLayer(level, sprites) {
    const tiles = level.tiles.grid;
    const resolver = level.tileCollider.resolver;

    const buffer = document.createElement('canvas');
    buffer.width = 256 + 16;
    buffer.height = 240;
    const context = buffer.getContext('2d');

    // draw subset of tile matrix
    function redraw(startIndex, endIndex) {
        for (let x = startIndex; x <= endIndex; ++x) {

            const col = tiles[x];
            if (col) {
                col.forEach((tile, y) => {
                    sprites.drawTile(tile.name, context, x - startIndex, y);
                });
            }
        }
    };

    // 
    // level.tiles.forEach(function(tile, x, y) {
    //     sprites.drawTile(tile.name, context, x, y);
    // });

    return function drawBackgroundLayer(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);
        context.drawImage(buffer, -camera.pos.x % 16, -camera.pos.y);
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

        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
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
                e.size.x,
                e.size.y);
            context.stroke();
        });

        resolvedTiles.length = 0;
    };
};

export function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(context, fromCamera) {
        context.strokeStyle = 'rgba(255,0,255,255)';
        context.beginPath();
        context.rect(
            cameraToDraw.pos.x - fromCamera.pos.x,
            cameraToDraw.pos.y - fromCamera.pos.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y);
        context.stroke();
    };
}