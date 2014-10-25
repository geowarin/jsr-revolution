module JsrRevolution.State {
  export class Preload extends Phaser.State {
    private preloadBar: Phaser.Sprite;

    preload() {
      this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
      this.load.setPreloadSprite(this.preloadBar);

      this.load.image('john', 'assets/sprites/minimout.jpg');
      this.load.atlasJSONHash('wolf', 'assets/sprites/wolf.png', 'assets/sprites/wolf.json');
    }

    create() {
      this.game.state.start('menu');
    }
  }
}
