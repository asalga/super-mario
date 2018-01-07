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
            const y1 = indexY * this.tileSize;
            const y2 = y1 + this.tileSize;

            return {
                tile,
                y1,
                y2
            }
        }
    }

    // returns tile metadata based on position
    matchByPosition(posX, posY) {
        return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
    }
}