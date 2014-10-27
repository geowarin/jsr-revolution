module JsrRevolution.Entities {

  export class John extends Phaser.Sprite {
    private static speed:number = 250;
    private bulletTime:number = 0;
    private bullets:Bullets;

    constructor(game:Phaser.Game, bullets:Bullets, x:number, y:number) {
      super(game, x, y, 'john', 0);
      this.anchor.set(0.5);
      game.physics.enable(this, Phaser.Physics.ARCADE);
      this.body.setSize(40, 60);
      this.bullets = bullets;

      game.add.existing(this);
      game.input.onDown.add(this.fire, this)
    }

    update() {
      var keyboard:Phaser.Keyboard = this.game.input.keyboard;
      var vel:Phaser.Point = new Phaser.Point();

      if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.scale.x = -1;
        vel.x -= John.speed;
      } else if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.scale.x = 1;
        vel.x += John.speed;
      }
      if (keyboard.isDown(Phaser.Keyboard.UP)) {
        vel.y -= John.speed;
      } else if (keyboard.isDown(Phaser.Keyboard.DOWN)) {
        vel.y += John.speed;
      }
      this.body.velocity = vel;

      this.screenWrap(this);
    }

    fire():void {

      if (this.game.time.now > this.bulletTime) {
        var bullet:Phaser.Sprite = this.bullets.getFirstDead();

        if (bullet) {
          bullet.reset(this.body.x + 16, this.body.y + 16);
          this.game.physics.arcade.moveToPointer(bullet, 400);
          this.bulletTime = this.game.time.now + 100;
        }
      }
    }

    screenWrap(sprite:Phaser.Sprite) {

      if (sprite.x < 0) {
        sprite.x = this.game.world.width;
      } else if (sprite.x > this.game.world.width) {
        sprite.x = 0;
      }

      if (sprite.y < 0) {
        sprite.y = this.game.world.height;
      } else if (sprite.y > this.game.world.height) {
        sprite.y = 0;
      }
    }

  }
}
