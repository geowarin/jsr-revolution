module JsrRevolution.Entities {

  export class Enemies extends Phaser.Group {
    private main:JsrRevolution.State.Main;

    constructor(main:JsrRevolution.State.Main) {
      super(main.game);
      this.main = main;
      this.enableBody = true;
      this.physicsBodyType = Phaser.Physics.ARCADE;
      this.classType = JsrRevolution.Entities.Wolf;
    }

    update() {
      super.update();
      this.game.physics.arcade.overlap(this.main.john, this, () => this.main.john.damage(2), null, this);
    }
  }
}
