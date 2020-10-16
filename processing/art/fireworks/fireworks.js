// Forked from https://github.com/andrewdcampbell/jsfireworks/blob/master/sketch.js
// If you run this, you'll want to do it via changing to this directory and running
// `python3 -m http.server`, then navigating to localhost:8000 in your browser.


// const SHELLTYPES = ['simple', 'split', 'burst', 'double',
//                     'mega', 'writer', 'pent', 'comet'];
const SHELLTYPES = ['mega']
const GRAVITY = 0.2;
var PAUSED = true;

var shells = [];
var stars  = [];
let skyline;
let skylineWidth = 1541;
let skylineHeight = 441;

function preload() {
    // if you run this without a server, this will fail with a CORS warning
    skyline = loadImage('skyline.png');
}

function setup() {
    createCanvas(3000, 2400);
    background(0);
    strokeWeight(1);
    colorMode(HSB);
    frameRate(60);
}

/*
From p5.js docs: Called directly after setup(), the draw() function continuously
executes the lines of code contained inside its block until the program is
stopped or noLoop() is called.
*/
function draw() {
    // move origin (0, 0) to the bottom middle (halfway across, all the way down)
    translate(width / 2, height);
    background('rgba(0, 0, 0, 0.2)');

    // show x and y axes
    // fill(255)
    // for(let i = 0; i < height; i += 50) {
    //     text(-i.toString(), -width / 2, -i);
    // }
    // for(let i = 50; i < width; i += 50) {
    //     let number = i - (width/2)
    //     text(number, number, 0);
    // }

    /* Remove the exploded shells and burnt out stars */
    shells = shells.filter(shell => !shell.exploded);
    stars = stars.filter(star => star.brightness > 0);

    // tint the image based on the average hue and brightness of the fireworks
    let avgHue = stars.map(star => star.hue).reduce((a, b) => a + b, 0) / stars.length
    let avgBrightness = stars.map(star => star.brightness).reduce((a, b) => a + b, 0) / stars.length
    let saturation = 50;
    if (avgBrightness < 50) {
        saturation = 0;
    }
    tint(avgHue, 50, avgBrightness + 10)
    // move left and up by original width and height * 2, then paint at twice the normal size to fit our canvas
    image(skyline, -skylineWidth, -skylineHeight * 2, skylineWidth * 2, skylineHeight * 2)

    /* Draw the shells and stars */
    for (let shell of shells)
        shell.draw();
    for (let star of stars)
        star.draw();

    /* Generate new shell with small probability */
    if (random() < 0.10) {
        let s = new Shell();
        shells.push(s);
    }
}

class Shell {
    constructor(position, speed, type, sparkleTrail) {
        if (position == undefined)
            position = createVector(int(random(-width / 4, width / 4)), 0);
        if (speed == undefined)
            // -y moves up
            speed = createVector(random(-2, 2), -random(height / 150, height / 75));
        if (sparkleTrail == undefined)
            // sparkletrails make the buildings light up too bright
            sparkleTrail = false; // random() < 0.5;
        if (type == undefined) {
            let randIndex = floor(random(0, SHELLTYPES.length));
            type = SHELLTYPES[randIndex];
        }
        this.position = position;
        this.speed = speed;
        this.sparkleTrail = sparkleTrail;
        this.fuse = random(-3, -1);
        this.hue = round(random(0, 360)); // 201 - 360 are blues and purples, which don't show up well
        this.type = type;
        this.exploded = false;
    }

    draw() {
        if (this.fuse < this.speed.y) {
            this.explode();
            return;
        }

        if (this.sparkleTrail) {
            let sparkleDir = random(0, TWO_PI);
            let sparkleVel = random(0, 1);
            let sparkleSpd = createVector(sparkleVel * cos(sparkleDir),
                                          sparkleVel * sin(sparkleDir))
            let sparklePos = createVector(this.position.x + sparkleSpd.x,
                                          this.position.y + sparkleSpd.y);
            let s = new Star(sparklePos, sparkleSpd, random(50, 75),
                                floor(random(20, 40)), floor(random(0,30)));
            stars.push(s);
        }

        stroke(this.hue + round(random(-10, 10)), random(100, 200), 90);
        point(this.position.x, this.position.y);

        this.position.add(this.speed);

        // speed is a large negative y number, which slowly gets smaller. Adding negatives to position moves up.
        this.speed.y = this.speed.y + GRAVITY;
    }

