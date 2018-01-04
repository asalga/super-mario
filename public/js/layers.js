export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;
    const context = buffer.getContext('2d');

    // val, idx, arr
    level.tiles.forEach( function(tile, x, y){
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