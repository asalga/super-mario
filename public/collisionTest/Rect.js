export default class Rect {
    constructor(cfg) {
        Object.assign(this, cfg);
        this.c = 'rgba(110,0,0,255)';
    }

    get l() { return this.x; }
    get r() { return this.x + this.w; }
    get t() { return this.y; }
    get b() { return this.y + this.h; }

    set l(v) { this.x = v; }
    set r(v) { this.x = v - this.w; }
    set t(v) { this.y = v; }
    set b(v) { this.y = v - this.h }
}