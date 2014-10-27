module JsrRevolution.Entities {

  export class Enemies extends Phaser.Group {

    constructor(game:Phaser.Game) {
      super(game);
      this.enableBody = true;
      this.physicsBodyType = Phaser.Physics.ARCADE;
    }
  }

}
