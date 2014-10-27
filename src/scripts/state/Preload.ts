module JsrRevolution.State {
  export class Preload extends Phaser.State {
    private preloadBar: Phaser.Sprite;

    preload() {
      this.preloadBar = this.add.sprite(290, 290, 'preload-bar');
      this.load.setPreloadSprite(this.preloadBar);

      this.load.image('john', 'assets/sprites/john.png');
      this.load.image('bullet', 'assets/sprites/bullet.png');
      this.load.atlasJSONHash('wolf', 'assets/sprites/wolf.png', 'assets/sprites/wolf.json');

      this.load.tilemap('snow-level', 'assets/maps/snow1.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('snow-tiles', 'assets/maps/snow.png');
    }

    create() {
      this.game.state.start('menu');
    }
  }
}
