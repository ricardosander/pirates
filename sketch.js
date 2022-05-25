let ships;
let tiles;

let canvasWidth;
let canvasHeifht;

let isRotating = true;
let isAnimating = false;

let angle = 0;
let angleVelocity = 1;
let angleLimit = undefined

let currentX = 0
let currentY = 0;

let x;
let y;

let shipWidth = 68;
let shipHeight = 116;

let xSpeed = 0;
let ySpeed = 0;

function preload() {

    var imageLoader = new ImageLoader();
    var gameImages = imageLoader.load();

    ships = gameImages.ships;
    tiles = gameImages.tiles;
    
    settings = loadJSON("settings.json");

    console.log('Settings:');
    console.log(settings);

    window.addEventListener('resize', function () { console.log('resized'); window.location.reload(); });
}

function setup() {
    frameRate(60);
    createCanvas(windowWidth * 0.8, windowHeight * 0.8);

    canvasWidth = windowWidth * 0.8;
    canvasHeifht = windowHeight * 0.8;

    currentX = canvasWidth / 2 - shipWidth / 2;
    currentY = canvasHeifht / 2 - shipHeight / 2;
}

function touchStarted(event) {
    
}

function mousePressed(event) {
    
}

function keyPressed(event) {
    console.log(event.code)
    let key = event.code;
    
    if (key == 'Space') {
        isRotating = true;
    }

    if (key == 'Enter') {
        isRotating = true;
        xSpeed = 0;
        ySpeed = 0;
    }

    if (key == 'ArrowUp') {
        
        console.log("up");

        isRotating = false;
        angle = 180
        angleLimit = 180;
        
        // if (angle != 180) {
        //     isAnimating = true;
        //     angleVelocity = 1;
        //     ySpeed = -0.1;
        // } 
        
        // if (angle == 180) {
            if (ySpeed > 0) {
                ySpeed = -1;
            } else if (ySpeed > -5) {
                ySpeed--;
            }
            xSpeed = 0;
        // }
    }

    if (key == 'ArrowDown') {
        console.log("down");
        isRotating = false;
        angle = 0;
        if (ySpeed < 0) {
            ySpeed = 1;
        } else if (ySpeed < 5) {
            ySpeed++;
        }
        xSpeed = 0;
    }

    if (key == 'ArrowLeft') {
        console.log("left");
        isRotating = false;
        angle = 90;
        
        if (xSpeed > 0) {
            xSpeed = -1;
        } else if (xSpeed > -5) {
            xSpeed--;
        }
        
        ySpeed = 0;
    }

    if (key == 'ArrowRight') {
        console.log("right");
        isRotating = false;
        angle = -90;
        if (xSpeed < 0) {
            xSpeed = 1;
        } else if (xSpeed < 5) {
            xSpeed++;
        }
        ySpeed = 0;
    }
}

function draw() {

    
    background(0);

    x = 0;
    y = 0;

    let tileWidth = 60;
    let tileHeight = 60;

    let tileStartX = 512;
    let tileStartY = 256;

    while (y < canvasHeifht) {
        while (x < canvasWidth) {
            image(
                tiles,
                x,
                y,
                tileWidth,
                tileHeight,
                tileStartX,
                tileStartY,
                tileWidth,
                tileHeight
            );
        
            x += tileWidth - 1;
        }
        x = 0;
        y += tileHeight - 1;
    }

    let shipStartX = 204;
    let shipStartY = 114;

    x = currentX;
    y = currentY;

    push();
    translate(currentX, currentY);
    imageMode(CENTER);
    angleMode(DEGREES)
    rotate(angle);
    image(
        ships,
        0,
        0,
        shipWidth,
        shipHeight,
        shipStartX,
        shipStartY,
        shipWidth,
        shipHeight
    );
    pop();

    currentX += xSpeed;
    currentY += ySpeed;

    if (currentY < shipHeight / 2) {
        currentY = shipHeight / 2;
        ySpeed = 0;
        isRotating = false;
        isAnimating = false;
    }

    if (currentX < shipWidth / 2) {
        currentX = shipWidth / 2;
        ySpeed = 0;
        isRotating = false;
        isAnimating = false;
    }

    if (currentX > canvasWidth - shipWidth / 2) {
        currentX = canvasWidth - shipWidth / 2;
        xSpeed = 0;
        isRotating = false;
        isAnimating = false;
    }

    if (currentY > canvasHeifht - shipHeight / 2) {
        currentY = canvasHeifht - shipHeight / 2;
        ySpeed = 0;
        isRotating = false;
        isAnimating = false;
    }

    if (isRotating || isAnimating) {
        angle += angleVelocity
        // if (angle >= 360) {
        //     angle = 0;
        // }
    }

    if (angleLimit != undefined && angle == angleLimit) {
        isAnimating = false;
    }
}

