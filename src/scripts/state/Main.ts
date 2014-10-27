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

      this.enemies.createMultiple(3, 'wolf');
      this.enemies.getFirstDead().reset(200, 200, 2);


      this.john = new JsrRevolution.Entities.John(this.game, this.bullets, x, y);
      //var wolf = new JsrRevolution.Entities.Wolf(this.game, this.enemies, 200, 200);

      this.game.time.events.loop(3 * Phaser.Timer.SECOND, this.spawnWolf, this);
    }

    spawnWolf() {
      var newWolf = this.enemies.getFirstDead();
      if (newWolf) {
        newWolf.reset(this.game.world.randomX, this.game.world.randomY, 2);
      }
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
