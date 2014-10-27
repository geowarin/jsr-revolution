module JsrRevolution.Entities {

  export class Wolf extends Phaser.Sprite {

    constructor(game:Phaser.Game, x:number, y:number) {
      super(game, x, y, 'wolf');
      this.health = 2;

      this.anchor.setTo(0.5, 0.5);
      this.animations.add('run');
      this.animations.play('run', 12, true);
    }
  }
}
