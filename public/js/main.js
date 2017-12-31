function loadImage(url) {
    const p = new Promise(function(resolve) {
        const image = new Image();

        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
    return p;
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
context.fillRect(0, 0, 64, 64);

loadImage('/image/tiles.png')
    .then(function(image) {
        context.drawImage(image, 0, 0, 16, 16, 0, 0, 32, 32);
    });