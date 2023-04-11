class Bomb extends BasicObject {
  constructor() {
    super();
    this.baseSpeed = 130;
    this.speed = this.baseSpeed * worldUnit;
    this.WIDTH = 20;
    this.width = 20;
    this.height = 10;

    this.canMove = true;
    this.pushed = false;
    this.img = new Image(this.width, this.height);
    this.img.src = "./assets/imgs/bomb.png";
    this.visible = false;
  }

  move() {
    this.coord = Object.getOwnPropertyNames(scene.player.lastMovement)[0];
    setTimeout(() => (this.pushed = true), 100);

    if (this.coord === "x") {
      for (this.i = 5; this.i > 0; this.i--)
        setTimeout(() => {
          if (!this.canMove) return false;
          this.x +=
            (this.speed * Math.sign(scene.player.lastMovement["x"]) -
              this.i * 4) *
            deltaTime;

          if (this.x <= bounds.x.min) {
            this.x = bounds.x.min;
            scene.player.lastMovement["x"] *= -1;
          } else if (this.x >= bounds.x.max) {
            this.x = bounds.x.max;
            scene.player.lastMovement["x"] *= -1;
          }
        }, 100 - this.i);
    } else {
      for (this.i = 5; this.i > 0; this.i--)
        setTimeout(() => {
          if (!this.canMove) return false;
          this.y +=
            ((this.speed / 2) * Math.sign(scene.player.lastMovement["y"]) -
              this.i * 4) *
            deltaTime;

          if (this.y <= bounds.y.min) {
            this.y = bounds.y.min;
            scene.player.lastMovement["y"] *= -1;
          } else if (this.y >= bounds.y.max) {
            this.y = bounds.y.max;
            scene.player.lastMovement["y"] *= -1;
          }
        }, 100 - this.i);
    }

    setTimeout(() => (this.pushed = false), 400);
  }

  update() {
    if (this.visible) this.draw();

    document.addEventListener("keydown", (e) => {
      if (e.key === "e" && !this.pushed) {
        this.visible = true;
        if (scene.player.lastMovement["x"]) {
          this.x =
            scene.player.x +
            (scene.player.width + 4) *
              Math.sign(scene.player.lastMovement["x"]);

          this.y = scene.player.y;
        } else {
          this.y =
            scene.player.y +
            (scene.player.width - 6) *
              Math.sign(scene.player.lastMovement["y"]);

          this.x = scene.player.x;
        }
      }
    });

    if (this.onCollision(scene.player) && this.pushed) {
      this.canMove = false;
      for (this.i = 0; this.i < 3; this.i++)
        setTimeout(() => (this.width /= this.i), 300 + this.i * 30);
      scene.player.canMove = false;

      setTimeout(() => {
        for (this.i = 1.0; this.i > 0.1; this.i -= 0.1)
          setTimeout(
            () => (canva.ctx.game.filter = `opacity(${this.i})`),
            300 + this.i * 30
          );
      }, 200);
    }
    if (this.onCollision(scene.player)) this.move();
  }
}
