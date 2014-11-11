module JsrRevolution.UI {

  export class GameOverScreen extends Phaser.Group {
    private nameInput:Phaser.Text;
    private main:State.Main;

    constructor(main:State.Main) {
      super(main.game);
      this.main = main;
    }

    show() {
      var textManager = new TextManager(this.game);
      textManager.addText('GAME OVER', 65);
      textManager.addText('Enter your name');
      this.nameInput = textManager.addText('');

      this.game.input.keyboard.addCallbacks(this, this.onKeyDown);
    }

    onKeyDown(e:KeyboardEvent) {
      var text = this.nameInput.text;
      if (e.which >= Phaser.Keyboard.A && e.which <= Phaser.Keyboard.Z)
        this.nameInput.setText(text + String.fromCharCode(e.which));

      else if (e.which == Phaser.Keyboard.BACKSPACE && text.length > 0)
        this.nameInput.setText(text.substr(0, text.length - 1));

      else if (e.which == Phaser.Keyboard.ENTER)
        this.registerScore(this.main.score, text);
    }

    registerScore(score:number, name:string) {
      this.game.state.start('highScores', true, false, name, score);
    }
  }
}
