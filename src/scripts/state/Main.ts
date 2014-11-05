module JsrRevolution.State {
  export class Main extends Phaser.State {
    private _john:Entities.John;
    private enemies:Entities.Enemies;
    private bullets:Entities.Bullets;
    private _score:UI.Score;
    private map:map.Map;

    create() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.map = new map.Map(this.game);
      this.map.load();

      this.enemies = new Entities.Enemies(this);
      this.bullets = new Entities.Bullets(this.game);

      this._john = new Entities.John(this.game, this.bullets, 100, 100);
      this._john.events.onKilled.add(() => {
        var gameOverScreen = new UI.GameOverScreen(this);
        gameOverScreen.show();
      }, this);
      this.enemies.spawnWolf();

      this.map.addForeground();
      this._score = new UI.Score(this.game);
      new UI.Health(this.game, this._john);

      this.game.time.events.loop(3 * Phaser.Timer.SECOND, this.enemies.spawnWolf, this.enemies);
    }

    update() {
      this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler, null, this);
      this.game.physics.arcade.overlap(this.john, this.enemies, () => this.john.damage(2), null, this);
      this.map.updateCollisions(this._john);
    }

    get score():UI.Score {
      return this._score;
    }

    get john():Entities.John {
      return this._john;
    }

    collisionHandler(bullet:Phaser.Sprite, enemy:Phaser.Sprite) {
      bullet.kill();
      enemy.damage(1);
    }
  }
}
