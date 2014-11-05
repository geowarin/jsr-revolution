module JsrRevolution.Entities {

  export class Bullets extends Phaser.Group {
    private main:State.Main;

    constructor(main:State.Main) {
      super(main.game);
      this.main = main;
      this.enableBody = true;
      this.physicsBodyType = Phaser.Physics.ARCADE;

      this.createMultiple(10, 'bullet');
      this.setAll('anchor.x', 0.5);
      this.setAll('anchor.y', 0.5);
      this.setAll('checkWorldBounds', true);
      this.setAll('outOfBoundsKill', true);
    }

    update() {
      this.game.physics.arcade.overlap(this, this.main.enemies, this.collisionHandler, null, this);
    }

    collisionHandler(bullet:Phaser.Sprite, enemy:Phaser.Sprite) {
      bullet.kill();
      enemy.damage(1);
    }
  }
}
