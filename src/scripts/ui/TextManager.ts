module JsrRevolution.UI {

  export class TextManager {
    private currentY:number;
    private game:Phaser.Game;

    constructor(game:Phaser.Game, startY:number = 200) {
      this.game = game;
      this.currentY = startY;
    }

    addText(text:string, size:number = 40):Phaser.Text {
      var theText:Phaser.Text = this.game.add.text(this.game.width / 2, this.currentY, text, {font: size + "px Arial", fill: "#fff"});
      theText.fixedToCamera = true;
      theText.anchor.set(0.5, 0.5);
      this.currentY += theText.height + 10;
      return theText;
    }

    addSpace(space:number) {
      this.currentY += space;
    }
  }
}
