module JsrRevolution.State {
  export class Menu extends Phaser.State {
    private font;
    private letterScale = 2;
    private writerSound:Phaser.Sound;

    create() {
      this.game.stage.backgroundColor = 0x000000;
      this.game.sound.mute = window.location.hash !== '#sound';

      var background = this.add.sprite(0, 0, 'menu-background');
      this.writerSound = this.add.audio('gun');

      this.input.onDown.addOnce(() => this.game.state.start('main'));
      this.font = this.game.add.retroFont('knightHawks', 31, 25, Phaser.RetroFont.TEXT_SET2, 10, 1, 0);

      this.writeText(60, 150, "REVOLUTION");
    }

    private writeText(x:number, y:number, textToWrite) {

      var letters:Phaser.Sprite[] = [];
      for (var i = 0; i < textToWrite.length; i++) {
        var letter:Phaser.Sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'knightHawks');
        letter.blendMode = PIXI.blendModes.EXCLUSION;
        letter.scale.set(0);
        letter.anchor.set(0.5);
        letter.animations.copyFrameData(this.font.frameData, 48);
        letter.frame = this.font.grabData[textToWrite.charCodeAt(i)];

        letters.push(letter);
      }

      this.bringIn(x, y, letters, 200);
    }

    bringIn(x:number, y:number, letters:Phaser.Sprite[], delay:number = 0) {
      var speed = 300;
      var posX = x + 32;
      letters.forEach((letter:Phaser.Sprite) => {
        this.game.add.tween(letter.position).to({x: posX, y: y + 32}, speed, Phaser.Easing.Elastic.InOut, true, delay);
        this.game.add.tween(letter.scale).to({x: this.letterScale, y: this.letterScale}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
        this.game.time.events.add(delay, () => this.writerSound.play(), this);
        delay += 200;
        posX += 64;
      });
      //this.game.time.events.add(delay + 2000, this.takeAway, this, letters);
    }

    takeAway(letters:Phaser.Sprite[], delay:number = 0) {
      var speed = 200;
      letters.reverse().forEach((letter:Phaser.Sprite) => {
        this.game.add.tween(letter.position).to({x: this.game.world.centerX, y: this.game.world.centerY}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
        this.game.add.tween(letter.scale).to({x: 0, y: 0}, speed, Phaser.Easing.Sinusoidal.Out, true, delay);
        delay += 50;
      });
    }
  }
}
