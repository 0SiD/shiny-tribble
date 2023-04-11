class Player extends BasicObject {
  constructor() {
    super();
    this.canMove = true;
    this.baseSpeed = 110;
    this.speed = this.baseSpeed * worldUnit;
    this.width = 16;
    this.height = 8;

    this.x = 0;
    this.y = 0;

    this.lastMovement;
    this.img = new Image();
    this.img.src =
      "https://0sid.github.io/shiny-tribble/assets/imgs/player.png";

    document.addEventListener("keydown", (e) => this.move(e, this));
  }

  move(e, player) {
    if (!this.canMove) return false;
    this.xvalue = 0;
    this.yvalue = 0;

    if (e.key === "ArrowRight") this.xvalue = player.speed * deltaTime;
    if (e.key === "ArrowLeft") this.xvalue = -player.speed * deltaTime;

    if (e.key === "ArrowUp") this.yvalue = player.speed * deltaTime;
    if (e.key === "ArrowDown") this.yvalue = -player.speed * deltaTime;

    this.tempx = this.x;
    this.tempy = this.y;

    this.x = clamp(
      this.x + this.xvalue,
      bounds.x.min + this.width / 2,
      bounds.x.max - this.width / 2
    );
    this.y = clamp(
      this.y + this.yvalue,
      bounds.y.min + this.height / 2,
      bounds.y.max - this.height / 2
    );

    if (this.tempx !== this.x) this.lastMovement = { x: this.xvalue };
    else if (this.tempy !== this.y) this.lastMovement = { y: this.yvalue };
  }

  update() {
    this.draw();
  }
}
