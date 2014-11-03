module JsrRevolution.State {
  export class Main extends Phaser.State {
    private _john:JsrRevolution.Entities.John;
    private enemies:JsrRevolution.Entities.Enemies;
    private bullets:JsrRevolution.Entities.Bullets;
    private _score:JsrRevolution.UI.Score;
    private map:JsrRevolution.map.Map;

    create() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.map = new JsrRevolution.map.Map(this.game);
      this.map.load();

      this.enemies = new JsrRevolution.Entities.Enemies(this.game, this);
      this.bullets = new JsrRevolution.Entities.Bullets(this.game);

      this._john = new JsrRevolution.Entities.John(this.game, this.bullets, 100, 100);
      this.enemies.spawnWolf();

      this.map.addForeground();
      this._score = new JsrRevolution.UI.Score(this.game);
      new JsrRevolution.UI.Health(this.game, this._john);

      this.game.time.events.loop(3 * Phaser.Timer.SECOND, this.enemies.spawnWolf, this.enemies);
    }

    update() {
      this.game.physics.arcade.overlap(this.bullets, this.enemies, this.collisionHandler, null, this);
      this.game.physics.arcade.overlap(this.john, this.enemies, () => this.john.damage(2), null, this);
      this.map.updateCollisions(this._john);
    }

    get score():JsrRevolution.UI.Score {
      return this._score;
    }

    get john():JsrRevolution.Entities.John {
      return this._john;
    }

    collisionHandler(bullet:Phaser.Sprite, enemy:Phaser.Sprite) {
      bullet.kill();
      enemy.damage(1);
    }
  }
}
