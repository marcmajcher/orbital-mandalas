const WIDTH = 800;
const HEIGHT = 800;

const OUTER_R = 300;
const INNER_R = 200;

// Earth/Venus
const VENUS_DAYS = 225;
const EARTH_DAYS = 365;

const OUTER_YEARS = 8;
const INNER_YEARS = 13;

const PLANET_SIZE = 16;

let mandala;
let year_count;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background('black');

  mandala = createGraphics(WIDTH, HEIGHT);
  mandala.strokeWeight(1);
  mandala.stroke('white');

  reset();
}

let inner_angle;
let outer_angle;
const angle_step = 6;
const speed = angle_step / 180 * 3.14;

function draw() {
  if (year_count >= 0) {
    background('black');
    drawOrbits();
    if (year_count > 0) {
      drawPlanets();
    }
    drawLines();
    year_count--;
  }
}

function drawLines() {
  const x1 = WIDTH / 2 + OUTER_R * cos(outer_angle);
  const y1 = HEIGHT / 2 + OUTER_R * sin(outer_angle);
  const x2 = WIDTH / 2 + INNER_R * cos(inner_angle);
  const y2 = HEIGHT / 2 + INNER_R * sin(inner_angle);
  mandala.line(x1, y1, x2, y2);
  image(mandala, 0, 0);

}

function drawOrbits() {
  noFill();
  strokeWeight(4);
  stroke('white');
  circle(WIDTH / 2, HEIGHT / 2, OUTER_R * 2);
  circle(WIDTH / 2, HEIGHT / 2, INNER_R * 2);
}

function drawPlanets() {
  fill('white');
  noStroke();
  drawPlanet(OUTER_R, outer_angle);
  drawPlanet(INNER_R, inner_angle);

  const ratio = INNER_YEARS / OUTER_YEARS;
  outer_angle += speed;
  inner_angle += (speed * ratio);
}

function drawPlanet(radius, angle) {
  const x = WIDTH / 2 + radius * cos(angle);
  const y = HEIGHT / 2 + radius * sin(angle);
  circle(x, y, PLANET_SIZE);
}

function reset() {
  mandala.clear();
  inner_angle = 3 * PI / 2;
  outer_angle = 3 * PI / 2;
  year_count = Math.min(OUTER_YEARS, INNER_YEARS) / (angle_step / 360);
}
