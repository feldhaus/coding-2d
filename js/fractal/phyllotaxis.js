// create application
const app = new PIXI.Application({
  backgroundColor: 0x21252f,
  antialias: true,
  width: 800,
  height: 600,
});
document.body.appendChild(app.view);

// constants
const color = { pink: 0xec407a, white: 0xf2f5ea };
const center = new PIXI.Point(
  app.renderer.width * 0.5,
  app.renderer.height * 0.5
);
const deg2rad = Math.PI / 180;

// add graphics
const graphics = new PIXI.Graphics();
app.stage.addChild(graphics);
graphics.position.copyFrom(center);

// convert the golden angle to radians
const goldenAngle = 137.5 * deg2rad;

// scaling parameter
const c = 8;

// is the ordering number of a floret, counting outward from the center
let n = 0;

app.ticker.add(function (deltaTime) {
  // is the angle between a reference direction and the position
  // vector of the nth floret in a polar coordinate system originating
  // at the center of the capitulum. It follows that the divergence
  // angle between the position vectors of any two successive florets
  // is constant, α = 137.5◦
  const a = n * goldenAngle;

  // is the distance between the center of the capitulum and the
  // center of the nth floret, given a constant scaling parameter c
  const r = c * Math.sqrt(n);

  // x and y position
  const x = r * Math.cos(a);
  const y = r * Math.sin(a);

  const radius = c - n * 0.005;
  if (radius > 0) {
    // draw a circle
    graphics.beginFill(color.white, (5 + (n % 45)) / 50);
    graphics.drawCircle(x, y, radius);

    // increase n
    n++;
  } else {
    n = 0;
    graphics.clear();
  }
});

function getColor(value) {
  let r, g, b;
  value %= 1536;
  if (value < 256) {
    r = 255;
    g = value % 256;
    b = 0;
  } else if (value < 512) {
    r = 255 - (value % 256);
    g = 255;
    b = 0;
  } else if (value < 768) {
    r = 0;
    g = 255;
    b = value % 256;
  } else if (value < 1024) {
    r = 0;
    g = 255 - (value % 256);
    b = 255;
  } else if (value < 1280) {
    r = value % 256;
    g = 0;
    b = 255;
  } else if (value < 1536) {
    r = 255;
    g = 0;
    b = 255 - (value % 256);
  }
  return (r << 16) + (g << 8) + b; // red << 16 + green << 16 + blue;
}
