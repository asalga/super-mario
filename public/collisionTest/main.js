import Rect from './Rect.js'
import { doesIntersect } from './Utils.js';

let cvs = document.getElementById('cvs');
cvs.width = 400;
cvs.height = 400;
let ctx = cvs.getContext('2d');
let mouseX = 0;
let mouseY = 0;

addEventListener('mousemove', function(evt) {
    let { clientX, clientY } = evt;
    mouseX = clientX;
    mouseY = clientY;
});

function runIntersectionTests(fn) {
    let filtered = obstacles.filter(function(v, i, a) {
        return doesIntersect(subject, v);
    });

    filtered.forEach(fn);
}

function move(x, y) {
    subject.x += x;
    // TODO: figure this line out
    subject.y += y;

    // moving to the right
    if (x > 0) {
        runIntersectionTests(function(v) {
            if (subject.r > v.l) {
                subject.r = v.l;
            }
        });
    }
    // moving to the left / intersection with the right of obstacle
    else if (x < 0) {
        runIntersectionTests(function(v) {
            if (subject.l < v.r) {
                subject.l = v.r;
            }
        });
    }

    // moving down
    if (y > 0) {
        runIntersectionTests(function(o) {
            if (subject.b > o.t) {
                subject.b = o.t;
            }
        });
    }
    // moving up
    else if (y < 0) {
        runIntersectionTests(function(o) {
            if (subject.t < o.b) {
                subject.t = o.b;
            }
        });
    }
}

let obstacles = new Array(10).fill(0).map(function() {
    return new Rect({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        w: 40,
        h: 40
    })
});

let subject = new Rect({ x: 0, y: 0, w: 40, h: 40 });

function renderSubject() {
    ctx.fillStyle = 'rgba(0,0,255,255)';
    ctx.fillRect(subject.x, subject.y, 40, 40);
}

function renderObjects() {
    obstacles.forEach(o => {
        ctx.fillStyle = o.c;
        ctx.fillRect(o.x, o.y, o.w, o.h);
    });
}

function update() {
    if (subject.x + 1 < mouseX) {
        move(1, 0);
    } else if (subject.x - 1 > mouseX) {
        move(-1, 0);
    }
    if (subject.y + 1 < mouseY) {
        move(0, 1);
    } else if (subject.y - 1 > mouseY) {
        move(0, -1);
    }

    obstacles.forEach(function(o) {
        o.c = 'rgba(128,128,128,255';
        if (doesIntersect(subject, o)) {
            o.c = 'rgba(255,0,0,255';
        }
    });
    render();
    requestAnimationFrame(update);
}

function render() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    renderObjects();
    renderSubject();
}

requestAnimationFrame(update);