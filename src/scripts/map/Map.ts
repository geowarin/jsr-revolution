module JsrRevolution.map {

  export class Map {
    private game:Phaser.Game;
    private map:Phaser.Tilemap;
    private obstacles:Phaser.TilemapLayer[] = [];

    constructor(game:Phaser.Game) {
      this.game = game;
    }

    public load() {
      this.map = this.game.add.tilemap('mountain-level');
      this.map.addTilesetImage('mountain', 'mountain-tiles');

      this.map.layers.forEach((layer:Phaser.TilemapLayer) => {

        if (this.nameStartsWith(layer, 'background'))
          this.map.createLayer(layer.name).resizeWorld();

        else if (this.nameStartsWith(layer, 'obstacles'))
          this.createObstacleLayer(layer.name);

      });
    }

    private nameStartsWith(layer, name:string) {
      return layer.name.search(new RegExp('^' + name)) === 0;
    }

    public addForeground():void {
      this.map.layers.forEach((layer:Phaser.TilemapLayer) => {
        if (this.nameStartsWith(layer, 'foreground'))
          this.map.createLayer(layer.name);
      })
    }

    public updateCollisions(sprite:Phaser.Sprite) {
      this.game.physics.arcade.collide(sprite, this.obstacles);
    }

    createObstacleLayer(layerName:String):void {
      this.obstacles.push(this.map.createLayer(layerName));
      this.map.setCollisionByExclusion([], true, layerName);
    }
  }
}
