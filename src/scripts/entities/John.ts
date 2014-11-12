module JsrRevolution.Entities {

  export class John extends Phaser.Sprite {
    private static speed:number = 250;
    private bulletTime:number = 0;
    private bullets:Bullets;
    private hands:Phaser.Sprite;
    onHealthChange:Phaser.Signal;
    characteristics:Characteristics;
    paused:boolean = false;

    constructor(game:Phaser.Game, bullets:Bullets, x:number, y:number) {
      super(game, x, y, 'john');
      this.characteristics = new JsrRevolution.Characteristics();
      this.hands = this.game.add.sprite(0, 0, 'johnHands');
      this.hands.anchor.set(0.5);
      this.addChild(this.hands);
      this.anchor.set(0.5);
      game.physics.enable(this, Phaser.Physics.ARCADE);
      this.body.setSize(40, 60);
      this.body.collideWorldBounds = true;
      this.bullets = bullets;
      this.health = 100;
      this.onHealthChange = new Phaser.Signal();

      game.add.existing(this);
      this.game.camera.follow(this);
      game.input.onDown.add(this.fire, this);
    }

    damage(amount:number) {
      super.damage(amount);
      this.dispatchHealthChange();
      return this;
    }

    dispatchHealthChange() {
      this.onHealthChange.dispatch(this.health, this.characteristics.maximumHealth);
    }

    heal() {
      this.health = this.characteristics.maximumHealth;
      this.dispatchHealthChange();
    }

    update() {
      if (this.paused) {
        this.body.velocity = new Phaser.Point();
        return;
      }

      super.update();
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
      this.hands.rotation = this.angleToPointer(this) * this.scale.x;
    }

    angleToPointer(displayObject) {
      var pointer = this.game.input.activePointer;
      var dx = (pointer.worldX - displayObject.x) * this.scale.x;
      var dy = (pointer.worldY - displayObject.y) * this.scale.x;
      return Math.atan2(dy, dx);
    }

    fire():void {

      if (!this.alive || !this.canFire() || this.paused)
        return;

      var bullet:Bullet = this.bullets.getFirstDead();
      if (bullet) {
        bullet.reset(this.body.x + 16, this.body.y + 16);
        bullet.power = this.characteristics.bulletDamage;
        this.game.physics.arcade.moveToPointer(bullet, 400);
        this.bulletTime = this.game.time.now + 200;
      }
    }

    private canFire() {
      return this.game.time.now > this.bulletTime;
    }
  }
}
