module JsrRevolution.State {
  export class Main extends Phaser.State {
    private john:JsrRevolution.Entities.John;
    private enemies:JsrRevolution.Entities.Enemies;
    private bullets:JsrRevolution.Entities.Bullets;

    create() {
      this.stage.backgroundColor = 0x000000;

      var x = this.game.width / 2,
        y = this.game.height / 2;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.enemies = new JsrRevolution.Entities.Enemies(this.game);
      this.bullets = new JsrRevolution.Entities.Bullets(this.game);

      this.john = new JsrRevolution.Entities.John(this.game, this.bullets, x, y);
      var wolf = new JsrRevolution.Entities.Wolf(this.game, this.enemies, 200, 200);
    }

    update() {
      this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler, null, this);
    }

    collisionHandler(bullet:Phaser.Sprite, enemy:Phaser.Sprite) {
      bullet.kill();
      enemy.damage(1);
    }
  }
}
