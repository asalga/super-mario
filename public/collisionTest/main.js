import Rect from './Rect.js'
import { doesIntersect } from './Utils.js';

let cvs = document.getElementById('cvs');
cvs.width = 500;
cvs.height = 500;
let ctx = cvs.getContext('2d');

window.addEventListener('keydown', function(event) {

	const delta = 10;

    let { keyCode } = event;
    if (keyCode === 37) {
        move(-delta, 0);
    }
    if (keyCode === 38) {
        move(0, -delta);
    }
    if (keyCode === 39) {
        move(delta, 0);
    }
    if (keyCode === 40) {
        move(0, delta);
    }});

let obstacles = new Array(30).fill(0).map(function() {
    return new Rect({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        w: 40,
        h: 40
    })
});

let subject = new Rect({ x: 0, y: 0, w: 40, h: 40 });

function move(x, y) {
    subject.x += x;
    subject.y += y;

    console.log(doesIntersect(subject, subject));
}

function renderSubject() {
    ctx.fillStyle = 'rgba(0,0,255,255)';
    ctx.fillRect(subject.x, subject.y, 40, 40);
}

function renderObjects() {
    obstacles.forEach(o => {
        ctx.fillStyle = 'rgba(128, 128, 128, 255)';
        ctx.fillRect(o.x, o.y, o.w, o.h);
    });
}

function clear() {
    ctx.fillStyle = 'rgba(255,255,255,255)';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
}

function update() {
    subject.x += 1 / 100;
}

function render() {
    update();

    clear();

    renderObjects();
    renderSubject();

    requestAnimationFrame(render);
}

render();