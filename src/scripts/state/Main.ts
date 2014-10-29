module JsrRevolution.State {
  export class Main extends Phaser.State {
    private john:JsrRevolution.Entities.John;
    private enemies:JsrRevolution.Entities.Enemies;
    private bullets:JsrRevolution.Entities.Bullets;
    private score:JsrRevolution.UI.Score;
    private map:JsrRevolution.map.Map;

    create() {
      this.stage.backgroundColor = 0x000000;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.map = new JsrRevolution.map.Map(this.game);
      this.map.load();

      this.enemies = new JsrRevolution.Entities.Enemies(this.game);
      this.bullets = new JsrRevolution.Entities.Bullets(this.game);

      this.enemies.createMultiple(3, 'wolf');
      this.spawnWolf();

      this.score = new JsrRevolution.UI.Score(this.game);

      this.john = new JsrRevolution.Entities.John(this.game, this.bullets, 100, 100);
      this.camera.follow(this.john);

      this.map.createLayer('foreground');

      this.game.time.events.loop(3 * Phaser.Timer.SECOND, this.spawnWolf, this);
    }

    //render() {
    //  this.game.debug.body(this.john);
    //  this.game.debug.bodyInfo(this.john, 200, 10);
    //}

    spawnWolf() {
      var newWolf:JsrRevolution.Entities.Wolf = this.enemies.getFirstDead();
      if (newWolf) {
        newWolf.reset(this.game.world.randomX, this.game.world.randomY, 2);
        newWolf.events.onKilled.addOnce(() => this.score.addPoints(10));
      }
    }

    update() {
      this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler, null, this);
      this.map.updateCollisions(this.john);
    }

    collisionHandler(bullet:Phaser.Sprite, enemy:Phaser.Sprite) {
      bullet.kill();
      enemy.damage(1);
    }
  }
}
