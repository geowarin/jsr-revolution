/// <reference path="definitions/phaser.d.ts"/>
/// <reference path="definitions/lodash.d.ts"/>

module JsrRevolution {
  export class Game extends Phaser.Game {
    constructor() {
      super(800, 600, Phaser.CANVAS, 'jsr-revolution-game');

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('menu', State.Menu);
      this.state.add('main', State.Main);
      this.state.add('highScores', State.HighScores);

      this.state.start('boot');
    }
  }
}

window.onload = () => {
  var game = new JsrRevolution.Game();
};
