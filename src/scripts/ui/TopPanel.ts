module JsrRevolution.UI {

  export class TopPanel extends PhaserUI.GlassPanel {
    private _healthBar:PhaserUI.HorizontalBar;
    private _score:Phaser.BitmapText;
    private _points:number = 0;

    constructor(main:State.Main) {
      var rect = new Phaser.Rectangle(0, 0, 770, 15);
      super(main.game, rect);

      this._healthBar = new PhaserUI.HorizontalBar(main.game, 40, 10, 200, PhaserUI.RED_BAR);
      this._score = this.game.add.bitmapText(600, 15, 'future-thin', 'Score : ', 24);

      this.addChild(this._healthBar);
      this.addChild(this._score);

      this.updateHealth(main.john.health);
      main.john.onHurt.add(this.updateHealth, this);
      this.fixedToCamera = true;
    }

    updateHealth(remainingHeath:number) {
      this._healthBar.setValue(remainingHeath, 100);
      this._healthBar.label = remainingHeath.toString() + ' / 100';
    }

    addPoints(points:number) {
      this._points += points;
      this.updateScore(this._points);
    }

    updateScore(points:number) {
      this._score.setText('Score : ' + points);
    }

    get score() {
      return this._points;
    }
  }
}
