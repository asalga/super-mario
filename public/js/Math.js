export class Matrix {

    constructor() {
        this.grid = [];
    }

    forEach(func) {
        this.grid.forEach((col, x) => {
            col.forEach((val, y) => {
                func(val, x, y);
            });
        });
    }

    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }
        this.grid[x][y] = value;
    }

    get(x, y) {
        const col = this.grid[x];
        return col ? this.grid[x][y] : undefined;
    }
}

export class Vec2 {
    constructor(x, y) {
        this.set(x || 0, y || 0);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}