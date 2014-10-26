module JsrRevolution.State {
  export class Main extends Phaser.State {
    private john:JsrRevolution.Entities.John;
    private wolf:Phaser.Sprite;

    create() {
      this.stage.backgroundColor = 0x000000;

      var x = this.game.width / 2,
        y = this.game.height / 2;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.john = new JsrRevolution.Entities.John(this.game, x, y);
      this.wolf = new JsrRevolution.Entities.Wolf(this.game, 100, 100);

    }

    update() {
    }
  }
}
