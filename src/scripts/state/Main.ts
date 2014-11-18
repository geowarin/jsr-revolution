module JsrRevolution.State {
  export class Main extends Phaser.State {
    private _john:Entities.John;
    private _enemies:Entities.Enemies;
    private _bullets:Entities.Bullets;
    private _map:map.Map;
    private _levelManager:logic.LevelManager;
    private _topPanel:UI.TopPanel;

    create() {
      this.input.keyboard.addKeyCapture(Phaser.Keyboard.BACKSPACE);
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this._map = new map.Map(this.game);
      this._map.load();

      this._enemies = new Entities.Enemies(this);
      this._bullets = new Entities.Bullets(this);

      this._john = new Entities.John(this.game, this._bullets, 100, 100);
      this._john.events.onKilled.add(() => {
        var gameOverScreen = new UI.GameOverScreen(this);
        gameOverScreen.show();
      }, this);

      this._levelManager = new logic.LevelManager(this);
      this._levelManager.start();

      this._map.addForeground();

      this._topPanel = new UI.TopPanel(this);
      this.add.existing(this._topPanel);
    }

    update() {
      this._map.updateCollisions(this._john);
    }

    get john():Entities.John {
      return this._john;
    }

    get enemies():Entities.Enemies {
      return this._enemies;
    }

    get topPanel() {
      return this._topPanel;
    }

    get score() {
      return this._topPanel.score;
    }
  }
}
