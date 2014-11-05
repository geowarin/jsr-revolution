module JsrRevolution.UI {

  export class BonusSelectionScreen {
    private _main:State.Main;

    constructor(main:State.Main) {
      this._main = main;
    }

    show() {
    }


  }

  export class Panel extends Phaser.Sprite {

    constructor(game:Phaser.Game, x:number, y:number) {
      super(game, x, y);
      this.anchor.setTo(0.5);

      this.addTopLeft();
      this.addMiddleTop(90, 0);
      this.addMiddleTop(170, 0);
      this.addTopRight(250);

      this.addBottomLeft(0, 90);
      this.addMiddleBottom(90, 90);
      this.addMiddleBottom(170, 90);
      this.addBottomRight(250, 90);
    }

    addBottomLeft(x:number, y:number) {
      var child = this.game.add.sprite(x, y, 'panel', 1);
      child.crop(new Phaser.Rectangle(0, 10, 90, 90), false);
      this.addChild(child);
    }
    addTopLeft() {
      var child = this.game.add.sprite(0, 0, 'panel', 3);
      child.crop(new Phaser.Rectangle(0, 0, 90, 90), false);
      this.addChild(child);
    }

    addTopRight(x:number) {
      var child = this.game.add.sprite(x, 0, 'panel', 4);
      child.crop(new Phaser.Rectangle(10, 0, 90, 90), false);
      this.addChild(child);
    }
    addBottomRight(x:number, y:number) {
      var child = this.game.add.sprite(x, y, 'panel', 2);
      child.crop(new Phaser.Rectangle(10, 10, 90, 90), false);
      this.addChild(child);
    }

    addMiddleTop(x:number, y:number) {
      var child = this.game.add.sprite(x, y, 'panel', 0);
      child.crop(new Phaser.Rectangle(10, 0, 80, 90), false);
      this.addChild(child);
    }
    addMiddleBottom(x:number, y:number) {
      var child = this.game.add.sprite(x, y, 'panel', 0);
      child.crop(new Phaser.Rectangle(10, 10, 80, 90), false);
      this.addChild(child);
    }

  }
}
