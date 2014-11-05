module JsrRevolution.Entities {

  export class Wolf extends Phaser.Sprite {
    target:Phaser.Sprite;
    speed:number = 100;

    constructor(game:Phaser.Game) {
      super(game, 0, 0, 'wolf');
      this.health = 2;

      this.anchor.setTo(0.5);
      this.animations.add('run');
      this.animations.play('run', 12, true);
    }

    update() {
      if (this.target)
        this.game.physics.arcade.moveToObject(this, this.target, this.speed);

      if (this.body.velocity.x > 0)
        this.scale.x = -1;
      else
        this.scale.x = 1;
    }
  }
}