    drawStars(numStars, velMin, velMax, fadeMin, fadeMax, type, baseDir, angle) {
        for (let i = 0; i < numStars; i++) {
            let dir = random(0, TWO_PI);
            if (baseDir != undefined)
                dir = baseDir + random(0, PI/angle);
            let vel = random(velMin, velMax);
            let starSpd = createVector(this.speed.x + vel * cos(dir),
                                       this.speed.y + vel * sin(dir));
            let hue = this.hue + round(random(-10, 10));
            let saturation = round(random(150, 200));
            let fade = random(fadeMin, fadeMax);
            let star = new Star(this.position.copy(), starSpd, fade, hue, saturation, type);
            stars.push(star);
        }
    }

    explode() {
        if (this.type == 'split') {
            this.drawStars(30, 3, 5, 3, 8, 'writer');
            this.drawStars(10, 3, 5, 3, 6, 'sparkler');
        } else if (this.type == 'burst') {
            this.drawStars(60, 0, 6, 3, 8, 'sparkler');
        } else if (this.type == 'double') {
            this.drawStars(90, 3, 5, 2, 4);
            this.drawStars(90, 0.5, 2, 4, 6, 'writer');
        } else if (this.type == 'mega') {
           this.drawStars(600, 0, 8, 3, 8);
        } else if (this.type == 'writer') {
            this.drawStars(100, 0, 5, 1, 3, 'writer');
        } else if (this.type == 'simple') {
            this.drawStars(100, 0, 5, 1, 3);
        } else if (this.type == 'pent') {
            let baseDir = random(0, TWO_PI);
            this.drawStars(20, 3, 5, 3, 8, 'writer', baseDir + (2/5)*PI, 6);
            this.drawStars(20, 3, 5, 3, 8, 'writer', baseDir + (4/5)*PI, 6);
            this.drawStars(20, 3, 5, 3, 8, 'writer', baseDir + (6/5)*PI, 6);
            this.drawStars(20, 3, 5, 3, 8, 'writer', baseDir + (8/5)*PI, 6);
            this.drawStars(20, 3, 5, 3, 8, 'writer', baseDir + (10/5)*PI, 6);
        } else if (this.type == 'comet') {
            let baseDir = random(0, TWO_PI);
            this.drawStars(10, 3, 7, 3, 8, 'sparkler', baseDir + (2/3)*PI, 128);
            this.drawStars(10, 3, 7, 3, 8, 'sparkler', baseDir + (4/3)*PI, 128);
            this.drawStars(10, 3, 7, 3, 8, 'sparkler', baseDir + (6/3)*PI, 128);
            this.drawStars(200, 0, 8, 3, 8, 'writer');
        }
        this.exploded = true;
    }
}

class Star {
    constructor(position, speed, fade, hue, saturation, type) {
        this.position = position;
        this.speed = speed;
        this.fade = fade;
        this.hue = hue;
        this.saturation = saturation;
        this.type = (type == undefined ? "default" : type);
        this.brightness = 255;
        this.burntime = 0;
    }

    draw() {
        stroke(this.hue, this.saturation, this.brightness);
        let newXPos = this.position.x + log(this.burntime) * 8 * this.speed.x;
        let newYPos = this.position.y + log(this.burntime) * 8 * this.speed.y
                      + this.burntime * GRAVITY;

        point(newXPos, newYPos);

        if (this.type == "writer" && this.burntime > 1) {
            line(newXPos, newYPos, this.position.x + log(this.burntime - 2) * 8 *
                 this.speed.x, this.position.y + log(this.burntime - 2) * 8 *
                 this.speed.y + this.burntime * GRAVITY);
        }

        if (this.type == "sparkler") {
            let dir = random(0, TWO_PI);
            let vel = random(0, 1);
            let starSpd = createVector(vel * cos(dir), vel * sin(dir))
            let star = new Star(createVector(newXPos + starSpd.x, newYPos + starSpd.y),
                                starSpd, random(50, 75), round(random(20, 40)),
                                round(random(0, 30)));
            stars.push(star);
        }

        this.brightness -= this.fade;
        this.burntime++;
    }
}

function keyPressed() {
    console.log(keyCode)
    if (keyCode == 32) { /* Space bar */
        if (PAUSED) {
            PAUSED = false;
            /* Draw a pause symbol in top right corner */
            // strokeWeight(1);
            // fill(255);
            // rect(width/2-30, -height+20, 10, 30);
            // rect(width/2-50, -height+20, 10, 30);
            noLoop();
        } else {
            PAUSED = true;
            loop();
        }
        return false;
    } else if (keyCode == 83) { // `s` key, for save
        saveCanvas(filename(), 'png');
    } else if (keyCode == 70) { // `f` key, for firework
        let s = new Shell();
        shells.push(s);
    }
}
