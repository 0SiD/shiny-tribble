const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const getRandom = (min, max) => {
  max++;
  (min = Math.ceil(min)), (max = Math.floor(max));
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

class BasicObject {
  speed;
  baseSpeed;
  x;
  y;
  width;
  height;
  img;
  constructor() {}

  draw() {
    canva.drawImageGame(this.img, this.x, this.y, this.width, this.height);
  }

  onCollision(obj) {
    return (
      obj.x >= this.x - obj.width + 2 &&
      obj.x <= this.x + obj.width - 2 &&
      obj.y >= this.y - obj.height + 2 &&
      obj.y <= this.y + obj.height - 2
    );
  }
}
