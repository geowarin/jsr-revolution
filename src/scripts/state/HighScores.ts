module JsrRevolution.State {

  export class HighScores extends Phaser.State {
    private highScores:HighScore[];

    init(name:string, score:number) {
      this.highScores = Storage.getItem('highScores') || [];
      this.highScores.push(new HighScore(score, name));

      this.highScores = _(this.highScores).sortBy('score').reverse().take(10).value();
      Storage.setItem('highScores', this.highScores);
    }

    create() {
      this.game.stage.backgroundColor = 0x000000;
      this.input.onDown.addOnce(() => this.game.state.start('menu'));

      var textManager = new UI.TextManager(this.game, 50);
      textManager.addText('HIGH SCORES', 60);
      this.highScores.forEach((highScore:HighScore) => {
	textManager.addText(highScore.score + ' ' + highScore.name);
      });
    }
  }

  class Storage {
    static getItem(key:string):any {
      var value = localStorage.getItem(key);
      return value && JSON.parse(value);
    }

    static setItem(key:string, value:any) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  class HighScore {
    score:number;
    name:string;

    constructor(score:number, name:string) {
      this.score = score;
      this.name = name;
    }
  }
}
