module JsrRevolution.State {
  export class Preload extends Phaser.State {
    private preloadBar:Phaser.Sprite;

    preload() {
      this.preloadBar = this.add.sprite(290, 290, 'preload-bar');
      this.load.setPreloadSprite(this.preloadBar);

      this.load.atlasJSONHash('gui', 'assets/gui/space-sprites.png', 'assets/gui/space-sprites.json');
      this.load.bitmapFont('future-thin', 'assets/fonts/future-thin.png', 'assets/fonts/future-thin.xml');

      this.load.image('health', 'assets/icons/health.png');
      this.load.image('health-increase', 'assets/icons/health-increase.png');
      this.load.image('pistol', 'assets/icons/pistol.png');

      this.load.image('menu-background', 'assets/images/jsr-title.png');
      this.load.image('knightHawks', 'assets/fonts/knighthawks.png');
      this.load.audio('gun', 'assets/sounds/gun.wav');

      this.load.image('john', 'assets/sprites/john.png');
      this.load.image('johnHands', 'assets/sprites/johnHands.png');
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
