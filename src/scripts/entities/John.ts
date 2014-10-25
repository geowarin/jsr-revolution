module JsrRevolution.Entities {

  export class John extends Phaser.Sprite {
    private static speed:number = 10;

    constructor(game:Phaser.Game, x:number, y:number) {
      super(game, x, y, 'john', 0);
      this.anchor.setTo(0.5, 0);
      game.add.existing(this);
    }

    update() {
      var keyboard:Phaser.Keyboard = this.game.input.keyboard;
      if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.x -= John.speed;
      } else if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.x += John.speed;
      }
      if (keyboard.isDown(Phaser.Keyboard.UP)) {
        this.y -= John.speed;
      } else if (keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.y += John.speed;
      }
    }

  }
}
