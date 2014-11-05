module JsrRevolution.State {
  export class Main extends Phaser.State {
    private _john:Entities.John;
    private _enemies:Entities.Enemies;
    private _bullets:Entities.Bullets;
    private _score:UI.Score;
    private map:map.Map;
    private levelManager:logic.LevelManager;

    create() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.map = new map.Map(this.game);
      this.map.load();

      this._enemies = new Entities.Enemies(this);
      this._bullets = new Entities.Bullets(this);

      this._john = new Entities.John(this.game, this._bullets, 100, 100);
      this._john.events.onKilled.add(() => {
        var gameOverScreen = new UI.GameOverScreen(this);
        gameOverScreen.show();
      }, this);

      this.levelManager = new logic.LevelManager(this, this.enemies);
      this.levelManager.start();

      this.map.addForeground();
      this._score = new UI.Score(this.game);
      new UI.Health(this.game, this._john);
    }

    update() {
      this.map.updateCollisions(this._john);
    }

    get score():UI.Score {
      return this._score;
    }

    get john():Entities.John {
      return this._john;
    }

    get enemies():Entities.Enemies {
      return this._enemies;
    }
  }
}
