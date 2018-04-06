var angle = 0;
var w = 30;
var ma;
var maxD;
var rotation = 0;
var DIMENSION = 600;

function setup() {
  createCanvas(DIMENSION, DIMENSION, WEBGL);
  ma = atan(cos(QUARTER_PI));
  maxD = dist(0, 0, 200, 200);

  // create sliders
  rotateXSlider = createSlider(-ma, ma * 10, ma, 0.1);
  rotateXSlider.position(20, DIMENSION +  20);
  boxSizeSlider = createSlider(12, 150, 25, 1);
  boxSizeSlider.position(20, DIMENSION +  40);

  multiplierSlider = createSlider(0, 3, 1, 0.01);
  multiplierSlider.position(20, DIMENSION +  60);

  minHeightSlider = createSlider(1, DIMENSION, 100, 1);
  minHeightSlider.position(20, DIMENSION +  80);
  maxHeightSlider = createSlider(1, DIMENSION, 300, 1);
  maxHeightSlider.position(20, DIMENSION +  100);

  rotationSpeed = createSlider(0, 0.8, 0.005, 0.001);
  rotationSpeed.position(20, DIMENSION +  120);

  waveSpeed = createSlider(0, 0.5, 0.1, 0.001);
  waveSpeed.position(20, DIMENSION +  140);
  ambientLight(100, 80, 80);
  pointLight(200, 200, 200, 100, 100, 100);
  specularMaterial(100,255,0);
}

function draw() {
  background(255,255,255);
  rotation+=rotationSpeed.value();
  rotation=rotation%180;  

  ortho(
    DIMENSION,
    -DIMENSION,
    DIMENSION, 
    -DIMENSION, 
    0, 
    1000);
  rotateX(rotateXSlider.value());
  rotateY(rotation);
  
  w = boxSizeSlider.value();
  multipleir = multiplierSlider.value();
  minH = minHeightSlider.value();
  maxH = maxHeightSlider.value();
  for (var z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      push();
      var d = dist(x, z, width * 0.5, height * 0.5);
      var offset = map(d, 0, maxD, -PI * multipleir, PI * multipleir);
      var a = angle + offset;
      var h = floor(map(sin(a), -1, 1, minH, maxH));
      translate(x - width / 2, 0, z - height / 2);
      box(w, h, w);
      pop();
    }
  }

  angle -= waveSpeed.value();
}