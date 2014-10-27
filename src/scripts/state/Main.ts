module JsrRevolution.State {
  export class Main extends Phaser.State {
    private john:JsrRevolution.Entities.John;
    private enemies:JsrRevolution.Entities.Enemies;
    private bullets:JsrRevolution.Entities.Bullets;
    private score:JsrRevolution.UI.Score;

    create() {
      this.stage.backgroundColor = 0x000000;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.loadMap();
      this.enemies = new JsrRevolution.Entities.Enemies(this.game);
      this.bullets = new JsrRevolution.Entities.Bullets(this.game);

      this.enemies.createMultiple(3, 'wolf');
      this.spawnWolf();

      this.score = new JsrRevolution.UI.Score(this.game);

      this.john = new JsrRevolution.Entities.John(this.game, this.bullets, 100, 100);
      this.camera.follow(this.john);

      this.game.time.events.loop(3 * Phaser.Timer.SECOND, this.spawnWolf, this);
    }

    private loadMap() {
      var map:Phaser.Tilemap = this.add.tilemap('snow-level');
      map.addTilesetImage('snow', 'snow-tiles');

      var background:Phaser.TilemapLayer = map.createLayer('background');
      var objects:Phaser.TilemapLayer = map.createLayer('objects');
      objects.debug = true;

      background.resizeWorld();
      map.setCollisionBetween(0, 200, true, 'objects');
    }

    spawnWolf() {
      var newWolf:JsrRevolution.Entities.Wolf = this.enemies.getFirstDead();
      if (newWolf) {
        newWolf.reset(this.game.world.randomX, this.game.world.randomY, 2);
        newWolf.events.onKilled.addOnce(() => this.score.addPoints(10));
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
