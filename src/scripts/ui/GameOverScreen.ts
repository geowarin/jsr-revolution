module JsrRevolution.UI {

  export class GameOverScreen extends Phaser.Group {
    private nameInput:Phaser.Text;
    private main:JsrRevolution.State.Main;

    constructor(game:Phaser.Game, main:JsrRevolution.State.Main) {
      super(game);
      this.main = main;
      this.gameOver();
    }

    gameOver() {
      var gameOver:Phaser.Text = this.game.add.text(this.game.width / 2, this.game.height / 2, 'GAME OVER', {font: "65px Arial", fill: "#fff", align: 'center'});
      gameOver.fixedToCamera = true;
      gameOver.anchor.set(0.5, 0.5);

      var instructions:Phaser.Text = this.game.add.text(200, 280, 'Enter your name', {font: "40px Arial", fill: "#fff"});
      instructions.fixedToCamera = true;

      this.nameInput = this.game.add.text(100, 330, '', {font: "40px Arial", fill: "#fff"});
      this.nameInput.fixedToCamera = true;

      this.game.input.keyboard.addCallbacks(this, this.onGameOverKey);
    }

    onGameOverKey(e:KeyboardEvent) {
      var text = this.nameInput.text;
      if (e.which >= Phaser.Keyboard.A && e.which <= Phaser.Keyboard.Z)
        this.nameInput.setText(text + String.fromCharCode(e.which));

      else if (e.which == Phaser.Keyboard.BACKSPACE && text.length > 0)
        this.nameInput.setText(text.substr(0, text.length - 1));

      else if (e.which == Phaser.Keyboard.ENTER)
        this.registerScore(this.main.score.points, text);
    }

    registerScore(score:number, name:string) {
      this.game.input.keyboard.stop();
      console.log(score, name);
    }

  }

}
