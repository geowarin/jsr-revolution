module JsrRevolution.map {

  export class Map {
    private game:Phaser.Game;
    private objectLayer:Phaser.TilemapLayer;
    private map:Phaser.Tilemap;

    constructor(game:Phaser.Game) {
      this.game = game;
    }

    public load() {
      this.map = this.game.add.tilemap('mountain-level');
      this.map.addTilesetImage('mountain', 'mountain-tiles');

      this.map.layers.forEach((layer:Phaser.TilemapLayer, index:number) => {
        if (layer.name == 'background') {
          this.map.createLayer(index);
        }
      });

      this.objectLayer = this.map.createLayer('obstacles');
      //this.objectLayer.debug = true;

      this.objectLayer.resizeWorld();
      this.map.setCollisionByExclusion([], true, 'obstacles');
    }

    public createLayer(name:string):Phaser.TilemapLayer {
      return this.map.createLayer(name);
    }

    public updateCollisions(sprite:Phaser.Sprite) {
      this.game.physics.arcade.collide(sprite, this.objectLayer);
    }
  }
}
