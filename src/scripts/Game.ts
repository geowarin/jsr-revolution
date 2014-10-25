/// <reference path="phaser.d.ts"/>

/// <reference path='state/Boot.ts'/>
/// <reference path='state/Preload.ts'/>
/// <reference path='state/Menu.ts'/>
/// <reference path='state/Main.ts'/>

module JsrRevolution {
  export class Game extends Phaser.Game {
    constructor() {
      super(800, 600, Phaser.AUTO, 'jsr-revolution-game');

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('menu', State.Menu);
      this.state.add('main', State.Main);

      this.state.start('boot');
    }
  }
}

window.onload = () => {
  var game = new JsrRevolution.Game();
};