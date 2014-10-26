module JsrRevolution.Entities {

  export class Bullets extends Phaser.Group {

    constructor(game:Phaser.Game) {
      super(game);
      this.enableBody = true;
      this.physicsBodyType = Phaser.Physics.ARCADE;

      this.createMultiple(10, 'bullet');
      this.setAll('anchor.x', 0.5);
      this.setAll('anchor.y', 0.5);
      this.setAll('checkWorldBounds', true);
      this.setAll('outOfBoundsKill', true);
    }
  }
}
