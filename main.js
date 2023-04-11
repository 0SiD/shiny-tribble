let fps = 60,
  expected = 1000 / fps,
  deltaTime;

const canva = new Canva(
  document.getElementById("board"),
  document.getElementById("ui")
);

let worldUnit = canva.getUnits(),
  bounds = canva.getBounds();

const scene = {
  player: new Player(),
  bomb: new Bomb(),
  enemy: new BasicEnemy(),
};

const loop = (startTime, lastTime) => {
  setTimeout(() => {
    actualTime = new Date().getTime();
    timer = actualTime - startTime;
    deltaTime = (actualTime - lastTime) / 1000;
    update();

    loop(timer >= 1000 ? actualTime : startTime, actualTime);
  }, expected);
};

const update = () => {
  canva.clearBothCanvas();
  Object.keys(scene).forEach((key) => scene[key].update());
};

const start = () => {
  loop(new Date().getTime());
};

start();
