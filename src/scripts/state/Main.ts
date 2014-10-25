module JsrRevolution.State {
  export class Main extends Phaser.State {
    private john;
    private static speed:number = 10;

    create() {
      this.stage.backgroundColor = 0x000000;

      var x = this.game.width / 2,
        y = this.game.height / 2;

      this.john = this.add.sprite(x, y, 'john');
    }

    update() {
      var keyboard:Phaser.Keyboard = this.input.keyboard;
      if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.john.x -= Main.speed;
      } else if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.john.x += Main.speed;
      }
      if (keyboard.isDown(Phaser.Keyboard.UP)) {
        this.john.y -= Main.speed;
      } else if (keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.john.y += Main.speed;
      }
    }
  }
}
