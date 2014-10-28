module JsrRevolution.map {

  export class Map {
    private game:Phaser.Game;
    private objectLayer:Phaser.TilemapLayer;

    constructor(game:Phaser.Game) {
      this.game = game;
    }

    public load() {
      var map:Phaser.Tilemap = this.game.add.tilemap('snow-level');
      map.addTilesetImage('snow', 'snow-tiles');

      var background:Phaser.TilemapLayer = map.createLayer('background');
      this.objectLayer = map.createLayer('objects');
      //this.objectLayer.debug = true;

      background.resizeWorld();
      map.setCollisionBetween(0, 200, true, 'objects');
    }

    public updateCollisions(sprite:Phaser.Sprite) {
      this.game.physics.arcade.collide(sprite, this.objectLayer);
    }
  }
}
