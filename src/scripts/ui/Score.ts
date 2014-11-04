module JsrRevolution.UI {

  export class Score {
    private score:number = 0;
    private game:Phaser.Game;
    private text:Phaser.Text;

    constructor(game:Phaser.Game) {
      this.game = game;
      this.text = this.game.add.text(60, 10, this.getText(), {font: "20px Arial", fill: "#fff", align: "right"});
      this.text.fixedToCamera = true;
    }

    get points():number {
      return this.score;
    }

    addPoints(points:number) {
      this.score += points;
      this.text.text = this.getText();
    }

    getText():string {
      return this.score + " points";
    }
  }
}

