module JsrRevolution.Entities {

  export class John extends Phaser.Sprite {
    private static speed:number = 10;
    private bulletTime:number = 0;
    private bullets:Bullets;

    constructor(game:Phaser.Game, x:number, y:number) {
      super(game, x, y, 'john', 0);
      this.anchor.setTo(0.5, 0);
      game.physics.enable(this, Phaser.Physics.ARCADE);
      this.bullets = new Bullets(game);

      game.add.existing(this);
      game.input.onDown.add(this.fire, this)
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

      this.screenWrap(this);
    }

    fire():void {

      if (this.game.time.now > this.bulletTime) {
        var bullet:Phaser.Sprite = this.bullets.getFirstExists(false);

        if (bullet) {
          bullet.reset(this.body.x + 16, this.body.y + 16);
          this.game.physics.arcade.moveToPointer(bullet, 300);
          this.bulletTime = this.game.time.now + 100;
        }
      }
    }

    screenWrap(sprite:Phaser.Sprite) {

      if (sprite.x < 0) {
        sprite.x = this.game.width;
      } else if (sprite.x > this.game.width) {
        sprite.x = 0;
      }

      if (sprite.y < 0) {
        sprite.y = this.game.height;
      } else if (sprite.y > this.game.height) {
        sprite.y = 0;
      }
    }

  }
}
