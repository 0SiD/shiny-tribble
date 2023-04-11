class Canva {
  colorPalettes;
  acutalPalette;
  constructor(gameCanva, uiCanva) {
    this.colorPalettes = [
      { name: "comodore", bg: "#662895", fg: "#2d3256" },
      { name: "gb", bg: "#022d02", fg: "#234d23" },
      { name: "nes vibes", bg: "#5282fc", fg: "#be6f17" },
    ];

    this.acutalPalette =
      this.colorPalettes[getRandom(0, this.colorPalettes.length - 1)];
    console.log(this.acutalPalette);

    (this.gameCanva = gameCanva), (this.uiCanva = uiCanva);

    this.ctx = {
      ui: uiCanva.getContext("2d"),
      game: gameCanva.getContext("2d"),
    };

    this.ctx.game.imageSmoothingEnabled = false;
  }

  clearGameCanva() {
    this.ctx.game.clearRect(0, 0, this.gameCanva.width, this.gameCanva.height);
  }

  clearUiCanva() {
    this.ctx.ui.clearRect(0, 0, this.uiCanva.width, this.uiCanva.height);
  }

  clearBothCanvas() {
    this.clearGameCanva();
    this.clearUiCanva();
  }

  drawInGame(x, y, w, h) {
    this.ctx.game.fillRect(
      x + this.gameCanva.width / 2 - w / 2,
      this.gameCanva.height / 2 - y - h / 2,
      w * worldUnit,
      h * worldUnit
    );
  }

  drawImageGame(img, x, y, w, h) {
    this.ctx.game.drawImage(
      img,
      x + this.gameCanva.width / 2 - w / 2,
      this.gameCanva.height / 2 - y - h / 2,
      w,
      h
    );
    this.applyFilter();
  }

  applyFilter() {
    this.ctx.game.globalCompositeOperation = "source-in";
    this.ctx.game.fillStyle = this.acutalPalette.fg;
    this.gameCanva.style.backgroundColor = this.acutalPalette.bg;
    this.ctx.game.fillRect(0, 0, this.gameCanva.width, this.gameCanva.height);
    this.ctx.game.globalCompositeOperation = "source-over";
  }

  getUnits() {
    return this.gameCanva.width / 256;
  }

  getBounds() {
    return {
      x: {
        max: this.gameCanva.width / 2 - 1,
        min: (this.gameCanva.width / 2) * -1 + 1,
      },

      y: {
        max: this.gameCanva.height / 2 - 1,
        min: (this.gameCanva.height / 2) * -1 + 1,
      },
    };
  }
}
