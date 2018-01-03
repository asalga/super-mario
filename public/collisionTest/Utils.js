export function doesIntersect(s, o) {
    return s.y + s.h > o.y &&
        s.y <= o.y + o.h &&
        s.x + o.w > o.x &&
        s.x <= o.x + o.w;
}