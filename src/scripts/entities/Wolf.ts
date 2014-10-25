module JsrRevolution.Entities {

  export class Wolf extends Phaser.Sprite {
    private static speed:number = 10;

    constructor(game:Phaser.Game, x:number, y:number) {
      super(game, x, y, 'wolf', 0);
      this.anchor.setTo(0.5, 0);
      game.add.existing(this);
      this.animations.add('run');
      this.animations.play('run', 12, true);
    }
  }
}
