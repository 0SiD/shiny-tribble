class BasicEnemy extends BasicObject {
  constructor() {
    super();

    this.baseSpeed = 90;
    this.speed = this.baseSpeed * worldUnit;
    this.width = 10;
    this.height = 5;

    this.x = 100;
    this.y = 50;
  }

  draw() {
    canva.drawInGame(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
    if (this.onCollision(scene.bomb)) {
      this.width = 0;

      for (this.i = 0; this.i < 3; this.i++)
        setTimeout(() => (scene.bomb.width /= this.i), 300 + this.i * 30);
    }

    if (this.onCollision(scene.player)) {
      this.coord = Object.getOwnPropertyNames(scene.player.lastMovement)[0];
      scene.player.canMove = false;

      if (this.coord === "x") {
        for (this.i = 2; this.i > 0; this.i--)
          setTimeout(() => {
            scene.player.x -=
              (scene.player.speed * Math.sign(scene.player.lastMovement["x"]) -
                this.i * 4) *
              deltaTime;
          }, 100 - this.i);
      } else {
        for (this.i = 2; this.i > 0; this.i--)
          setTimeout(() => {
            scene.player.y -=
              (scene.player.speed * Math.sign(scene.player.lastMovement["y"]) -
                this.i * 4) *
              deltaTime;
          }, 100 - this.i);
      }
      setTimeout(() => (scene.player.canMove = true), 400);
    }
  }
}
