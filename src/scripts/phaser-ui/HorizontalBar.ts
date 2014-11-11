module PhaserUI {

  export class HorizontalBar extends Phaser.Image {
    private bar:Bar;
    private barWidth:number;
    private text:Phaser.BitmapText;

    constructor(game:Phaser.Game, x:number, y:number, width:number, color:BarColor = BLUE_BAR) {
      super(game, x, y);
      this.barWidth = width;

      this.createBar(SHADOW_BAR, width - 10);
      this.bar = this.createBar(color, width - 10);
    }

    private createBar(color:BarColor, width):Bar {
      var barLeft = this.game.add.image(0, 0, SPACE_SPRITE, color.leftBar);
      var barMid = this.game.add.image(5, 0, SPACE_SPRITE, color.midBar);
      var barRight = this.game.add.image(5 + width, 0, SPACE_SPRITE, color.rightBar);
      this.addChild(barLeft);
      this.addChild(barMid);
      this.addChild(barRight);
      barMid.width = width;

      return {
        leftBar: barLeft,
        midBar: barMid,
        rightBar: barRight
      }
    }

    set label(label:string) {
      if (!this.text) {
        this.text = this.game.add.bitmapText(20, 5, 'future-thin', label, 24);
        this.addChild(this.text);
      } else {
        this.text.setText(label);
      }
    }

    setValue(value:number, maxValue:number = 100) {
      this.setPercent(value / maxValue);
    }

    setPixels(value:number) {
      this.bar.midBar.width = value;
      this.bar.rightBar.x = 5 + this.bar.midBar.width;
    }

    setPercent(value:number):void {
      this.setPixels(this.barWidth * value);
    }
  }

  interface Bar {
    leftBar:Phaser.Image;
    midBar:Phaser.Image;
    rightBar:Phaser.Image;
  }
}
