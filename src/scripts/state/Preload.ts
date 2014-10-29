module JsrRevolution.State {
  export class Preload extends Phaser.State {
    private preloadBar: Phaser.Sprite;

    preload() {
      this.preloadBar = this.add.sprite(290, 290, 'preload-bar');
      this.load.setPreloadSprite(this.preloadBar);

      this.load.image('john', 'assets/sprites/john.png');
      this.load.image('bullet', 'assets/sprites/bullet.png');
      this.load.atlasJSONHash('wolf', 'assets/sprites/wolf.png', 'assets/sprites/wolf.json');

      this.load.tilemap('mountain-level', 'assets/maps/mountains1.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('mountain-tiles', 'assets/maps/mountain.png');
    }

    create() {
      this.game.state.start('menu');
    }
  }
}
