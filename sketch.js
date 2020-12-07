var eyeImage, noseImage, mouthImage;
var ctracker;
var videoInput;

const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

function setup() {
    videoInput = createCapture(VIDEO);
    videoInput.size(size.width, size.height);
    videoInput.position(0, 0);

    const canvas = createCanvas(size.width, size.height);
    canvas.position(0,0);

    ctracker = new clm.tracker();
    ctracker.init();
    ctracker.start(videoInput.elt);

    eyeImage = loadImage("eye.png");
    noseImage = loadImage("nose.png");
    mouthImage = loadImage("mouth.png");
}

function draw() {
    clear();
    positions = ctracker.getCurrentPosition();
    // image(videoInput, 0, 0, size.width, size.width);
    drawElements();
}

function drawElements() {
    if(positions.length > 0) {
        var p1 = createVector(positions[7][0], positions[7][1] );
        var p2 = createVector(positions[33][0], positions[33][1] );

        var eye1pos = createVector(positions[27][0],positions[27][1]);
        var eye2pos = createVector(positions[32][0],positions[32][1]);
        var nosepos = createVector(positions[41][0],positions[41][1]);
        var mouthpos = createVector(positions[57][0],positions[57][1]);

        // angle in radians
        var angleRad = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        var mSize = p1.dist(p2);

        imageMode(CENTER);

        push();
        translate(eye1pos.x,eye1pos.y);
        rotate(angleRad + PI/2);
        image(eyeImage,0,0,mSize/2,mSize/2);
        pop();

        push();
        translate(eye2pos.x,eye2pos.y);
        rotate(angleRad + PI/2);
        image(eyeImage,0,0,mSize/2,mSize/2);
        pop();

        push();
        translate(mouthpos.x,mouthpos.y);
        rotate(angleRad + PI/2);
        image(mouthImage,0,0,mSize,mSize);
        pop();

        push();
        translate(nosepos.x,nosepos.y+10);
        rotate(angleRad + PI/2);
        image(noseImage,0,0,mSize,mSize);
        pop();
    }
}

function windowResized () {
    pixelDensity(1);
    resizeCanvas(size.width, size.height);
}
