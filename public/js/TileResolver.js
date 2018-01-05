// Convert world positions to tile indices
export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }

    // return some metadata about a tile in the level
    getByIndex(indexX, indexY) {
        // pull the element out of the grid/matrix
        const tile = this.matrix.get(indexX, indexY);
        if (tile) {
            return {
                tile,
            }
        }
    }

    // returns tile metadata based on position
    matchByPosition(posX, posY) {
        const idxX = this.toIndex(posX);
        const idxY = this.toIndex(posY);
        return this.getByIndex(idxX, idxY);
    }
}